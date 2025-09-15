import { Injectable, Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DATABASE_CONNECTION } from "../../database/database.module";
import { users, User } from "../../database/schema";

export type UserRole = "user" | "admin" | "superadmin";

@Injectable()
export class AdminUsersService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {
    console.log("AdminUsersService constructed with real database connection, db:", this.db);
  }

  async getUsers() {
    return await this.db.select().from(users);
  }

  async getUserById(id: string) {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  }

  async getUsersCount() {
    const result = await this.db.select().from(users);
    return { count: result.length };
  }

  async updateUser(id: string, updateData: Partial<User>) {
    console.log(`Updating user ${id} with data:`, updateData);
    const result = await this.db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }

  async deleteUser(id: string) {
    console.log(`Deleting user ${id}`);
    const result = await this.db.delete(users).where(eq(users.id, id)).returning();

    if (result.length > 0) {
      return { success: true, deletedUser: result[0] };
    }
    return { success: false, message: "User not found" };
  }
}
