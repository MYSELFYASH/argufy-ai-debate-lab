
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Zap, BookOpen, Mic, Star, Target, Award, TrendingUp, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      {/* Header */}
      <header className="border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{user.streak}</span>
              </div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
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
              <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>Welcome back, {user.name}!</span>
                  </CardTitle>
                  <CardDescription className="text-green-600 dark:text-green-400">
                    Ready to sharpen your debate skills today?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button 
                      onClick={() => navigate('/learn')}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                    <Button 
                      onClick={() => navigate('/debate')}
                      variant="outline" 
                      className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
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
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6">Your Learning Journey</h2>
              <div className="space-y-4">
                {learningProgress.map((module, index) => (
                  <Card 
                    key={module.id} 
                    className={`bg-white dark:bg-green-950 border-green-200 dark:border-green-800 ${
                      module.unlocked ? 'hover:shadow-lg cursor-pointer' : 'opacity-50'
                    } transition-all duration-200`}
                    onClick={() => module.unlocked && navigate('/learn')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">{module.title}</h3>
                        {!module.unlocked && (
                          <Badge variant="secondary" className="bg-gray-200 text-gray-600">Locked</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <Progress 
                          value={(module.completed / module.total) * 100} 
                          className="flex-1 h-2"
                        />
                        <span className="text-sm text-green-600 dark:text-green-400">
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
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6">Quick Start</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <span>Practice Drills</span>
                    </CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-400">
                      Quick exercises to sharpen specific skills
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-purple-800 dark:text-purple-200 flex items-center space-x-2">
                      <Mic className="h-5 w-5 text-purple-500" />
                      <span>AI Challenge</span>
                    </CardTitle>
                    <CardDescription className="text-purple-600 dark:text-purple-400">
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
              <Card className="bg-white dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 text-lg">Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-700 dark:text-green-300">{user.level}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Level</div>
                  </div>
                  <Progress value={(user.xp / (user.xp + user.xpToNext)) * 100} className="mb-2" />
                  <div className="text-sm text-green-600 dark:text-green-400 text-center">
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
              <Card className="bg-white dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 text-lg">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      <span className="text-green-700 dark:text-green-300">Debates</span>
                    </div>
                    <span className="text-green-800 dark:text-green-200 font-semibold">{user.totalDebates}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-green-700 dark:text-green-300">Win Rate</span>
                    </div>
                    <span className="text-green-800 dark:text-green-200 font-semibold">{user.winRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="text-green-700 dark:text-green-300">Streak</span>
                    </div>
                    <span className="text-green-800 dark:text-green-200 font-semibold">{user.streak} days</span>
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
              <Card className="bg-white dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-200 text-lg flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span>Recent Badges</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.badges.map((badge, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
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
