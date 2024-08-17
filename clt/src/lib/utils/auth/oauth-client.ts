import { google } from "googleapis"

export async function getOAuthClient(access_token : any) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!,
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET!,
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL
  )
  oauth2Client.setCredentials({ access_token: access_token })
  return oauth2Client
}


