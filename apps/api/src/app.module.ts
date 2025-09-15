import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvSchema } from "./config/env";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./health/health.module";
import { ProjectsModule } from "./projects/projects.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // ordre de priorité (du + spécifique au + générique)
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        `.env.local`,
        `.env`,
      ],
      validate: (raw) => EnvSchema.parse(raw), // ❗ fail fast si invalide/manquant
    }),
    DatabaseModule,
    HealthModule,
    ProjectsModule,
    AdminModule,
  ],
})
export class AppModule {}
