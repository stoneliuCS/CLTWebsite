import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL,
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
