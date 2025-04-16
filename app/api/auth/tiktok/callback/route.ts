import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic'; // Prevent static generation

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    // Base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Verify CSRF state
    const storedState = cookies().get('csrfState')?.value;
    if (!storedState || storedState !== state) {
      console.error('State mismatch - possible CSRF attack');
      return NextResponse.redirect(`${baseUrl}/login?error=invalid_state`);
    }

    if (error) {
      console.error('TikTok auth error:', error, errorDescription);
      return NextResponse.redirect(`${baseUrl}/login?error=${error}&description=${errorDescription}`);
    }

    if (!code) {
      return NextResponse.redirect(`${baseUrl}/login?error=no_code`);
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
      return NextResponse.redirect(`${baseUrl}/login?error=token_exchange_failed`);
    }

    // Fetch user info with required fields
    const userInfoResponse = await fetch('https://open.tiktokapis.com/v2/user/info/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${data.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: [
          'open_id',
          'display_name',
          'avatar_url',
          'follower_count',
          'following_count',
          'likes_count',
          'video_count'
        ]
      })
    });

    const userInfo = await userInfoResponse.json();
    
    
    if (!userInfoResponse.ok) {
      console.error('Failed to fetch user info:', userInfo);
      return NextResponse.redirect(`${baseUrl}/login?error=user_info_failed`);
    }

    // Save user info to database
    const { error: dbError } = await supabase
      .from('tiktok_accounts')
      .upsert({
        tiktok_user_id: userInfo.data.user.open_id,
        username: userInfo.data.user.display_name,
        avatar_url: userInfo.data.user.avatar_url,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
        updated_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.redirect(`${baseUrl}/login?error=database_error`);
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

    return NextResponse.redirect(`${baseUrl}`);
  } catch (error) {
    console.error('Callback error:', error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/login?error=server_error`);
  }
}
