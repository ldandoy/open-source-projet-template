import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvSchema } from "./config/env.js";
import { HealthModule } from "./health/health.module.js";
import { ProjectsModule } from "./projects/projects.module.js";

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
    HealthModule,
    ProjectsModule,
  ],
})
export class AppModule {}
