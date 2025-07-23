import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowUp,
  Bot,
  BookOpen,
  CheckCircle,
  Clock,
  Code,
  Cpu,
  Database,
  Download,
  FileText,
  Filter,
  Gauge,
  GraduationCap,
  HardDrive,
  HelpCircle,
  Laptop,
  Loader2,
  MessageSquare,
  Notebook,
  Plus,
  School,
  Search,
  Server,
  Settings,
  Shield,
  Sparkles,
  Upload,
  User,
  Users,
  Wifi,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data sources
const dataSources = [
  { name: "Student LMS", icon: <Laptop className="h-4 w-4" />, connected: true },
  { name: "Assessment System", icon: <Notebook className="h-4 w-4" />, connected: true },
  { name: "Attendance Records", icon: <Users className="h-4 w-4" />, connected: true },
  { name: "Curriculum Database", icon: <BookOpen className="h-4 w-4" />, connected: true },
  { name: "Parent Portal", icon: <User className="h-4 w-4" />, connected: false }
];

// Mock messages
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    content: 'Hello Educator! I\'m your Education Digital Twin. I\'ve been analyzing classroom data. Would you like an overview of today\'s learning activities?',
    timestamp: new Date(),
    type: 'greeting'
  },
  {
    id: 2,
    sender: 'ai',
    content: 'I\'ve detected that 3 students are struggling with the current math topic based on their quiz performance. Would you like me to generate personalized exercises for them?',
    timestamp: new Date(),
    type: 'alert',
    urgent: true
  },
  {
    id: 3,
    sender: 'ai',
    content: 'Here\'s today\'s learning snapshot:\n- 92% attendance rate\n- 78% average quiz score\n- 5 students excelling in current topics\n- 3 students needing intervention\n- Classroom engagement at 84%',
    timestamp: new Date(),
    type: 'summary'
  }
];

export default function AgenticAI() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeDataSource, setActiveDataSource] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate proactive AI messages
  useEffect(() => {
    const proactiveTimer = setTimeout(() => {
      const newAlert = {
        id: messages.length + 1,
        sender: 'ai',
        content: 'Alert: Student #S-2048 has missed 3 consecutive classes. Would you like me to contact their parents or schedule a counseling session?',
        timestamp: new Date(),
        type: 'alert',
        urgent: true
      };
      setMessages(prev => [...prev, newAlert]);
    }, 30000); // Every 30 seconds check for new alerts

    return () => clearTimeout(proactiveTimer);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
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

    // Simulate AI processing
    setTimeout(() => {
      let aiResponse;
      
      if (input.toLowerCase().includes('student performance')) {
        // Simulate data gathering process
        setActiveDataSource('Student LMS');
        setTimeout(() => {
          setActiveDataSource('Assessment System');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Student performance analysis complete:\n\n- Top performers: Sarah (98%), Michael (95%), Aisha (93%)\n- Students needing help: Jason (58%), Emma (62%), David (65%)\n- Most challenging topic: Algebraic Expressions (class avg: 68%)\n\nI can generate differentiated assignments if you'd like.`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Student LMS', 'Assessment System'],
              analysisTime: '1.8s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('lesson plan') || input.toLowerCase().includes('curriculum')) {
        setActiveDataSource('Curriculum Database');
        setTimeout(() => {
          setActiveDataSource('Assessment System');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Curriculum optimization suggestions:\n\n1. Extend time on Algebraic Expressions (current mastery: 68%)\n2. Introduce real-world applications for Geometry\n3. Recommend project-based learning for advanced students\n4. Foundational review for struggling students\n\nWould you like me to generate a customized lesson plan?`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Curriculum Database', 'Assessment System'],
              analysisTime: '2.7s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('attendance')) {
        setActiveDataSource('Attendance Records');
        setTimeout(() => {
          setActiveDataSource('Parent Portal');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Attendance analysis:\n\n- Current attendance rate: 92%\n- Chronic absentees: 2 students (3+ absences)\n- Most common absence day: Monday\n- Parent response rate to notifications: 65%\n\nI can automate follow-ups for absent students if you'd like.`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Attendance Records', 'Parent Portal'],
              analysisTime: '1.5s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else {
        // Default response
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: `I've analyzed your query. Here's what I can share:\n\n- Classroom engagement is above average this week\n- 3 students have overdue assignments\n- Parent-teacher conference scheduling is 75% complete\n\nHow else can I assist with your educational objectives today?`,
          timestamp: new Date(),
          type: 'response'
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-emerald-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="bg-gradient-to-r from-blue-500 to-emerald-500">
            <AvatarFallback className="bg-transparent">
              <GraduationCap className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-300 
              to-emerald-300 bg-clip-text text-transparent">
              Education Digital Twin
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-green-500" />
                <span>Connected</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Cpu className="h-3 w-3 text-blue-500" />
                <span>Adaptive Learning Mode</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Actions
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Connected Education Systems</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dataSources.map((source, index) => (
            <Badge 
              key={index} 
              variant={source.connected ? 'default' : 'outline'}
              className="gap-2"
            >
              {source.icon}
              {source.name}
              {source.connected ? (
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              ) : (
                <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden mb-4">
        <ScrollArea className="h-full p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.sender === 'ai' 
                      ? 'bg-white/5 border border-white/10 rounded-tl-none'
                      : 'bg-blue-500/10 border border-blue-500/20 rounded-tr-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.sender === 'ai' ? (
                      <GraduationCap className="h-4 w-4 text-blue-400" />
                    ) : (
                      <User className="h-4 w-4 text-emerald-400" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.urgent && (
                      <Badge variant="destructive" className="ml-auto">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  {message.type === 'summary' || message.type === 'analysis' ? (
                    <div className="whitespace-pre-line">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                      {message.sources && (
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="text-xs text-muted-foreground mb-1">
                            Analyzed data from:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source, i) => (
                              <Badge key={i} variant="outline" className="text-xs gap-1">
                                {dataSources.find(ds => ds.name === source)?.icon}
                                {source}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {message.analysisTime}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-line">
                      {message.content}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            
            {/* Loading indicator when AI is typing */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl p-4 bg-white/5 border border-white/10 rounded-tl-none">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="h-4 w-4 text-blue-400" />
                      <span className="text-xs text-muted-foreground">
                        {formatTime(new Date())}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      <span>Analyzing educational data...</span>
                    </div>
                    {activeDataSource && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <ArrowUp className="h-3 w-3 animate-bounce" />
                        Connecting to {activeDataSource}...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about students, curriculum, attendance..."
          className="pr-12 backdrop-blur-lg bg-white/5 border-white/20"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>

      {/* Quick Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          View Alerts
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Notebook className="h-4 w-4" />
          Create Lesson Plan
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Users className="h-4 w-4" />
          Class Overview
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Send(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}