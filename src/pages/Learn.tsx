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
      level: 1,
      color: "from-primary to-accent-emerald",
      lessons: [
        { id: 1, title: "What is Debate?", completed: true, xp: 50, unlocked: true },
        { id: 2, title: "Debate Formats Overview", completed: true, xp: 75, unlocked: true },
        { id: 3, title: "Speaker Roles & Responsibilities", completed: true, xp: 100, unlocked: true },
        { id: 4, title: "Time Management", completed: true, xp: 75, unlocked: true },
        { id: 5, title: "Understanding Motions", completed: true, xp: 100, unlocked: true },
        { id: 6, title: "Basic Argument Structure", completed: true, xp: 125, unlocked: true },
        { id: 7, title: "Evidence and Examples", completed: true, xp: 100, unlocked: true },
        { id: 8, title: "Points of Information (POI)", completed: true, xp: 150, unlocked: true },
        { id: 9, title: "Practice Quiz", completed: false, xp: 200, unlocked: true },
        { id: 10, title: "Module Assessment", completed: false, xp: 250, unlocked: true }
      ]
    },
    {
      id: 2,
      title: "Argumentation Mastery",
      description: "Build compelling and logical arguments",
      completed: 0,
      total: 8,
      unlocked: false,
      level: 2,
      color: "from-accent-sapphire to-accent-emerald",
      lessons: [
        { id: 1, title: "Claims, Warrants, and Impacts", completed: false, xp: 100, unlocked: false },
        { id: 2, title: "Logical Reasoning", completed: false, xp: 125, unlocked: false },
        { id: 3, title: "Types of Evidence", completed: false, xp: 100, unlocked: false },
        { id: 4, title: "Addressing Counter-Arguments", completed: false, xp: 150, unlocked: false },
        { id: 5, title: "Comparative Analysis", completed: false, xp: 175, unlocked: false },
        { id: 6, title: "Burden of Proof", completed: false, xp: 150, unlocked: false },
        { id: 7, title: "Advanced Argumentation", completed: false, xp: 200, unlocked: false },
        { id: 8, title: "Mastery Challenge", completed: false, xp: 300, unlocked: false }
      ]
    },
    {
      id: 3,
      title: "Rebuttal Techniques",
      description: "Learn to effectively counter opposing arguments",
      completed: 0,
      total: 6,
      unlocked: false,
      level: 3,
      color: "from-accent-ruby to-accent-gold",
      lessons: [
        { id: 1, title: "Identifying Weaknesses", completed: false, xp: 125, unlocked: false },
        { id: 2, title: "Direct Refutation", completed: false, xp: 150, unlocked: false },
        { id: 3, title: "Turning Arguments", completed: false, xp: 175, unlocked: false },
        { id: 4, title: "Logical Fallacies", completed: false, xp: 200, unlocked: false },
        { id: 5, title: "Strategic Rebuttal", completed: false, xp: 225, unlocked: false },
        { id: 6, title: "Rebuttal Mastery", completed: false, xp: 300, unlocked: false }
      ]
    },
    {
      id: 4,
      title: "Advanced Persuasion",
      description: "Master the art of compelling persuasion",
      completed: 0,
      total: 7,
      unlocked: false,
      level: 4,
      color: "from-accent-gold to-primary",
      lessons: [
        { id: 1, title: "Psychology of Persuasion", completed: false, xp: 150, unlocked: false },
        { id: 2, title: "Emotional Appeals", completed: false, xp: 175, unlocked: false },
        { id: 3, title: "Credibility Building", completed: false, xp: 150, unlocked: false },
        { id: 4, title: "Audience Analysis", completed: false, xp: 200, unlocked: false },
        { id: 5, title: "Storytelling in Debate", completed: false, xp: 225, unlocked: false },
        { id: 6, title: "Handling Hostile Audiences", completed: false, xp: 250, unlocked: false },
        { id: 7, title: "Persuasion Mastery", completed: false, xp: 400, unlocked: false }
      ]
    },
    {
      id: 5,
      title: "Championship Debate",
      description: "Elite-level debate tactics and strategies",
      completed: 0,
      total: 6,
      unlocked: false,
      level: 5,
      color: "from-accent-emerald to-accent-ruby",
      lessons: [
        { id: 1, title: "Tournament Strategy", completed: false, xp: 200, unlocked: false },
        { id: 2, title: "Cross-Examination Mastery", completed: false, xp: 250, unlocked: false },
        { id: 3, title: "Advanced Research Methods", completed: false, xp: 200, unlocked: false },
        { id: 4, title: "Judge Adaptation", completed: false, xp: 300, unlocked: false },
        { id: 5, title: "Flow Management", completed: false, xp: 275, unlocked: false },
        { id: 6, title: "Championship Final", completed: false, xp: 500, unlocked: false }
      ]
    }
  ];

  // Update module unlock logic
  const updatedModules = modules.map((module, index) => {
    if (index === 0) return module; // First module always unlocked
    const prevModule = modules[index - 1];
    const isUnlocked = prevModule.completed === prevModule.total;
    return { ...module, unlocked: isUnlocked };
  });

  const [celebrationActive, setCelebrationActive] = useState(false);
  const [showVakyaAI, setShowVakyaAI] = useState(false);

  const triggerCelebration = () => {
    setCelebrationActive(true);
    setShowVakyaAI(true);
    setTimeout(() => {
      setCelebrationActive(false);
      setShowVakyaAI(false);
    }, 3000);
  };

  const LessonCard = ({ lesson, moduleColor, isLocked }) => (
    <motion.div
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
    >
      <Card className={`transition-all duration-300 ${
        isLocked 
          ? 'opacity-50 cursor-not-allowed bg-muted/50 border-border/50' 
          : lesson.completed 
            ? 'bg-gradient-to-r from-accent-emerald/10 to-primary/10 border-accent-emerald/30 hover:shadow-xl cursor-pointer' 
            : 'bg-card border-border hover:shadow-lg cursor-pointer hover-lift'
      }`}
      onClick={() => !isLocked && !lesson.completed && triggerCelebration()}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isLocked ? (
                <Lock className="h-5 w-5 text-muted-foreground" />
              ) : lesson.completed ? (
                <CheckCircle className="h-5 w-5 text-accent-emerald animate-pulse" />
              ) : (
                <Play className="h-5 w-5 text-primary hover-bounce" />
              )}
              <div>
                <h4 className={`font-medium ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {lesson.title}
                </h4>
                <p className={`text-sm ${isLocked ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {lesson.xp} XP
                </p>
              </div>
            </div>
            {lesson.completed && (
              <Badge className="bg-accent-emerald text-white animate-glow-pulse">
                Complete ✨
              </Badge>
            )}
            {isLocked && (
              <Badge variant="secondary" className="text-muted-foreground">
                Locked
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
            {module.lessons.map((lesson, index) => {
              const prevLesson = index > 0 ? module.lessons[index - 1] : null;
              const isLocked = prevLesson && !prevLesson.completed;
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LessonCard lesson={lesson} moduleColor={module.color} isLocked={isLocked} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted relative">
      {/* Celebration Effects */}
      {celebrationActive && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/20 to-accent-emerald/20 animate-pulse" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: '2rem'
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}

      {/* Vakya AI Celebration */}
      {showVakyaAI && (
        <div className="fixed bottom-20 right-20 z-50 animate-bounce-in">
          <div className="bg-gradient-to-r from-primary to-accent-emerald p-6 rounded-full shadow-2xl animate-sparkle">
            <div className="text-6xl">🤖</div>
          </div>
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-card p-3 rounded-lg shadow-lg animate-bounce">
            <p className="text-sm font-medium text-foreground whitespace-nowrap">
              🎉 Awesome job! Keep going! 🎉
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-foreground">Learning Path</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Master the Art of Debate</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Progress through our carefully crafted modules to become a skilled debater
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {updatedModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className={`h-full transition-all duration-300 card-professional relative overflow-hidden ${
                  module.unlocked 
                    ? 'cursor-pointer hover-lift' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => module.unlocked && setSelectedModule(module.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`bg-gradient-to-r ${module.color} p-3 rounded-lg shadow-lg animate-sparkle`}>
                      {module.unlocked ? (
                        <BookOpen className="h-6 w-6 text-white" />
                      ) : (
                        <Lock className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className="bg-gradient-to-r from-accent-gold to-accent-emerald text-white text-xs">
                        Level {module.level}
                      </Badge>
                      {!module.unlocked && (
                        <Badge variant="secondary" className="text-muted-foreground">
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-foreground text-xl font-bold">{module.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">
                        {module.completed}/{module.total}
                      </span>
                    </div>
                    <Progress 
                      value={(module.completed / module.total) * 100} 
                      className="h-3"
                    />
                    {module.completed === module.total && (
                      <div className="flex items-center space-x-2 text-accent-emerald">
                        <Star className="h-4 w-4 animate-sparkle" />
                        <span className="text-sm font-medium">Mastered! 🏆</span>
                      </div>
                    )}
                    {!module.unlocked && (
                      <div className="text-xs text-muted-foreground">
                        Complete Level {module.level - 1} to unlock
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
