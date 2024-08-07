import { google } from "googleapis"
import { Session } from "next-auth"

export async function getOAuthClient(session: Session) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!,
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET!,
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL
  )
  oauth2Client.setCredentials({ access_token: session.access_token })
  return oauth2Client
}


