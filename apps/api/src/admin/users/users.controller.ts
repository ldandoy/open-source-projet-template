import { Controller, Get, Patch, Delete, Param, Body, Inject } from "@nestjs/common";
import { AdminUsersService } from "./users.service";
import { DATABASE_CONNECTION } from "../../database/database.module";

@Controller("admin/users")
export class AdminUsersController {
  private service: AdminUsersService;

  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {
    console.log("AdminUsersController constructed with direct DB injection, db:", !!this.db);
    // Workaround: create service manually with DB connection
    this.service = new AdminUsersService(this.db);
  }

  @Get()
  async getUsers() {
    return this.service.getUsers();
  }

  @Get("count")
  async getUsersCount() {
    try {
      return await this.service.getUsersCount();
    } catch (error) {
      console.error("Controller error:", error);
      return { error: (error as Error).message, count: 0 };
    }
  }

  @Get("test")
  async test() {
    return { message: "Admin controller is working" };
  }

  @Get(":id")
  async getUserById(@Param("id") id: string) {
    return this.service.getUserById(id);
  }

  @Patch(":id")
  async updateUser(@Param("id") id: string, @Body() updateData: any) {
    return this.service.updateUser(id, updateData);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.service.deleteUser(id);
  }
}
