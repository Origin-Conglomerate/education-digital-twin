import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bot,
  BookOpen,
  Brain,
  BrainCircuit,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Copy,
  Cpu,
  Database,
  Download,
  Edit,
  FileText,
  Filter,
  GitBranch,
  GraduationCap,
  HardDrive,
  Laptop,
  Layers,
  Link,
  Loader2,
  Mail,
  MessageSquare,
  Network,
  Notebook,
  PauseCircle,
  PlayCircle,
  Plus,
  School,
  Search,
  Send,
  Server,
  Settings,
  Share2,
  Shield,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  User,
  Users,
  Wifi,
  Workflow,
  Wand2,
  Zap,
  Calendar,
  Bell,
  ClipboardCheck,
  UserCheck,
  BookMarked,
  Video
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data sources
const dataSources = [
  { name: "Student LMS", icon: <Laptop className="h-4 w-4" />, connected: true, records: "12,847" },
  { name: "Assessment System", icon: <Notebook className="h-4 w-4" />, connected: true, records: "5,234" },
  { name: "Attendance Records", icon: <Users className="h-4 w-4" />, connected: true, records: "8,921" },
  { name: "Curriculum Database", icon: <BookOpen className="h-4 w-4" />, connected: true, records: "2,156" },
  { name: "Parent Portal", icon: <User className="h-4 w-4" />, connected: false, records: "0" }
];

