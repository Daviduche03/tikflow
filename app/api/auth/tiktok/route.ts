import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // Exchange the authorization code for an access token
    const tokenResponse = await fetch("https://open-api.tiktok.com/oauth/access_token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_key: process.env.TIKTOK_CLIENT_ID,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.message || "Failed to exchange authorization code");
    }

    return NextResponse.json(tokenData);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}