import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const accessToken = cookies().get('tiktok_access_token')?.value;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token found' },
        { status: 401 }
      );
    }

    // Fetch basic user info with required fields
    const userResponse = await fetch('https://open.tiktokapis.com/v2/user/info/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    return NextResponse.json({
      profile: userData.data.user,
      metrics: {
        followers: userData.data.user.follower_count || 0,
        following: userData.data.user.following_count || 0,
        likes: userData.data.user.likes_count || 0,
        videos: userData.data.user.video_count || 0
      }
    });
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
