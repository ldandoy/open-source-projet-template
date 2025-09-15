import type { auth } from "./auth";

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;

declare module "better-auth/types" {
  interface User {
    isAdmin: boolean;
  }
}
