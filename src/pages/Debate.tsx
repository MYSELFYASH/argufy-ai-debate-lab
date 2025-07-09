
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mic, MicOff, Clock, Play, Pause, MessageSquare, Users, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Debate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [debateState, setDebateState] = useState('setup'); // setup, preparation, debate, analysis
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentSpeaker, setCurrentSpeaker] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [notes, setNotes] = useState('');
  const [userSpeech, setUserSpeech] = useState('');
  const recognitionRef = useRef(null);
  
  // Setup state
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedMotion, setSelectedMotion] = useState('');
  const [selectedSide, setSelectedSide] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [aiDifficulty, setAiDifficulty] = useState('intermediate');

  const debateFormats = [
    { value: 'asian-parliamentary', label: 'Asian Parliamentary (AP)' },
    { value: 'british-parliamentary', label: 'British Parliamentary (BP)' },
    { value: 'world-schools', label: 'World Schools Debating' }
  ];

  const sampleMotions = [
    "This house believes that social media has done more harm than good",
    "This house would ban single-use plastics",
    "This house believes that artificial intelligence will replace human jobs",
    "This house would implement universal basic income",
    "This house believes that space exploration should be prioritized over ocean exploration"
  ];

  const speakerRoles = {
    'asian-parliamentary': {
      government: ['Prime Minister', 'Deputy Prime Minister', 'Government Whip'],
      opposition: ['Leader of Opposition', 'Deputy Leader of Opposition', 'Opposition Whip']
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setUserSpeech(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Speech Recognition Error",
          description: "Please check your microphone and try again.",
          variant: "destructive"
        });
      };
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timeLeft > 0 && debateState === 'debate') {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && debateState === 'debate') {
      handleSpeechEnd();
    }
    return () => clearInterval(interval);
  }, [timeLeft, debateState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartDebate = () => {
    if (!selectedFormat || !selectedMotion || !selectedSide || !selectedRole) {
      toast({
        title: "Setup Required",
        description: "Please complete all setup options before starting the debate.",
        variant: "destructive"
      });
      return;
    }
    
    setDebateState('preparation');
    setTimeLeft(25 * 60); // 25 minutes prep time
    toast({
      title: "Preparation Time Started",
      description: "You have 25 minutes to prepare your arguments.",
    });
  };

  const handleStartSpeech = () => {
    setDebateState('debate');
    setTimeLeft(8 * 60); // 8 minutes speech time
    setCurrentSpeaker('You');
    setIsRecording(true);
    toast({
      title: "Speech Started",
      description: "You have 8 minutes for your opening speech. Good luck!",
    });
  };

  const handleSpeechEnd = () => {
    setIsRecording(false);
    // Simulate AI response
    setTimeout(() => {
      setCurrentSpeaker('AI Opponent');
      setTimeLeft(8 * 60);
      simulateAIResponse();
    }, 2000);
  };

  const simulateAIResponse = async () => {
    try {
      // Get user's speech from transcript or notes for context
      const userArguments = transcript.filter(t => t.speaker === 'You').map(t => t.content).join(' ') || notes;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-svcacct-xWAWbkRImZNtREsm7AAudC2NPAkVllIFWZTFy2NidrZJ1TceuZpdCGKegEBBwST3BlbkFJaIZ0xNzL1PiMY05mv8u55Ejkt7HyJirbNU4MmbCLMwEuMnwjEuoktCU1Mick4A'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an AI debate opponent in a ${selectedFormat} debate. The motion is: "${selectedMotion}". You are arguing for the ${selectedSide === 'government' ? 'opposition' : 'government'} side. Your difficulty level is ${aiDifficulty}. Provide a structured, compelling counter-argument to the user's points. Keep your response to about 300-400 words as this is a timed debate speech.`
            },
            {
              role: 'user',
              content: `The user has argued: ${userArguments || 'Please provide your opening statement for the ' + selectedSide + ' side.'}`
            }
          ],
          max_tokens: 600,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse = {
        speaker: 'AI Opponent',
        content: data.choices[0].message.content,
        timestamp: new Date().toLocaleTimeString(),
        duration: '7:32'
      };
      
      setTranscript(prev => [...prev, aiResponse]);
      
      // Use speech synthesis to read AI response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse.content);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }
      
      // After AI speech, transition to analysis
      setTimeout(() => {
        setDebateState('analysis');
        generateAnalysis();
      }, 8000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const fallbackResponse = {
        speaker: 'AI Opponent',
        content: 'I apologize, but I encountered a technical issue. Let me provide a brief counter-argument: Your points are interesting, but I believe there are several counterpoints worth considering...',
        timestamp: new Date().toLocaleTimeString(),
        duration: '2:00'
      };
      setTranscript(prev => [...prev, fallbackResponse]);
      
      setTimeout(() => {
        setDebateState('analysis');
        generateAnalysis();
      }, 3000);
    }
  };

  const generateAnalysis = () => {
    toast({
      title: "Debate Complete!",
      description: "Generating your detailed performance analysis...",
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording && recognitionRef.current) {
      // Start recording
      recognitionRef.current.start();
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone.",
      });
    } else if (recognitionRef.current) {
      // Stop recording
      recognitionRef.current.stop();
      if (userSpeech) {
        // Add user speech to transcript
        const userEntry = {
          speaker: 'You',
          content: userSpeech,
          timestamp: new Date().toLocaleTimeString(),
          duration: formatTime(8 * 60 - timeLeft)
        };
        setTranscript(prev => [...prev, userEntry]);
        setUserSpeech('');
      }
      toast({
        title: "Recording Stopped",
        description: "Your speech has been captured.",
      });
    }
  };

  // Setup Screen
  if (debateState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => navigate('/')}
                variant="ghost" 
                className="text-foreground hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Debate Setup</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-2xl">Configure Your Debate</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Set up your debate parameters before facing the AI opponent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Debate Format */}
                <div className="space-y-2">
                  <label className="text-white font-medium">Debate Format</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Choose a debate format" />
                    </SelectTrigger>
                    <SelectContent>
                      {debateFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Motion */}
                <div className="space-y-2">
                  <label className="text-white font-medium">Motion</label>
                  <Select value={selectedMotion} onValueChange={setSelectedMotion}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select a motion to debate" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleMotions.map((motion, index) => (
                        <SelectItem key={index} value={motion}>
                          {motion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Side */}
                <div className="space-y-2">
                  <label className="text-white font-medium">Your Side</label>
                  <Select value={selectedSide} onValueChange={setSelectedSide}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Choose your side" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government (Supporting)</SelectItem>
                      <SelectItem value="opposition">Opposition (Against)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Speaker Role */}
                {selectedFormat && selectedSide && (
                  <div className="space-y-2">
                    <label className="text-white font-medium">Speaker Role</label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Choose your speaker role" />
                      </SelectTrigger>
                      <SelectContent>
                        {speakerRoles[selectedFormat]?.[selectedSide]?.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* AI Difficulty */}
                <div className="space-y-2">
                  <label className="text-white font-medium">AI Opponent Difficulty</label>
                  <Select value={aiDifficulty} onValueChange={setAiDifficulty}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner - Basic arguments</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Structured reasoning</SelectItem>
                      <SelectItem value="advanced">Advanced - Expert-level analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleStartDebate}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Debate
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Preparation Screen
  if (debateState === 'preparation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white/5 border-white/10 mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-2xl">Preparation Time</CardTitle>
                    <CardDescription className="text-gray-300">
                      Motion: {selectedMotion}
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">{formatTime(timeLeft)}</div>
                    <div className="text-sm text-gray-400">Time Remaining</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write your arguments, key points, and strategy here..."
                    className="min-h-[400px] bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Debate Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Your Role</h4>
                    <Badge className="bg-purple-500/20 text-purple-200">
                      {selectedRole} ({selectedSide})
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Format</h4>
                    <p className="text-gray-300">{debateFormats.find(f => f.value === selectedFormat)?.label}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">AI Difficulty</h4>
                    <p className="text-gray-300 capitalize">{aiDifficulty}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Speech Time</h4>
                    <p className="text-gray-300">8 minutes per speaker</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 text-center">
              <Button 
                onClick={handleStartSpeech}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Mic className="h-4 w-4 mr-2" />
                Start Speaking
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Debate Screen
  if (debateState === 'debate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Status Bar */}
            <Card className="bg-white/5 border-white/10 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge className={`${currentSpeaker === 'You' ? 'bg-blue-500/20 text-blue-200' : 'bg-red-500/20 text-red-200'}`}>
                      {currentSpeaker} Speaking
                    </Badge>
                    <div className="text-white">
                      <span className="font-medium">{selectedRole}</span> - {selectedSide}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{formatTime(timeLeft)}</div>
                    <Progress value={((8 * 60 - timeLeft) / (8 * 60)) * 100} className="w-32 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Speech Area */}
              <div className="lg:col-span-2">
                <Card className="bg-white/5 border-white/10 h-96">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Live Transcription</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-full overflow-y-auto">
                    {currentSpeaker === 'You' ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <motion.div
                            animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Mic className={`h-16 w-16 mx-auto mb-4 ${isRecording ? 'text-red-400' : 'text-gray-400'}`} />
                          </motion.div>
                          <p className="text-white text-lg">
                            {isRecording ? 'Listening...' : 'Click to start recording'}
                          </p>
                          <Button
                            onClick={toggleRecording}
                            className={`mt-4 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                          >
                            {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                            {isRecording ? 'Pause' : 'Resume'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {transcript.map((entry, index) => (
                          <div key={index} className="bg-white/5 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-purple-300 font-medium">{entry.speaker}</span>
                              <span className="text-gray-400 text-sm">{entry.timestamp}</span>
                            </div>
                            <p className="text-white whitespace-pre-line">{entry.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Notes */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Quick Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Jot down points during the debate..."
                      className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    />
                  </CardContent>
                </Card>

                {/* POI Controls */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Points of Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      disabled={currentSpeaker === 'You'}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Offer POI
                    </Button>
                    <p className="text-gray-400 text-sm mt-2">
                      Available during opponent's speech
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Analysis Screen
  if (debateState === 'analysis') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/20">
              <CardContent className="p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="bg-yellow-400 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                    <Settings className="h-8 w-8 text-yellow-900" />
                  </div>
                </motion.div>
                <h1 className="text-4xl font-bold text-white mb-4">Debate Analysis</h1>
                <p className="text-xl text-gray-300 mb-8">
                  Your detailed performance analysis is being generated...
                </p>
                <div className="space-y-4">
                  <Progress value={75} className="w-full" />
                  <p className="text-gray-400">Analyzing speech patterns, argument structure, and delivery...</p>
                </div>
                <Button 
                  onClick={() => navigate('/')}
                  className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default Debate;
