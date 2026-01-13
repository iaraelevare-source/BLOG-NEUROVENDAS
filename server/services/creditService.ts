import { eq, desc } from 'drizzle-orm';
import { getDb } from '../utils/db';
import { userCredits, creditUsage } from '../../drizzle/schema';

export class CreditService {
  static async getUserCredits(userId: number) {
    const db = getDb();
    const [credits] = await db.select().from(userCredits).where(eq(userCredits.userId, userId));
    
    if (!credits) {
      // Initialize if not exists
      const [result] = await db.insert(userCredits).values({
        userId,
        totalCredits: 180,
        usedCredits: 0,
        remainingCredits: 180,
        plan: 'beta',
      });
      
      return {
        userId,
        totalCredits: 180,
        usedCredits: 0,
        remainingCredits: 180,
        plan: 'beta',
      };
    }
    
    return credits;
  }

  static async deductCredits(userId: number, action: string, creditsToDeduct: number, generationId?: number) {
    const db = getDb();
    
    const credits = await this.getUserCredits(userId);
    
    if ((credits.remainingCredits || 0) < creditsToDeduct) {
      throw new Error('Insufficient credits');
    }

    const newUsedCredits = (credits.usedCredits || 0) + creditsToDeduct;
    const newRemainingCredits = (credits.totalCredits || 180) - newUsedCredits;

    // Update user credits
    await db.update(userCredits)
      .set({
        usedCredits: newUsedCredits,
        remainingCredits: newRemainingCredits,
      })
      .where(eq(userCredits.userId, userId));

    // Log credit usage
    await db.insert(creditUsage).values({
      userId,
      action,
      creditsUsed: creditsToDeduct,
      creditsBefore: credits.remainingCredits || 0,
      creditsAfter: newRemainingCredits,
      generationId: generationId ?? undefined,
    });

    return {
      used: creditsToDeduct,
      remaining: newRemainingCredits,
    };
  }

  static async getCreditHistory(userId: number, limit: number = 50) {
    const db = getDb();
    return db.select()
      .from(creditUsage)
      .where(eq(creditUsage.userId, userId))
      .orderBy(desc(creditUsage.createdAt))
      .limit(limit);
  }
}
