import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const auth = betterAuth({
  baseURL: process.env.BASE_URL, // utilisé comme issuer/audience JWT
  database: pool, // adapter Postgres natif
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // optionnel: désactive la vérification email en dev
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
    },
  },
  plugins: [
    jwt({
      // exemple: personnaliser le payload JWT
      jwt: { definePayload: ({ user }) => ({ sub: user.id, email: user.email, role: user.role }) },
    }),
    nextCookies(), // facilite la gestion des cookies côté Next
  ],
});
