import { supabase } from './supabase';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function connectTikTok() {
  // TikTok OAuth URL - Replace with your actual TikTok Developer App credentials
  const TIKTOK_CLIENT_ID = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID;
  const REDIRECT_URI = encodeURIComponent(`${window.location.origin}/auth/tiktok/callback`);
  const SCOPE = 'user.info.basic,video.list';
  
  const authUrl = `https://www.tiktok.com/auth/authorize?client_key=${TIKTOK_CLIENT_ID}&response_type=code&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&state=${Math.random().toString(36).substring(7)}`;
  
  window.location.href = authUrl;
}