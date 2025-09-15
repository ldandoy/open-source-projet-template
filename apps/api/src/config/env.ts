import { z } from "zod";

/** Schéma de validation des variables d'env */
export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),

  // Database
  DATABASE_URL: z.string().url(),
  KEYCLOAK_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  MINIO_ENDPOINT: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;
