
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Mic, Trophy, Users, Zap, Target } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div className="min-h-screen font-inter">
      {/* Hero Section - Clean and Approachable */}
      <div className="bg-gradient-to-br from-primary/10 via-study-blue/5 to-study-green/10 text-foreground">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="animate-gentle-fade">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-reading">
              Learn to 
              <span className="block text-primary mt-2">
                Debate Better
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Simple, step-by-step lessons to help you speak confidently and think clearly. Perfect for students, professionals, and anyone who wants to improve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button asChild size="lg" className="w-full sm:w-auto big-touch-target text-lg px-8">
                <Link to="/learn">Start Learning</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto big-touch-target text-lg px-8">
                <Link to="/debate">Try Practice</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Features Section */}
      <div className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-reading">
              Why Learn with Vakya?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              We make learning debate skills easy, fun, and effective for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Easy Lessons",
                description: "Step-by-step modules that anyone can follow, from beginners to advanced learners."
              },
              {
                icon: Mic,
                title: "Practice Speaking",
                description: "Practice debates with our AI assistant in a safe, supportive environment."
              },
              {
                icon: Trophy,
                title: "Track Progress",
                description: "See how you improve with clear progress tracking and helpful feedback."
              },
              {
                icon: Users,
                title: "Learn Together",
                description: "Join a community of learners and practice with people at your level."
              },
              {
                icon: Zap,
                title: "Smart Help",
                description: "Get personalized tips and suggestions to improve faster."
              },
              {
                icon: Target,
                title: "Build Skills",
                description: "Develop thinking, speaking, and reasoning skills for school and work."
              }
            ].map((feature, index) => (
              <div key={index} className="study-card hover-gentle animate-smooth-slide" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center">
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 font-reading">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Call to Action */}
      <div className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-reading">
            Ready to Start?
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Join thousands of learners improving their debate and speaking skills.
          </p>
          <Button asChild size="lg" className="big-touch-target text-lg px-12">
            <Link to="/learn">Begin Your Journey</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Index
