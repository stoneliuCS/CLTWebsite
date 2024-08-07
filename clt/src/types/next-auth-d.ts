import { DefaultSession } from "next-auth";

type accessToken = string;

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token : accessToken
    user: {
    } & DefaultSession["user"];
  }
}