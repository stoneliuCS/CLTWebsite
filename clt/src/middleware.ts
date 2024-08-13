import { NextRequest, NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export function middleware(_: NextRequest) {
  const response = NextResponse.next()
  // Add the CORS headers to the response
  response.headers.append("Access-Control-Allow-Credentials", "true")
  response.headers.append("Access-Control-Allow-Origin", "*") // Replace this with your actual origin
  response.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  )
  response.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  )

  return response
}

export const config = {
  matcher: "/api/:path*"
}
