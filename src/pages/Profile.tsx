
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star, Target, Award, Calendar, Edit, Save } from "lucide-react";
import { motion } from "framer-motion";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Passionate debater and critical thinker. Love exploring complex topics and engaging in meaningful discussions.",
    level: 5,
    xp: 2340,
    xpToNext: 660,
    totalDebates: 23,
    winRate: 68,
    streak: 7,
    joinDate: "January 2024",
    badges: [
      { name: "First Steps", description: "Completed your first lesson", earned: "2024-01-15" },
      { name: "Quick Learner", description: "Completed 5 modules in one week", earned: "2024-01-22" },
      { name: "Debate Rookie", description: "Won your first debate", earned: "2024-02-01" },
      { name: "Streak Master", description: "Maintained a 7-day streak", earned: "2024-02-10" }
    ],
    recentActivity: [
      { type: "debate", title: "Completed debate on Climate Change", date: "2 hours ago" },
      { type: "lesson", title: "Finished Argumentation Mastery Module 3", date: "1 day ago" },
      { type: "achievement", title: "Earned 'Streak Master' badge", date: "3 days ago" }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      {/* Header */}
      <header className="border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">Profile</h1>
            </div>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
            >
              {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-green-500 text-white text-xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={profile.name}
                              onChange={(e) => setProfile({...profile, name: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({...profile, email: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <CardTitle className="text-green-800 dark:text-green-200">{profile.name}</CardTitle>
                          <CardDescription className="text-green-600 dark:text-green-400">{profile.email}</CardDescription>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge className="bg-green-500 text-white">Level {profile.level}</Badge>
                            <div className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400">
                              <Calendar className="h-4 w-4" />
                              <span>Joined {profile.joinDate}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full mt-1 p-2 border rounded-md bg-background"
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      />
                    </div>
                  ) : (
                    <p className="text-green-700 dark:text-green-300">{profile.bio}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-white dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile.badges.map((badge, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <Award className="h-5 w-5 text-yellow-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-800 dark:text-green-200">{badge.name}</h4>
                          <p className="text-sm text-green-600 dark:text-green-400">{badge.description}</p>
                          <p className="text-xs text-green-500 dark:text-green-500 mt-1">Earned {badge.earned}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'debate' ? 'bg-blue-100 dark:bg-blue-900' :
                          activity.type === 'lesson' ? 'bg-green-100 dark:bg-green-900' :
                          'bg-yellow-100 dark:bg-yellow-900'
                        }`}>
                          {activity.type === 'debate' ? <Target className="h-4 w-4 text-blue-600" /> :
                           activity.type === 'lesson' ? <Star className="h-4 w-4 text-green-600" /> :
                           <Trophy className="h-4 w-4 text-yellow-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-green-800 dark:text-green-200">{activity.title}</h4>
                          <p className="text-sm text-green-600 dark:text-green-400">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 text-lg">Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-green-700 dark:text-green-300">{profile.level}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Current Level</div>
                  </div>
                  <Progress value={(profile.xp / (profile.xp + profile.xpToNext)) * 100} className="mb-2" />
                  <div className="text-sm text-green-600 dark:text-green-400 text-center">
                    {profile.xp} / {profile.xp + profile.xpToNext} XP to next level
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-white dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 text-lg">Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 dark:text-green-300">Total Debates</span>
                    <span className="text-2xl font-bold text-green-800 dark:text-green-200">{profile.totalDebates}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 dark:text-green-300">Win Rate</span>
                    <span className="text-2xl font-bold text-green-800 dark:text-green-200">{profile.winRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 dark:text-green-300">Current Streak</span>
                    <span className="text-2xl font-bold text-green-800 dark:text-green-200">{profile.streak}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
