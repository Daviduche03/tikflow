"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Settings,
  Heart,
  MessageCircle,
  UserPlus,
  Hash,
  Music2,
  Zap,
} from "lucide-react";

export default function AutomationPage() {
  const [engagementLevel, setEngagementLevel] = useState([50]);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Automation Settings</h1>
            <p className="text-zinc-400 mt-1">Configure your automation preferences</p>
          </div>
          <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
            <Zap className="mr-2 h-4 w-4" />
            Apply Settings
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium">Engagement Rules</h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Configure how your account interacts with other content
                  </p>
                </div>
                <Settings className="h-5 w-5 text-zinc-400" />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-Like Posts</Label>
                    <p className="text-sm text-zinc-400">
                      Like posts from followed accounts
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-Comment</Label>
                    <p className="text-sm text-zinc-400">
                      Comment on posts from your niche
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-Follow</Label>
                    <p className="text-sm text-zinc-400">
                      Follow accounts in your niche
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-4">
                  <Label>Engagement Level</Label>
                  <Slider
                    value={engagementLevel}
                    onValueChange={setEngagementLevel}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium">Targeting</h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Define your target audience and content
                  </p>
                </div>
                <UserPlus className="h-5 w-5 text-zinc-400" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Hashtags</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input
                      placeholder="dance, fashion, lifestyle"
                      className="bg-zinc-800/50 border-zinc-700 pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Sounds</Label>
                  <div className="relative">
                    <Music2 className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input
                      placeholder="trending sounds, specific songs"
                      className="bg-zinc-800/50 border-zinc-700 pl-9"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium">Comment Templates</h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Customize your automated comments
                  </p>
                </div>
                <MessageCircle className="h-5 w-5 text-zinc-400" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Generic Comments</Label>
                  <textarea
                    className="w-full h-32 px-3 py-2 rounded-md bg-zinc-800/50 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter one comment per line"
                    defaultValue={`Love this content! 🔥\nAmazing work! 👏\nThis is incredible! ✨`}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Niche-Specific Comments</Label>
                  <textarea
                    className="w-full h-32 px-3 py-2 rounded-md bg-zinc-800/50 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter one comment per line"
                    defaultValue={`Great choreography! 💃\nYour style is on point! 👗\nNeed this in my routine! 🎵`}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium">Safety Settings</h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Protect your account while automating
                  </p>
                </div>
                <Heart className="h-5 w-5 text-zinc-400" />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Daily Interaction Limit</Label>
                    <p className="text-sm text-zinc-400">
                      Maximum actions per day
                    </p>
                  </div>
                  <Input
                    type="number"
                    defaultValue="100"
                    className="w-24 bg-zinc-800/50 border-zinc-700"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Action Delay</Label>
                    <p className="text-sm text-zinc-400">
                      Seconds between actions
                    </p>
                  </div>
                  <Input
                    type="number"
                    defaultValue="30"
                    className="w-24 bg-zinc-800/50 border-zinc-700"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Blacklist Words</Label>
                    <p className="text-sm text-zinc-400">
                      Avoid interacting with these
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}