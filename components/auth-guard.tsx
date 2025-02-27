"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const publicPaths = ["/login", "/signup", "/forgot-password"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && !publicPaths.includes(pathname)) {
        router.push("/login");
      } else if (user && publicPaths.includes(pathname)) {
        router.push("/");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-t-2 border-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  return children;
}