// AI Agent Types for Education
const AGENT_TYPES = [
  { id: 'student-monitor', name: 'Student Performance Monitor', icon: <Users className="h-5 w-5" />, desc: 'Tracks student progress and performance', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  { id: 'attendance-tracker', name: 'Attendance Tracker', icon: <UserCheck className="h-5 w-5" />, desc: 'Monitors attendance patterns and alerts', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30' },
  { id: 'assignment-analyzer', name: 'Assignment Analyzer', icon: <ClipboardCheck className="h-5 w-5" />, desc: 'Analyzes assignment submissions and quality', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
  { id: 'intervention-agent', name: 'Intervention Agent', icon: <AlertCircle className="h-5 w-5" />, desc: 'Detects students needing help', color: 'from-red-500 to-orange-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' },
  { id: 'curriculum-optimizer', name: 'Curriculum Optimizer', icon: <BookMarked className="h-5 w-5" />, desc: 'Optimizes lesson plans and curriculum', color: 'from-amber-500 to-yellow-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30' },
  { id: 'parent-notifier', name: 'Parent Notification Agent', icon: <Mail className="h-5 w-5" />, desc: 'Sends automated parent communications', color: 'from-cyan-500 to-blue-500', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/30' }
];

// Workflow Action Types
const ACTION_TYPES = [
  { id: 'send-email', name: 'Send Email', icon: <Mail className="h-4 w-4" />, desc: 'Send email notification' },
  { id: 'create-alert', name: 'Create Alert', icon: <Bell className="h-4 w-4" />, desc: 'Create system alert' },
  { id: 'schedule-meeting', name: 'Schedule Meeting', icon: <Calendar className="h-4 w-4" />, desc: 'Schedule a meeting' },
  { id: 'generate-report', name: 'Generate Report', icon: <FileText className="h-4 w-4" />, desc: 'Generate a report' },
  { id: 'assign-task', name: 'Assign Task', icon: <Target className="h-4 w-4" />, desc: 'Assign task to student' },
  { id: 'update-database', name: 'Update Database', icon: <Database className="h-4 w-4" />, desc: 'Update database records' }
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
  }
];

// Workflow templates
const workflowTemplates = [
  {
    name: 'Student Intervention Pipeline',
    desc: 'Automatically detect struggling students and notify teachers',
    agents: ['Student Performance Monitor', 'Intervention Agent', 'Parent Notification Agent'],
    trigger: 'Quiz score < 60%',
    frequency: 'Daily',
    icon: <AlertCircle className="h-6 w-6" />,
    color: 'from-red-500 to-orange-500'
  },
  {
    name: 'Attendance Alert System',
    desc: 'Track attendance and send automated alerts for absences',
    agents: ['Attendance Tracker', 'Parent Notification Agent'],
    trigger: 'Student absent 2+ consecutive days',
    frequency: 'Real-time',
    icon: <UserCheck className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Assignment Grading Workflow',
    desc: 'Analyze assignments and provide feedback',
    agents: ['Assignment Analyzer', 'Student Performance Monitor'],
    trigger: 'New assignment submitted',
    frequency: 'Real-time',
    icon: <ClipboardCheck className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Curriculum Optimization Flow',
    desc: 'Analyze class performance and optimize lesson plans',
    agents: ['Student Performance Monitor', 'Curriculum Optimizer'],
    trigger: 'Weekly class performance review',
    frequency: 'Weekly',
    icon: <BookMarked className="h-6 w-6" />,
    color: 'from-amber-500 to-yellow-500'
  }
];

// Active workflows
const activeWorkflows = [
  {
    name: 'Daily Student Progress Check',
    status: 'active',
    runs: 247,
    lastRun: '2 hours ago',
    agents: 3,
    successRate: 98,
    nextRun: 'Tomorrow 8:00 AM'
  },
  {
    name: 'Assignment Deadline Reminders',
    status: 'active',
    runs: 156,
    lastRun: '30 minutes ago',
    agents: 2,
    successRate: 100,
    nextRun: 'Today 5:00 PM'
  },
  {
    name: 'Weekly Parent Updates',
    status: 'paused',
    runs: 32,
    lastRun: '3 days ago',
    agents: 4,
    successRate: 95,
    nextRun: 'Friday 6:00 PM'
  },
  {
    name: 'Engagement Analytics',
    status: 'active',
    runs: 89,
    lastRun: '1 hour ago',
    agents: 2,
    successRate: 97,
    nextRun: 'Today 4:00 PM'
  }
];

export default function AgenticAI() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeDataSource, setActiveDataSource] = useState(null);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [knowledgeGraphOpen, setKnowledgeGraphOpen] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);
  const [workflowNodes, setWorkflowNodes] = useState([]);
  const messagesEndRef = useRef(null);
  const canvasRef = useRef(null);

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

      if (input.toLowerCase().includes('student performance') || input.toLowerCase().includes('performance')) {
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
      } else {
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

  // Workflow Builder Functions
  const handleDragStart = (e, agentType) => {
    setDraggedNode(agentType);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedNode) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode = {
      id: `node-${Date.now()}`,
      type: draggedNode.id,
      name: draggedNode.name,
      icon: draggedNode.icon,
      color: draggedNode.color,
      bgColor: draggedNode.bgColor,
      borderColor: draggedNode.borderColor,
      position: { x, y },
      actions: []
    };

    setWorkflowNodes([...workflowNodes, newNode]);
    setDraggedNode(null);
  };

  const deleteNode = (nodeId) => {
    setWorkflowNodes(workflowNodes.filter(node => node.id !== nodeId));
  };

  const addActionToNode = (nodeId, action) => {
    setWorkflowNodes(workflowNodes.map(node =>
      node.id === nodeId
        ? { ...node, actions: [...node.actions, action] }
        : node
    ));
  };

  const clearWorkflow = () => {
    setWorkflowNodes([]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex gap-4">
      {/* Left Sidebar - AI Agents & Data Sources */}
      <div className="w-80 space-y-4">
        {/* Data Sources */}
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Server className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Connected Systems</h3>
          </div>
          <div className="space-y-2">
            {dataSources.map((source, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {source.icon}
                  <div>
                    <p className="text-sm font-medium">{source.name}</p>
                    <p className="text-xs text-muted-foreground">{source.records} records</p>
                  </div>
                </div>
                {source.connected ? (
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                ) : (
                  <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* AI Agents */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold">AI Agents</h3>
            <Badge variant="outline" className="ml-auto">{AGENT_TYPES.length} Active</Badge>
          </div>
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {AGENT_TYPES.map((agent) => (
                <Card
                  key={agent.id}
                  className={`p-3 cursor-pointer hover:shadow-md transition-all ${agent.bgColor} ${agent.borderColor} border`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`p-2 bg-gradient-to-r ${agent.color} rounded-lg`}>
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{agent.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{agent.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Quick Stats */}
        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Automation Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Active Workflows</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tasks This Week</span>
              <span className="font-semibold">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Success Rate</span>
              <span className="font-semibold text-green-600">98.2%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content - Chat & Workflows */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Header Actions */}
        <div className="flex gap-2">
          <Dialog open={workflowDialogOpen} onOpenChange={setWorkflowDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
                <Workflow className="h-4 w-4" />
                Workflow Builder
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Workflow className="h-6 w-6 text-purple-600" />
                  AI Workflow Automation Studio
                </DialogTitle>
                <DialogDescription>
                  Create, manage, and deploy intelligent automation workflows for your education platform
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="builder" className="flex-1 flex flex-col overflow-hidden mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="active">Active Workflows</TabsTrigger>
                </TabsList>

                {/* Workflow Builder Tab */}
                <TabsContent value="builder" className="flex-1 mt-4 overflow-hidden">
                  <div className="h-full grid grid-cols-12 gap-4">
                    {/* Left Sidebar - Agent Palette */}
                    <Card className="col-span-3 p-4 flex flex-col">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        Drag Agents
                      </h3>
                      <ScrollArea className="flex-1">
                        <div className="space-y-2">
                          {AGENT_TYPES.map((agent) => (
                            <Card
                              key={agent.id}
                              className={`p-3 cursor-move hover:shadow-lg transition-all ${agent.bgColor} ${agent.borderColor} border-2`}
                              draggable
                              onDragStart={(e) => handleDragStart(e, agent)}
                            >
                              <div className="flex items-start gap-2">
                                <div className={`p-2 bg-gradient-to-r ${agent.color} rounded-lg`}>
                                  {agent.icon}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-xs">{agent.name}</h4>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </Card>

                    {/* Center - Canvas */}
                    <Card className="col-span-6 p-4 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline">{workflowNodes.length} Agents</Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={clearWorkflow}>
                            <Trash2 className="h-3 w-3 mr-1" />
                            Clear
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Deploy
                          </Button>
                        </div>
                      </div>

                      <div
                        ref={canvasRef}
                        className="flex-1 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-auto relative"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        {workflowNodes.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <Workflow className="h-16 w-16 mx-auto mb-4 opacity-20" />
                              <p className="text-lg font-medium">Drag agents here</p>
                              <p className="text-sm">Build your automation workflow</p>
                            </div>
                          </div>
                        ) : (
                          <div className="relative min-h-full p-4">
                            {workflowNodes.map((node, index) => (
                              <motion.div
                                key={node.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute"
                                style={{ left: node.position.x, top: node.position.y }}
                              >
                                <Card className={`w-56 p-3 ${node.bgColor} ${node.borderColor} border-2 shadow-lg`}>
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <div className={`p-2 bg-gradient-to-r ${node.color} rounded-lg`}>
                                        {node.icon}
                                      </div>
                                      <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                                    </div>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-6 w-6"
                                      onClick={() => deleteNode(node.id)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <h4 className="font-semibold text-xs mb-2">{node.name}</h4>

                                  <div className="space-y-1">
                                    {node.actions.length > 0 && (
                                      <div className="space-y-1">
                                        {node.actions.map((action, i) => (
                                          <Badge key={i} variant="secondary" className="text-xs w-full justify-start">
                                            {action.icon}
                                            <span className="ml-1 truncate">{action.name}</span>
                                          </Badge>
                                        ))}
                                      </div>
                                    )}

                                    <Select onValueChange={(value) => {
                                      const action = ACTION_TYPES.find(a => a.id === value);
                                      if (action) addActionToNode(node.id, action);
                                    }}>
                                      <SelectTrigger className="h-7 text-xs">
                                        <SelectValue placeholder="+ Add action" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {ACTION_TYPES.map((action) => (
                                          <SelectItem key={action.id} value={action.id}>
                                            <div className="flex items-center gap-2">
                                              {action.icon}
                                              {action.name}
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {index < workflowNodes.length - 1 && (
                                    <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                                      <ArrowRight className="h-5 w-5 text-purple-500" />
                                    </div>
                                  )}
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Right Sidebar - Actions */}
                    <Card className="col-span-3 p-4 flex flex-col">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Actions
                      </h3>
                      <ScrollArea className="flex-1">
                        <div className="space-y-2">
                          {ACTION_TYPES.map((action) => (
                            <Card key={action.id} className="p-2 hover:bg-accent transition-colors">
                              <div className="flex items-start gap-2">
                                {action.icon}
                                <div>
                                  <h4 className="font-semibold text-xs">{action.name}</h4>
                                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </Card>
                  </div>
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="flex-1 mt-4 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="grid md:grid-cols-2 gap-4 p-1 pb-4">
                      {workflowTemplates.map((template, idx) => (
                        <Card key={idx} className="p-6 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-3 bg-gradient-to-r ${template.color} rounded-lg`}>
                                {template.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold">{template.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{template.desc}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <span className="text-xs font-medium text-muted-foreground">Agents:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {template.agents.map((agent, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{agent}</Badge>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                              <div>
                                <span className="text-xs font-medium text-muted-foreground">Trigger:</span>
                                <p className="text-xs mt-1">{template.trigger}</p>
                              </div>
                              <div>
                                <span className="text-xs font-medium text-muted-foreground">Frequency:</span>
                                <p className="text-xs mt-1">{template.frequency}</p>
                              </div>
                            </div>

                            <Button size="sm" className="w-full mt-2">
                              <Copy className="h-3 w-3 mr-1" />
                              Use Template
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Active Workflows Tab */}
                <TabsContent value="active" className="flex-1 mt-4 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="space-y-3 p-1 pb-4">
                      {activeWorkflows.map((workflow, idx) => (
                        <Card key={idx} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${workflow.status === 'active' ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                                <Workflow className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{workflow.name}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {workflow.agents} agents • {workflow.runs} runs • Last: {workflow.lastRun}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                                {workflow.status === 'active' ? (
                                  <>
                                    <PlayCircle className="h-3 w-3 mr-1" />
                                    Active
                                  </>
                                ) : (
                                  <>
                                    <PauseCircle className="h-3 w-3 mr-1" />
                                    Paused
                                  </>
                                )}
                              </Badge>
                              <Button size="icon" variant="outline" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Success Rate</span>
                              <span className="font-semibold">{workflow.successRate}%</span>
                            </div>
                            <Progress value={workflow.successRate} className="h-2" />
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                              <Clock className="h-3 w-3" />
                              Next run: {workflow.nextRun}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Dialog open={knowledgeGraphOpen} onOpenChange={setKnowledgeGraphOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <BrainCircuit className="h-4 w-4" />
                Knowledge Graph
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl h-[85vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <BrainCircuit className="h-6 w-6 text-purple-600" />
                  AI Knowledge Graph & Memory
                </DialogTitle>
                <DialogDescription>
                  Accumulated insights and learning patterns from your educational data
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="flex-1 mt-4">
                <div className="space-y-6 p-1 pb-4">
                  {/* Knowledge Stats */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">24,582</div>
                        <div className="text-sm text-muted-foreground">Data Points</div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">842</div>
                        <div className="text-sm text-muted-foreground">Insights</div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">96.8%</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">189</div>
                        <div className="text-sm text-muted-foreground">Days Active</div>
                      </div>
                    </Card>
                  </div>

                  {/* Knowledge Connections */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Knowledge Connections</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: 'Student Performance', connections: 34, color: 'bg-blue-500/20 text-blue-700 dark:text-blue-400' },
                        { label: 'Learning Patterns', connections: 28, color: 'bg-purple-500/20 text-purple-700 dark:text-purple-400' },
                        { label: 'Curriculum Data', connections: 42, color: 'bg-green-500/20 text-green-700 dark:text-green-400' },
                        { label: 'Engagement Metrics', connections: 21, color: 'bg-pink-500/20 text-pink-700 dark:text-pink-400' },
                        { label: 'Assessment Results', connections: 36, color: 'bg-amber-500/20 text-amber-700 dark:text-amber-400' },
                        { label: 'Behavioral Insights', connections: 19, color: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400' }
                      ].map((node, idx) => (
                        <Card key={idx} className={`p-4 ${node.color} border-2`}>
                          <div className="flex items-center justify-between mb-2">
                            <Network className="h-6 w-6" />
                            <Badge variant="secondary">{node.connections} links</Badge>
                          </div>
                          <h4 className="font-semibold">{node.label}</h4>
                        </Card>
                      ))}
                    </div>
                  </Card>

                  {/* Learning Progress */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Active Learning Areas</h3>
                      <div className="space-y-3">
                        {[
                          { area: 'Student Intervention Patterns', progress: 92 },
                          { area: 'Engagement Optimization', progress: 78 },
                          { area: 'Performance Prediction', progress: 95 },
                          { area: 'Curriculum Effectiveness', progress: 84 }
                        ].map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.area}</span>
                              <span className="font-semibold">{item.progress}%</span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Recent Insights</h3>
                      <div className="space-y-2">
                        {[
                          { insight: 'Visual learners show 32% better retention with video content', time: '1 hour ago' },
                          { insight: 'Morning classes have 18% higher engagement rates', time: '3 hours ago' },
                          { insight: 'Interactive quizzes improve comprehension by 41%', time: '1 day ago' },
                          { insight: 'Small group discussions boost participation by 56%', time: '2 days ago' }
                        ].map((item, idx) => (
                          <div key={idx} className="p-2 bg-accent rounded-lg">
                            <p className="text-sm font-medium">{item.insight}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* AI Chat Interface */}
        <Card className="flex-1 flex flex-col bg-gradient-to-br from-blue-900/10 to-emerald-900/10 border-blue-500/20">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <Avatar className="bg-gradient-to-r from-blue-500 to-emerald-500">
                <AvatarFallback className="bg-transparent">
                  <GraduationCap className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Education AI Assistant
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3 w-3 text-green-500" />
                    <span>Connected</span>
                  </div>
                  <span>•</span>
                  <span>Adaptive Learning Mode</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

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
                              <Badge key={i} variant="outline" className="text-xs">
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
                  </motion.div>
                </div>
              ))}

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
                          <Server className="h-3 w-3 animate-pulse" />
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

          <div className="p-4 border-t border-border/50">
            <form onSubmit={handleSendMessage} className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about students, curriculum, attendance..."
                className="pr-12 bg-white/5 border-white/20"
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

            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <AlertCircle className="h-4 w-4" />
                View Alerts
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Class Overview
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Sidebar - Analytics */}
      <div className="w-80 space-y-4">
        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Performance Metrics
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/50 dark:bg-white/5">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Automation Rate</span>
                <span className="font-semibold">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="p-3 rounded-lg bg-white/50 dark:bg-white/5">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Time Saved</span>
                <span className="font-semibold">24.5hrs</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="p-3 rounded-lg bg-white/50 dark:bg-white/5">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">AI Accuracy</span>
                <span className="font-semibold">96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {[
                { action: 'Sent attendance alerts', time: '2 min ago', icon: <Mail className="h-4 w-4" /> },
                { action: 'Generated performance report', time: '15 min ago', icon: <FileText className="h-4 w-4" /> },
                { action: 'Updated curriculum data', time: '1 hour ago', icon: <Database className="h-4 w-4" /> },
                { action: 'Scheduled parent meetings', time: '2 hours ago', icon: <Calendar className="h-4 w-4" /> },
                { action: 'Analyzed student progress', time: '3 hours ago', icon: <Activity className="h-4 w-4" /> }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-green-500" />
            AI Recommendations
          </h3>
          <div className="space-y-2">
            {[
              'Create intervention workflow for Math class',
              'Automate weekly parent updates',
              'Set up attendance tracking for Grade 10'
            ].map((rec, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-white/50 dark:bg-white/5 text-sm">
                {rec}
              </div>
            ))}
          </div>
        </Card>
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
