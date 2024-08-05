import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"
import { randomBytes } from "crypto"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL
  )
  const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"]
  const state = randomBytes(32).toString("hex")
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
    state: state,
  })
  return Response.json(authorizationUrl)
}
