import { eq, desc } from 'drizzle-orm';
import { getDb } from '../utils/db';
import { savedPrompts } from '../../drizzle/schema';
import { and } from 'drizzle-orm';

export class PromptService {
  static async getPromptById(id: number) {
    const db = getDb();
    const [prompt] = await db.select()
      .from(savedPrompts)
      .where(eq(savedPrompts.id, id));
    
    return prompt;
  }

  static async getActivePromptsByType(type: string) {
    const db = getDb();
    return db.select()
      .from(savedPrompts)
      .where(and(
        eq(savedPrompts.type, type),
        eq(savedPrompts.isActive, true)
      ))
      .orderBy(desc(savedPrompts.version));
  }

  static async createPrompt(data: {
    name: string;
    description?: string;
    promptTemplate: string;
    type: string;
    version?: number;
  }) {
    const db = getDb();
    const [result] = await db.insert(savedPrompts).values({
      ...data,
      version: data.version || 1,
      isActive: true,
    });

    return { id: result.insertId, ...data };
  }

  static async injectVariables(template: string, variables: Record<string, string>): Promise<string> {
    let result = template;
    
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    }
    
    return result;
  }

  static async listPrompts() {
    const db = getDb();
    return db.select().from(savedPrompts).orderBy(desc(savedPrompts.createdAt));
  }
}
