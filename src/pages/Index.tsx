
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Zap, BookOpen, Mic, Star, Target, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Alex",
    level: 5,
    xp: 2340,
    xpToNext: 660,
    streak: 7,
    totalDebates: 23,
    winRate: 68,
    badges: ["First Steps", "Quick Learner", "Debate Rookie"]
  });

  const [learningProgress] = useState([
    { id: 1, title: "Debate Fundamentals", completed: 8, total: 10, unlocked: true },
    { id: 2, title: "Argumentation Mastery", completed: 3, total: 8, unlocked: true },
    { id: 3, title: "Rebuttal Techniques", completed: 0, total: 6, unlocked: false },
    { id: 4, title: "Advanced Strategy", completed: 0, total: 12, unlocked: false }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Vakya</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">{user.streak}</span>
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-white text-sm">
                Level {user.level}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <span>Welcome back, {user.name}!</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Ready to sharpen your debate skills today?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button 
                      onClick={() => navigate('/learn')}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                    <Button 
                      onClick={() => navigate('/debate')}
                      variant="outline" 
                      className="border-purple-400 text-purple-200 hover:bg-purple-500/20"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Start Debate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Your Learning Journey</h2>
              <div className="space-y-4">
                {learningProgress.map((module, index) => (
                  <Card 
                    key={module.id} 
                    className={`bg-white/5 border-white/10 ${module.unlocked ? 'hover:bg-white/10 cursor-pointer' : 'opacity-50'} transition-all duration-200`}
                    onClick={() => module.unlocked && navigate('/learn')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                        {!module.unlocked && (
                          <Badge variant="secondary" className="bg-gray-600">Locked</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <Progress 
                          value={(module.completed / module.total) * 100} 
                          className="flex-1 h-2"
                        />
                        <span className="text-sm text-gray-300">
                          {module.completed}/{module.total}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/20 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-200 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-green-400" />
                      <span>Practice Drills</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Quick exercises to sharpen specific skills
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/20 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-200 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Mic className="h-5 w-5 text-red-400" />
                      <span>AI Challenge</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Face our most advanced AI opponent
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* XP Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white">{user.level}</div>
                    <div className="text-sm text-gray-400">Level</div>
                  </div>
                  <Progress value={(user.xp / (user.xp + user.xpToNext)) * 100} className="mb-2" />
                  <div className="text-sm text-gray-400 text-center">
                    {user.xp} / {user.xp + user.xpToNext} XP
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">Debates</span>
                    </div>
                    <span className="text-white font-semibold">{user.totalDebates}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-gray-300">Win Rate</span>
                    </div>
                    <span className="text-white font-semibold">{user.winRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-orange-400" />
                      <span className="text-gray-300">Streak</span>
                    </div>
                    <span className="text-white font-semibold">{user.streak} days</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span>Recent Badges</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.badges.map((badge, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 border-yellow-500/20"
                      >
                        {badge}
                      </Badge>
                    ))}
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

export default Index;
