import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    // Verify CSRF state
    const storedState = cookies().get('csrfState')?.value;
    if (!storedState || storedState !== state) {
      console.error('State mismatch - possible CSRF attack');
      return NextResponse.redirect('/login?error=invalid_state');
    }

    if (error) {
      console.error('TikTok auth error:', error, errorDescription);
      return NextResponse.redirect(`/login?error=${error}&description=${errorDescription}`);
    }

    if (!code) {
      return NextResponse.redirect('/login?error=no_code');
    }

    const formData = new URLSearchParams({
      client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI!
    });

    const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: formData
    });

    const data = await tokenResponse.json();
    console.log('Token response:', data);

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', data);
      return NextResponse.redirect('/login?error=token_exchange_failed');
    }

    // Clear CSRF state cookie
    cookies().delete('csrfState');

    // Store the tokens securely
    cookies().set('tiktok_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.redirect('/dashboard');
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect('/login?error=server_error');
  }
}
