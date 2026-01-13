import { eq, and, desc } from 'drizzle-orm';
import { getDb } from '../utils/db';
import { contents } from '../../drizzle/schema';

export class ContentService {
  static async createContent(data: {
    userId: number;
    projectId?: number;
    title?: string;
    keyword?: string;
    type?: string;
    status?: string;
  }) {
    const db = getDb();
    const [result] = await db.insert(contents).values({
      ...data,
      status: data.status || 'pending',
    });

    return { id: result.insertId, ...data };
  }

  static async getContentById(id: number, userId: number) {
    const db = getDb();
    const [content] = await db.select()
      .from(contents)
      .where(and(eq(contents.id, id), eq(contents.userId, userId)));
    
    return content;
  }

  static async listContents(userId: number, projectId?: number) {
    const db = getDb();
    
    if (projectId) {
      return db.select().from(contents)
        .where(and(eq(contents.userId, userId), eq(contents.projectId, projectId)))
        .orderBy(desc(contents.createdAt));
    }
    
    return db.select().from(contents)
      .where(eq(contents.userId, userId))
      .orderBy(desc(contents.createdAt));
  }

  static async updateContent(id: number, userId: number, data: Partial<{
    title: string;
    content: string;
    status: string;
    seoScore: number;
    generationId: number;
  }>) {
    const db = getDb();
    await db.update(contents)
      .set(data)
      .where(and(eq(contents.id, id), eq(contents.userId, userId)));
    
    return this.getContentById(id, userId);
  }

  static async deleteContent(id: number, userId: number) {
    const db = getDb();
    await db.delete(contents)
      .where(and(eq(contents.id, id), eq(contents.userId, userId)));
    
    return { success: true };
  }
}
