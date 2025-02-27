"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Upload, 
  Hash, 
  Music2, 
  AtSign, 
  Globe, 
  Lock,
  Image,
  Trash2,
  AlertCircle,
  Search
} from "lucide-react";

export default function SchedulePage() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create preview URL for video
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleRemoveFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setSelectedFile(null);
    setPreview(null);
  };

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
                  <Button variant="ghost" className="bg-zinc-800/50 text-white">
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

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Schedule Content</h1>
            <p className="text-zinc-400 mt-1">Plan and automate your TikTok posts</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
            disabled={!selectedFile || !date}
          >
            Schedule Post
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Upload Video</h2>
                {selectedFile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    onClick={handleRemoveFile}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                {!selectedFile ? (
                  <div 
                    className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-pink-500 transition-colors cursor-pointer relative group"
                    onClick={() => document.getElementById('video-upload')?.click()}
                  >
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      id="video-upload"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                        <Upload className="h-8 w-8 text-pink-500" />
                      </div>
                      <p className="text-lg font-medium mb-2">Drop your video here</p>
                      <p className="text-sm text-zinc-400">
                        or click to browse (MP4, MOV up to 500MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                    {preview && (
                      <video
                        src={preview}
                        className="w-full h-full object-cover"
                        controls
                      />
                    )}
                  </div>
                )}

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      placeholder="Enter a catchy title"
                      className="bg-zinc-800/50 border-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Caption</Label>
                    <Textarea
                      placeholder="Write an engaging caption..."
                      className="bg-zinc-800/50 border-zinc-700 min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Hashtags</Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="trending dance challenge"
                          className="bg-zinc-800/50 border-zinc-700 pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Sound</Label>
                      <div className="relative">
                        <Music2 className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="Original sound"
                          className="bg-zinc-800/50 border-zinc-700 pl-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
              <h2 className="text-lg font-medium mb-6">Advanced Settings</h2>
              
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Mentions</Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <Input
                        placeholder="@username"
                        className="bg-zinc-800/50 border-zinc-700 pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <Input
                        placeholder="Add location"
                        className="bg-zinc-800/50 border-zinc-700 pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-zinc-400" />
                    <div>
                      <p className="font-medium">Private Video</p>
                      <p className="text-sm text-zinc-400">Only you can see this video</p>
                    </div>
                  </div>
                  <Button
                    variant={isPrivate ? "default" : "outline"}
                    className={isPrivate ? "bg-pink-500 hover:bg-pink-600" : "border-zinc-700"}
                    onClick={() => setIsPrivate(!isPrivate)}
                  >
                    {isPrivate ? "Private" : "Public"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Schedule Section */}
          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm h-fit sticky top-8">
            <div className="p-6">
              <h2 className="text-lg font-medium mb-6">Schedule Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Post Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-zinc-700 bg-zinc-800/50"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Post Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="bg-zinc-800/50 border-zinc-700 pl-9"
                    />
                  </div>
                </div>

                {!selectedFile && (
                  <div className="flex items-center gap-2 p-3 text-sm text-amber-400 bg-amber-500/10 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    <p>Please upload a video first</p>
                  </div>
                )}

                {selectedFile && !date && (
                  <div className="flex items-center gap-2 p-3 text-sm text-amber-400 bg-amber-500/10 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    <p>Select a date to schedule</p>
                  </div>
                )}

                <div className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                    disabled={!selectedFile || !date}
                  >
                    Schedule Post
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-zinc-700 hover:bg-zinc-800"
                  >
                    Save as Draft
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}