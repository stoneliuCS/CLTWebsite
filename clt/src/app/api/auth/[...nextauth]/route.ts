import { auth } from "@/lib/utils/auth"
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
          scope: "openid profile email https://www.googleapis.com/auth/drive",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const session = await auth()
      if (session) {
        return false
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
        })
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token })
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
