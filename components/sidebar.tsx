"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { ConnectTikTokButton } from "./connect-tiktok-button";
import {
  Activity,
  Calendar,
  Settings,
  TrendingUp,
  Video,
  Users,
  LogOut,
  Bell,
  MoreVertical,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Activity },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Automation", href: "/automation", icon: Settings },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Content", href: "/content", icon: Video },
  { name: "Audience", href: "/audience", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 border-r border-zinc-800">
        <div className="p-6">
          <Link href="/">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              TikFlow
            </h2>
          </Link>
        </div>
        
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isActive
                        ? "bg-zinc-800/50 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
                    )}
                    size="lg"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 px-3">
            <ConnectTikTokButton />
          </div>

          <div className="mt-6">
            <h3 className="px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="px-4 py-3 rounded-lg bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="text-sm">New trending hashtag</p>
                    <p className="text-xs text-zinc-400 mt-0.5">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 rounded-lg bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-violet-500" />
                  <div>
                    <p className="text-sm">Video scheduled for posting</p>
                    <p className="text-xs text-zinc-400 mt-0.5">15 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50">
            <Avatar>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60" alt={user.email || "User"} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{user.email?.split("@")[0]}</p>
              <p className="text-xs text-zinc-400 truncate">{user.email}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}