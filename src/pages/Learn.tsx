
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle, Lock, Play, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";

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
          ? 'bg-green-500/10 border-green-500/30' 
          : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {lesson.completed ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <Play className="h-5 w-5 text-white/60" />
              )}
              <div>
                <h4 className="text-white font-medium">{lesson.title}</h4>
                <p className="text-sm text-gray-400">{lesson.xp} XP</p>
              </div>
            </div>
            {lesson.completed && (
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              onClick={() => setSelectedModule(null)}
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Modules
            </Button>
          </div>

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => navigate('/')}
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-white">Learning Path</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Master the Art of Debate</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/5 border-white/10 opacity-50'
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
                      <Badge variant="secondary" className="bg-gray-600">
                        Locked
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-white text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-medium">
                        {module.completed}/{module.total}
                      </span>
                    </div>
                    <Progress 
                      value={(module.completed / module.total) * 100} 
                      className="h-2"
                    />
                    {module.completed === module.total && (
                      <div className="flex items-center space-x-2 text-green-400">
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
