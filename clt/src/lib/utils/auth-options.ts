import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"
import { auth } from "@/lib/utils/auth"
import checkDrivePermission, { getGoogleDrive } from "./drive"
import { getOAuthClient } from "./oauth-client"

const authOptions: AuthOptions = {
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
      //If a user is signed in already, prevent them from signing in again.
      const session = await auth()
      if (session) {
        //TODO INSTEAD OF ROUTING TO FALSE ROUTE TO AN CUSTOMIZED ERROR PAGE
        return false
      }
      //On Sign In, verify that the user has access to the CLT Google Drive
      if (account) {
        const oauth2Client = await getOAuthClient(account.access_token)
        const drive = await getGoogleDrive(oauth2Client)
        const permission = await checkDrivePermission(drive)
        if (!permission) return false
        return true
      }
      //TODO INSTEAD OF ROUTING TO FALSE ROUTE TO AN CUSTOMIZED ERROR PAGE
      return false
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
        token = Object.assign({}, token, {
          access_token: account.access_token,
        })
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
}

export default authOptions
