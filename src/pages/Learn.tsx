import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle, Lock, Play, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Learn = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState(null);

  const modules = [
    {
      id: 1,
      title: "Debate Fundamentals",
      description: "Master the basics of structured argumentation",
      completed: 8,
      total: 10,
      unlocked: true,
      color: "from-blue-500 to-purple-500",
      lessons: [
        { id: 1, title: "What is Debate?", completed: true, xp: 50 },
        { id: 2, title: "Debate Formats Overview", completed: true, xp: 75 },
        { id: 3, title: "Speaker Roles & Responsibilities", completed: true, xp: 100 },
        { id: 4, title: "Time Management", completed: true, xp: 75 },
        { id: 5, title: "Understanding Motions", completed: true, xp: 100 },
        { id: 6, title: "Basic Argument Structure", completed: true, xp: 125 },
        { id: 7, title: "Evidence and Examples", completed: true, xp: 100 },
        { id: 8, title: "Points of Information (POI)", completed: true, xp: 150 },
        { id: 9, title: "Practice Quiz", completed: false, xp: 200 },
        { id: 10, title: "Module Assessment", completed: false, xp: 250 }
      ]
    },
    {
      id: 2,
      title: "Argumentation Mastery",
      description: "Build compelling and logical arguments",
      completed: 3,
      total: 8,
      unlocked: true,
      color: "from-green-500 to-emerald-500",
      lessons: [
        { id: 1, title: "Claims, Warrants, and Impacts", completed: true, xp: 100 },
        { id: 2, title: "Logical Reasoning", completed: true, xp: 125 },
        { id: 3, title: "Types of Evidence", completed: true, xp: 100 },
        { id: 4, title: "Addressing Counter-Arguments", completed: false, xp: 150 },
        { id: 5, title: "Comparative Analysis", completed: false, xp: 175 },
        { id: 6, title: "Burden of Proof", completed: false, xp: 150 },
        { id: 7, title: "Advanced Argumentation", completed: false, xp: 200 },
        { id: 8, title: "Mastery Challenge", completed: false, xp: 300 }
      ]
    },
    {
      id: 3,
      title: "Rebuttal Techniques",
      description: "Learn to effectively counter opposing arguments",
      completed: 0,
      total: 6,
      unlocked: false,
      color: "from-red-500 to-pink-500",
      lessons: [
        { id: 1, title: "Identifying Weaknesses", completed: false, xp: 125 },
        { id: 2, title: "Direct Refutation", completed: false, xp: 150 },
        { id: 3, title: "Turning Arguments", completed: false, xp: 175 },
        { id: 4, title: "Logical Fallacies", completed: false, xp: 200 },
        { id: 5, title: "Strategic Rebuttal", completed: false, xp: 225 },
        { id: 6, title: "Rebuttal Mastery", completed: false, xp: 300 }
      ]
    }
  ];

  const LessonCard = ({ lesson, moduleColor }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`cursor-pointer transition-all duration-200 ${
        lesson.completed 
          ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' 
          : 'bg-white dark:bg-green-950 border-green-200 dark:border-green-800 hover:shadow-lg'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {lesson.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Play className="h-5 w-5 text-green-600 dark:text-green-400" />
              )}
              <div>
                <h4 className="text-green-800 dark:text-green-200 font-medium">{lesson.title}</h4>
                <p className="text-sm text-green-600 dark:text-green-400">{lesson.xp} XP</p>
              </div>
            </div>
            {lesson.completed && (
              <Badge className="bg-green-500 text-white">
                Complete
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (selectedModule) {
    const module = modules.find(m => m.id === selectedModule);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <header className="border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              <Button 
                onClick={() => setSelectedModule(null)}
                variant="ghost" 
                className="text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Modules
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className={`bg-gradient-to-r ${module.color} p-6 rounded-xl text-white mb-6`}>
              <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
              <p className="text-white/80 mb-4">{module.description}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>{module.completed}/{module.total} Complete</span>
                </div>
                <Progress value={(module.completed / module.total) * 100} className="w-32" />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {module.lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LessonCard lesson={lesson} moduleColor={module.color} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      {/* Header */}
      <header className="border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">Learning Path</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-4">Master the Art of Debate</h2>
          <p className="text-xl text-green-600 dark:text-green-400 max-w-2xl mx-auto">
            Progress through our carefully crafted modules to become a skilled debater
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 ${
                  module.unlocked 
                    ? 'bg-white dark:bg-green-950 border-green-200 dark:border-green-800 hover:shadow-lg' 
                    : 'bg-white dark:bg-green-950 border-green-200 dark:border-green-800 opacity-50'
                }`}
                onClick={() => module.unlocked && setSelectedModule(module.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`bg-gradient-to-r ${module.color} p-3 rounded-lg`}>
                      {module.unlocked ? (
                        <BookOpen className="h-6 w-6 text-white" />
                      ) : (
                        <Lock className="h-6 w-6 text-white" />
                      )}
                    </div>
                    {!module.unlocked && (
                      <Badge variant="secondary" className="bg-gray-200 text-gray-600">
                        Locked
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-green-800 dark:text-green-200 text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-green-600 dark:text-green-400">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">Progress</span>
                      <span className="text-green-800 dark:text-green-200 font-medium">
                        {module.completed}/{module.total}
                      </span>
                    </div>
                    <Progress 
                      value={(module.completed / module.total) * 100} 
                      className="h-2"
                    />
                    {module.completed === module.total && (
                      <div className="flex items-center space-x-2 text-green-500">
                        <Star className="h-4 w-4" />
                        <span className="text-sm font-medium">Completed!</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
