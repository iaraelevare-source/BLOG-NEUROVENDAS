import { eq } from 'drizzle-orm';
import { getDb } from '../utils/db';
import { users, userCredits } from '../../drizzle/schema';
import bcrypt from 'bcryptjs';

export class UserService {
  static async createUser(email: string, password: string | null, name?: string) {
    const db = getDb();
    
    const passwordHash = password ? await bcrypt.hash(password, 10) : null;
    
    const [user] = await db.insert(users).values({
      email,
      passwordHash,
      name,
      isBetaUser: true,
    });

    // Initialize credits for new user
    await db.insert(userCredits).values({
      userId: user.insertId,
      totalCredits: 180,
      usedCredits: 0,
      remainingCredits: 180,
      plan: 'beta',
    });

    return { id: user.insertId, email, name };
  }

  static async getUserByEmail(email: string) {
    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  static async getUserById(id: number) {
    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  static async validatePassword(user: any, password: string): Promise<boolean> {
    if (!user.passwordHash) return false;
    return bcrypt.compare(password, user.passwordHash);
  }
}
