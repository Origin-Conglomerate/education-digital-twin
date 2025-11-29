import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Camera,
  ChevronRight,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Loader2,
  MessageSquare,
  Mic,
  MoreVertical,
  PieChart,
  Play,
  Plus,
  Send,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  User,
  Video,
  Wand2,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Student Learning Pattern Data
const learningPatternData = {
  preferredStyle: 'Visual',
  comprehension: 87,
  pace: 'Medium',
  strengths: ['Problem Solving', 'Visual Learning', 'Quick Comprehension'],
  improvements: ['Listening Skills', 'Time Management'],
  studyTime: {
    total: 24.5,
    thisWeek: 8.2
  },
  performance: {
    predicted: 92,
    current: 85,
    trend: 'up'
  }
};

// Mock courses
const activeCourses = [
  { id: 1, name: 'Mathematics', progress: 68, nextTopic: 'Calculus Fundamentals', difficulty: 'medium' },
  { id: 2, name: 'Physics', progress: 45, nextTopic: 'Quantum Mechanics', difficulty: 'hard' },
  { id: 3, name: 'Chemistry', progress: 82, nextTopic: 'Organic Compounds', difficulty: 'easy' },
  { id: 4, name: 'Computer Science', progress: 91, nextTopic: 'Data Structures', difficulty: 'medium' }
];

// Mock AI-generated content types
const contentTypes = [
  { id: 'image', icon: <ImageIcon className="h-4 w-4" />, label: 'Generate Image', desc: 'Visual diagrams & illustrations' },
  { id: 'video', icon: <Video className="h-4 w-4" />, label: 'Generate Video', desc: 'Animated explanations' },
  { id: 'slides', icon: <Layers className="h-4 w-4" />, label: 'Generate Slides', desc: 'Study presentations' },
  { id: 'doc', icon: <FileText className="h-4 w-4" />, label: 'Generate Doc', desc: 'Study notes & summaries' },
  { id: 'quiz', icon: <Brain className="h-4 w-4" />, label: 'Generate Quiz', desc: 'Practice questions' },
  { id: 'viz', icon: <PieChart className="h-4 w-4" />, label: 'Visualization', desc: 'Interactive charts' }
];

// Initial messages
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    content: 'Hello! I\'m your AI Personal Tutor. I\'ve been learning your study patterns and I\'m here to help you excel in your courses. What would you like to learn today?',
    timestamp: new Date(),
    type: 'greeting'
  },
  {
    id: 2,
    sender: 'ai',
    content: 'Based on your learning pattern, I notice you comprehend visual content 32% faster. I\'ve prepared some visual aids for your next Calculus topic. Would you like to see them?',
    timestamp: new Date(),
    type: 'insight',
    hasContent: true
  }
];

