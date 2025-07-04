
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Mic, Trophy, Users, Zap, Target } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-400 via-green-500 to-blue-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master the Art of
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Debate
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50 max-w-3xl mx-auto leading-relaxed">
              Sharpen your argumentation skills, engage in thoughtful discussions, and become a confident communicator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Link to="/learn">Start Learning</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <Link to="/debate">Join Debate</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Vakya?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to become an exceptional debater and communicator.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Interactive Learning",
                description: "Master debate techniques through engaging, bite-sized lessons designed for all skill levels."
              },
              {
                icon: Mic,
                title: "Live Debates",
                description: "Practice with AI opponents and real people to hone your skills in real-time discussions."
              },
              {
                icon: Trophy,
                title: "Track Progress",
                description: "Monitor your improvement with detailed analytics and achievement badges."
              },
              {
                icon: Users,
                title: "Community",
                description: "Connect with fellow debaters and learn from a supportive global community."
              },
              {
                icon: Zap,
                title: "AI-Powered",
                description: "Get personalized feedback and suggestions powered by advanced AI technology."
              },
              {
                icon: Target,
                title: "Skill Building",
                description: "Develop critical thinking, logical reasoning, and persuasive communication skills."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-950">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Join thousands of learners who are already mastering the art of debate.
          </p>
          <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50 font-semibold px-12 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Link to="/learn">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Index
