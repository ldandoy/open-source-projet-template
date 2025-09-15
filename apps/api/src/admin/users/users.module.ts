import { Module } from "@nestjs/common";
import { AdminUsersController } from "./users.controller";
import { AdminUsersService } from "./users.service";
import { DatabaseModule } from "../../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
