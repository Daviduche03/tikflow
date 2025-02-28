import { useState, useEffect } from 'react';

export interface TikTokData {
  profile: {
    display_name: string;
    avatar_url: string;
    bio_description: string;
    follower_count: number;
    following_count: number;
    likes_count: number;
    video_count: number;
  };
  metrics: {
    followers: number;
    following: number;
    likes: number;
    videos: number;
  };
}

export function useTikTokData() {
  const [data, setData] = useState<TikTokData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/tiktok/analytics');
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || 'Failed to fetch TikTok data');
        }

        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
