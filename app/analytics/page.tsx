"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const viewsData = [
  { date: "Mar 1", views: 2400 },
  { date: "Mar 2", views: 1398 },
  { date: "Mar 3", views: 9800 },
  { date: "Mar 4", views: 3908 },
  { date: "Mar 5", views: 4800 },
  { date: "Mar 6", views: 3800 },
  { date: "Mar 7", views: 4300 },
];

const engagementData = [
  { type: "Likes", value: 45 },
  { type: "Comments", value: 25 },
  { type: "Shares", value: 20 },
  { type: "Saves", value: 10 },
];

const audienceData = [
  { age: "13-17", percentage: 15 },
  { age: "18-24", percentage: 35 },
  { age: "25-34", percentage: 25 },
  { age: "35-44", percentage: 15 },
  { age: "45+", percentage: 10 },
];

const COLORS = ["#ec4899", "#8b5cf6", "#06b6d4", "#10b981"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/90 border border-zinc-800/50 backdrop-blur-sm p-3 rounded-lg shadow-xl">
        <p className="text-zinc-400 text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-medium">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

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
                  <Button variant="ghost" className="bg-zinc-800/50 text-white">
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

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Analytics Overview</h1>
            <p className="text-zinc-400 mt-1">Track your content performance</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === "7d" ? "default" : "outline"}
              className={timeRange === "7d" ? "bg-pink-500 hover:bg-pink-600" : "border-zinc-700"}
              onClick={() => setTimeRange("7d")}
            >
              7 days
            </Button>
            <Button
              variant={timeRange === "30d" ? "default" : "outline"}
              className={timeRange === "30d" ? "bg-pink-500 hover:bg-pink-600" : "border-zinc-700"}
              onClick={() => setTimeRange("30d")}
            >
              30 days
            </Button>
            <Button
              variant={timeRange === "90d" ? "default" : "outline"}
              className={timeRange === "90d" ? "bg-pink-500 hover:bg-pink-600" : "border-zinc-700"}
              onClick={() => setTimeRange("90d")}
            >
              90 days
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Views Chart */}
          <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <h2 className="text-lg font-medium mb-6">Views Performance</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer>
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(236, 72, 153)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#525252"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 0, right: 0 }}
                    tick={{ fill: "#525252" }}
                  />
                  <YAxis
                    stroke="#525252"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}K`}
                    tick={{ fill: "#525252" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="rgb(236, 72, 153)"
                    strokeWidth={2}
                    fill="url(#viewsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Engagement Distribution */}
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <h2 className="text-lg font-medium mb-6">Engagement Distribution</h2>
              <div className="h-[300px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {engagementData.map((item, index) => (
                  <div key={item.type} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-zinc-400">{item.type}</span>
                    <span className="text-sm font-medium ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Audience Demographics */}
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <h2 className="text-lg font-medium mb-6">Audience Age Distribution</h2>
              <div className="h-[300px]">
                <ResponsiveContainer>
                  <BarChart data={audienceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis
                      dataKey="age"
                      stroke="#525252"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#525252"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}