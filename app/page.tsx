"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp, Video, Users, Search, MoreVertical, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useTikTokData } from "@/lib/hooks/useTikTokData";

const analyticsData = [
  { date: "Jan 1", views: 4000, engagement: 2400 },
  { date: "Jan 8", views: 3000, engagement: 1398 },
  { date: "Jan 15", views: 5000, engagement: 9800 },
  { date: "Jan 22", views: 7800, engagement: 3908 },
  { date: "Jan 29", views: 8890, engagement: 4800 },
  { date: "Feb 5", views: 9390, engagement: 3800 },
  { date: "Feb 12", views: 11400, engagement: 4300 }
];

const recentPosts = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60",
    title: "Summer Dance Challenge",
    views: "1.2M",
    engagement: "12.5%",
    status: "trending"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=60",
    title: "Cooking Tutorial #45",
    views: "856K",
    engagement: "9.2%",
    status: "scheduled"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60",
    title: "Travel Vlog: Paris",
    views: "945K",
    engagement: "10.3%",
    status: "published"
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/90 border border-zinc-800/50 backdrop-blur-sm p-3 rounded-lg shadow-xl">
        <p className="text-zinc-400 text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name === 'views' ? 'Views: ' : 'Engagement: '}
            <span className="font-medium">{entry.value}K</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const chartDefaults = {
  xAxis: {
    stroke: "#525252",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    padding: { left: 0, right: 0 },
    tick: { fill: '#525252' }
  },
  yAxis: {
    stroke: "#525252",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    tick: { fill: '#525252' },
    padding: { top: 20, bottom: 20 },
    tickFormatter: (value: number) => `${value}K`
  }
};

export default function Dashboard() {
  const { data: tikTokData, loading, error } = useTikTokData();

  const metrics = [
    { 
      title: "Followers", 
      value: tikTokData ? `${(tikTokData.metrics.followers / 1000).toFixed(1)}K` : '...',
      change: "+8%", // Note: Historical data not available in basic API
      icon: Users
    },
    { 
      title: "Following", 
      value: tikTokData ? tikTokData.metrics.following.toLocaleString() : '...',
      change: "+2%",
      icon: Activity
    },
    { 
      title: "Total Likes", 
      value: tikTokData ? `${(tikTokData.metrics.likes / 1000).toFixed(1)}K` : '...',
      change: "+23%",
      icon: TrendingUp
    },
    { 
      title: "Videos", 
      value: tikTokData ? tikTokData.metrics.videos.toString() : '...',
      change: "+12%",
      icon: Video
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                  TikFlow
                </h1>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/">
                  <Button variant="ghost" className="text-zinc-400 hover:text-white">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/schedule">
                  <Button variant="ghost" className="text-zinc-400 hover:text-white">
                    Schedule
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="ghost" className="text-zinc-400 hover:text-white">
                    Analytics
                  </Button>
                </Link>
                <Link href="/automation">
                  <Button variant="ghost" className="text-zinc-400 hover:text-white">
                    Automation
                  </Button>
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <Search className="h-5 w-5" />
              </Button>
              <Link href="/login">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60" alt="User" />
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {error ? (
          <Card className="p-6 bg-red-500/10 border-red-500/20 mb-8">
            <p className="text-red-500">Failed to load TikTok data. Please reconnect your account.</p>
          </Card>
        ) : null}

        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="h-5 w-5 text-zinc-400" />
                  {!loading && (
                    <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400">{metric.title}</p>
                <p className="text-3xl font-bold mt-1 tracking-tight">
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    metric.value
                  )}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Analytics Chart */}
        <Card className="mb-8 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-medium">Performance Overview</h2>
                <p className="text-sm text-zinc-400 mt-1">Views and engagement metrics</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs border-zinc-800 bg-zinc-900/50">
                  Last 7 days
                </Button>
                <Button variant="outline" size="sm" className="text-xs border-zinc-800 bg-zinc-900/50">
                  Last 30 days
                </Button>
                <Button variant="outline" size="sm" className="text-xs border-zinc-800 bg-zinc-900/50">
                  All time
                </Button>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer>
                <AreaChart 
                  data={analyticsData} 
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(236, 72, 153)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(167, 139, 250)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="rgb(167, 139, 250)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="rgba(255,255,255,0.1)" 
                    vertical={false} 
                  />
                  <XAxis 
                    dataKey="date" 
                    {...chartDefaults.xAxis}
                  />
                  <YAxis 
                    {...chartDefaults.yAxis}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    name="views"
                    type="monotone"
                    dataKey="views"
                    stroke="rgb(236, 72, 153)"
                    strokeWidth={2}
                    fill="url(#viewsGradient)"
                    activeDot={{ r: 4, strokeWidth: 2 }}
                  />
                  <Area
                    name="engagement"
                    type="monotone"
                    dataKey="engagement"
                    stroke="rgb(167, 139, 250)"
                    strokeWidth={2}
                    fill="url(#engagementGradient)"
                    activeDot={{ r: 4, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Recent Posts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium">Recent Content</h2>
              <p className="text-sm text-zinc-400 mt-1">Latest posts and their performance</p>
            </div>
            <Link href="/schedule">
              <Button className="bg-pink-500 hover:bg-pink-600">
                Create New Post
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Card key={post.id} className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm"
                  >
                    <PlayCircle className="h-8 w-8" />
                  </Button>
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-black/30 hover:bg-black/50 backdrop-blur-sm"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium 
                      ${post.status === 'trending' 
                        ? 'bg-pink-500/20 text-pink-500' 
                        : post.status === 'scheduled'
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'bg-emerald-500/20 text-emerald-500'
                      }
                    `}>
                      {post.status === 'trending' ? '🔥 Trending' : post.status === 'scheduled' ? '⏰ Scheduled' : '✅ Published'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-3">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-zinc-400">Views</p>
                      <p className="font-medium mt-1">{post.views}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-400">Engagement</p>
                      <p className="font-medium mt-1">{post.engagement}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}