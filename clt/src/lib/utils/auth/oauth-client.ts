import { google } from "googleapis"

export async function getOAuthClient(access_token: any) {
  const authRedirectUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL
  const baseUrl = process.env.BASE_URL
  const authClientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID
  const authClientSecret = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET
  if (!authRedirectUrl) throw new Error("No Auth Redirect Url")
  if (!baseUrl) throw new Error("No Base Url Supplied")
  if (!authClientId) throw new Error("No Auth Client Id")
  if (!authClientSecret) throw new Error("No Auth Client Secret")
  const oauth2Client = new google.auth.OAuth2(
    authClientId,
    authClientSecret,
    `${baseUrl}${authRedirectUrl}`
  )
  oauth2Client.setCredentials({ access_token: access_token })
  return oauth2Client
}
