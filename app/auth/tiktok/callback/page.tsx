"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";

export default function TikTokCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleTikTokCallback() {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (error) {
        setError("Failed to connect TikTok account");
        return;
      }

      if (!code) {
        setError("No authorization code received");
        return;
      }

      try {
        // Exchange the code for an access token
        const response = await fetch("/api/auth/tiktok", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        // Store the TikTok credentials in Supabase
        const { error: updateError } = await supabase
          .from("user_connections")
          .upsert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            provider: "tiktok",
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
          });

        if (updateError) {
          throw updateError;
        }

        // Redirect to the dashboard
        router.push("/");
      } catch (err: any) {
        setError(err.message);
      }
    }

    handleTikTokCallback();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm max-w-md w-full">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Connection Failed</h2>
            <p className="text-zinc-400">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm max-w-md w-full">
        <div className="text-center">
          <div className="w-8 h-8 border-t-2 border-pink-500 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Connecting TikTok Account</h2>
          <p className="text-zinc-400">Please wait while we complete the connection...</p>
        </div>
      </Card>
    </div>
  );
}