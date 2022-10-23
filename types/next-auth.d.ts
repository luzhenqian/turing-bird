import NextAuth from "next-auth";
import { User as MyUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: MyUser;
  }
  interface User extends MyUser {}
}