export default function PersonalTutor() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(activeCourses[0]);
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date(),
      type: 'query'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse;

      if (input.toLowerCase().includes('calculus') || input.toLowerCase().includes('math')) {
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: `Let me explain Calculus Fundamentals in a way that suits your visual learning style:\n\n📊 **Core Concepts:**\n1. Limits - Understanding approaching values\n2. Derivatives - Rate of change\n3. Integrals - Area under curves\n\nI've generated a visual diagram and video explanation for you. Would you like me to show them?`,
          timestamp: new Date(),
          type: 'teaching',
          hasGeneratedContent: true,
          generatedContent: [
            { type: 'image', title: 'Calculus Fundamentals Diagram', status: 'ready' },
            { type: 'video', title: 'Derivatives Explained (3:45)', status: 'ready' }
          ]
        };
      } else if (input.toLowerCase().includes('quiz') || input.toLowerCase().includes('test')) {
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: `Great! I've created a personalized quiz based on your current ${selectedCourse.name} progress.\n\n📝 **Quiz Details:**\n- 10 questions\n- Difficulty: Adapted to your level\n- Time: 15 minutes\n- Focus: ${selectedCourse.nextTopic}\n\nBased on your learning pattern, I've included more visual problems. Ready to start?`,
          timestamp: new Date(),
          type: 'teaching',
          hasQuiz: true
        };
      } else if (input.toLowerCase().includes('performance') || input.toLowerCase().includes('predict')) {
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: `📈 **Performance Prediction Analysis:**\n\nBased on your learning patterns:\n- Current Score: ${learningPatternData.performance.current}%\n- Predicted Score: ${learningPatternData.performance.predicted}%\n- Confidence: 94%\n\n**Insights:**\n- You excel at visual problem-solving (+18%)\n- Morning study sessions are 25% more effective for you\n- Interactive exercises boost retention by 34%\n\n**Recommendation:** Focus on ${selectedCourse.nextTopic} with visual aids to maximize performance.`,
          timestamp: new Date(),
          type: 'analysis'
        };
      } else {
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: `I understand you want to learn about "${input}". Let me create personalized learning materials for you.\n\nI'm generating:\n✨ Visual diagrams\n🎥 Explanatory videos\n📊 Interactive visualizations\n📝 Study notes\n\nThis will take about 10 seconds...`,
          timestamp: new Date(),
          type: 'response',
          isGenerating: true
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setIsTyping(false);
    }, 1500);
  };

  const generateContent = (contentType) => {
    const contentTypeInfo = contentTypes.find(ct => ct.id === contentType);
    const newMessage = {
      id: messages.length + 1,
      sender: 'ai',
      content: `🎨 Generating ${contentTypeInfo.label} for "${selectedCourse.nextTopic}"...\n\nOptimizing for your visual learning style.\nEstimated time: 8 seconds.`,
      timestamp: new Date(),
      type: 'generating',
      contentType: contentType
    };

    setMessages(prev => [...prev, newMessage]);
    setContentDialogOpen(false);

    setTimeout(() => {
      const completedMessage = {
        id: messages.length + 2,
        sender: 'ai',
        content: `✅ ${contentTypeInfo.label} ready!\n\nI've created a personalized ${contentTypeInfo.desc.toLowerCase()} tailored to your learning style. It includes visual elements and interactive components that match your 87% comprehension rate.`,
        timestamp: new Date(),
        type: 'content-ready',
        hasGeneratedContent: true,
        generatedContent: [
          { type: contentType, title: `${selectedCourse.nextTopic} - ${contentTypeInfo.label}`, status: 'ready' }
        ]
      };
      setMessages(prev => [...prev, completedMessage]);
    }, 3000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex gap-4">
      {/* Left Sidebar - Learning Analytics */}
      <div className="w-80 space-y-4">
        {/* Student Profile */}
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-16 w-16 border-2 border-blue-500">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Student</h3>
              <p className="text-sm text-muted-foreground">Grade 12 • Science</p>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Learning Style</span>
              <Badge variant="default" className="bg-blue-500">
                {learningPatternData.preferredStyle}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Comprehension Level</span>
                <span className="font-semibold">{learningPatternData.comprehension}%</span>
              </div>
              <Progress value={learningPatternData.comprehension} className="h-2" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Study Pace</span>
              <Badge variant="outline">{learningPatternData.pace}</Badge>
            </div>
          </div>
        </Card>

        {/* Performance Prediction */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold">Performance Prediction</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div>
                <p className="text-xs text-muted-foreground">Predicted Score</p>
                <p className="text-2xl font-bold text-green-600">{learningPatternData.performance.predicted}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current</span>
                <span className="font-semibold">{learningPatternData.performance.current}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Improvement</span>
                <span className="font-semibold text-green-600">+{learningPatternData.performance.predicted - learningPatternData.performance.current}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Courses */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Active Courses</h3>
          </div>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {activeCourses.map((course) => (
                <Card
                  key={course.id}
                  className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedCourse.id === course.id ? 'bg-blue-500/10 border-blue-500/50' : ''
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{course.name}</h4>
                    <Badge
                      variant={course.difficulty === 'hard' ? 'destructive' : course.difficulty === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {course.difficulty}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Next: {course.nextTopic}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Study Time Stats */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold">Study Time</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="text-lg font-bold">{learningPatternData.studyTime.thisWeek}h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Month</span>
              <span className="text-lg font-bold">{learningPatternData.studyTime.total}h</span>
            </div>
            <Progress value={(learningPatternData.studyTime.thisWeek / 40) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">Target: 40h/month</p>
          </div>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col bg-gradient-to-br from-blue-900/10 to-purple-900/10 border-blue-500/20">
          {/* Header */}
          <div className="p-4 border-b border-border/50 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="bg-gradient-to-r from-blue-500 to-purple-500">
                  <AvatarFallback className="bg-transparent">
                    <GraduationCap className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI Personal Tutor
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>Online & Learning</span>
                    </div>
                    <span>•</span>
                    <span>Personalized for you</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Mic className="h-4 w-4" />
                  Voice
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Video className="h-4 w-4" />
                  Video Call
                </Button>
              </div>
            </div>

            {/* Current Course Context */}
            <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">Learning: {selectedCourse.name}</span>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">{selectedCourse.nextTopic}</span>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Zap className="h-3 w-3" />
                  AI Adaptive Mode
                </Badge>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[75%] rounded-2xl p-4 ${
                      message.sender === 'ai'
                        ? 'bg-white/10 border border-white/20 rounded-tl-none'
                        : 'bg-blue-500/20 border border-blue-500/30 rounded-tr-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.sender === 'ai' ? (
                        <Brain className="h-4 w-4 text-purple-400" />
                      ) : (
                        <User className="h-4 w-4 text-blue-400" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.type === 'insight' && (
                        <Badge variant="secondary" className="ml-auto gap-1">
                          <Lightbulb className="h-3 w-3" />
                          Insight
                        </Badge>
                      )}
                    </div>

                    <div className="whitespace-pre-line mb-2">{message.content}</div>

                    {/* Generated Content Display */}
                    {message.hasGeneratedContent && message.generatedContent && (
                      <div className="mt-3 space-y-2">
                        {message.generatedContent.map((content, idx) => (
                          <Card key={idx} className="p-3 bg-blue-500/10 border-blue-500/30">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {content.type === 'image' && <ImageIcon className="h-4 w-4" />}
                                {content.type === 'video' && <Video className="h-4 w-4" />}
                                {content.type === 'slides' && <Layers className="h-4 w-4" />}
                                <span className="text-sm font-medium">{content.title}</span>
                              </div>
                              <Button size="sm" variant="ghost">
                                <Play className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {message.hasQuiz && (
                      <Button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-purple-600">
                        <Play className="h-4 w-4 mr-2" />
                        Start Quiz
                      </Button>
                    )}
                  </motion.div>
                </div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[75%] rounded-2xl p-4 bg-white/10 border border-white/20 rounded-tl-none">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                      <span className="text-sm">AI Tutor is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
            {/* Content Generation Dialog */}
            <div className="mb-3">
              <Dialog open={contentDialogOpen} onOpenChange={setContentDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Wand2 className="h-5 w-5 text-purple-500" />
                      AI Content Generator
                    </DialogTitle>
                    <DialogDescription>
                      Choose the type of learning material you want to generate for "{selectedCourse.nextTopic}"
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-3 mt-4">
                    {contentTypes.map((type) => (
                      <Card
                        key={type.id}
                        className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-purple-500"
                        onClick={() => generateContent(type.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-3 bg-purple-500/20 rounded-lg">
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{type.label}</h4>
                            <p className="text-sm text-muted-foreground">{type.desc}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Personalized for your learning style</p>
                        <p className="text-muted-foreground">Content will be optimized for {learningPatternData.preferredStyle} learners</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <form onSubmit={handleSendMessage} className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything... I'll adapt to your learning style!"
                className="pr-24 bg-white/5 border-white/20 h-12"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>AI will generate images, videos, slides & more based on your learning style</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Sidebar - Learning Insights */}
      <div className="w-80 space-y-4">
        {/* Strengths & Improvements */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Your Strengths
          </h3>
          <div className="space-y-2">
            {learningPatternData.strengths.map((strength, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mt-4 mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Focus Areas
          </h3>
          <div className="space-y-2">
            {learningPatternData.improvements.map((improvement, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-orange-500/10">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span className="text-sm">{improvement}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Recommendations
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/50 dark:bg-white/5">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Study in the morning</p>
                  <p className="text-xs text-muted-foreground">Your focus is 25% higher between 8-10 AM</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/50 dark:bg-white/5">
              <div className="flex items-start gap-2">
                <Video className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Use video content</p>
                  <p className="text-xs text-muted-foreground">Visual learners retain 32% more information</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/50 dark:bg-white/5">
              <div className="flex items-start gap-2">
                <Brain className="h-4 w-4 text-purple-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Take breaks</p>
                  <p className="text-xs text-muted-foreground">Pomodoro technique works best for you</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Recent Achievements
          </h3>
          <div className="space-y-2">
            {[
              { title: '7-Day Streak', icon: '🔥', color: 'orange' },
              { title: 'Quick Learner', icon: '⚡', color: 'yellow' },
              { title: 'Problem Solver', icon: '🧩', color: 'blue' }
            ].map((achievement, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-accent">
                <span className="text-2xl">{achievement.icon}</span>
                <span className="text-sm font-medium">{achievement.title}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function CheckCircle(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
