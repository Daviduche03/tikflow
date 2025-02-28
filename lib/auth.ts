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

export const connectTikTok = () => {
  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI;
  
  if (!clientKey || !redirectUri) {
    console.error('Missing TikTok configuration:', { clientKey: !!clientKey, redirectUri: !!redirectUri });
    return;
  }

  const scope = 'user.info.basic,video.list,video.upload';
  const csrfState = Math.random().toString(36).substring(7);
  
  // Store the CSRF state in a cookie
  document.cookie = `csrfState=${csrfState}; path=/; max-age=3600; secure; samesite=lax`;

  const authUrl = 'https://www.tiktok.com/v2/auth/authorize/';
  const params = new URLSearchParams({
    client_key: clientKey,
    scope: scope,
    response_type: 'code',
    redirect_uri: redirectUri,
    state: csrfState
  });

  const finalUrl = `${authUrl}?${params.toString()}`;
  console.log('Authorization URL:', finalUrl); // For debugging
  window.location.href = finalUrl;
};