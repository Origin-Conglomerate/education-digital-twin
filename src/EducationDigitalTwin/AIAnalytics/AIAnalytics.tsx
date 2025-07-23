import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import {
  Brain,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Clock,
  TrendingUp,
  Zap,
  MessageSquare,
  User,
  Users,
  BarChart2,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ShieldAlert,
  Bookmark,
  ClipboardList,
  Rocket
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for education insights
const educationData = {
  predictiveAnalytics: [
    {
      studentId: "S10045",
      name: "Alex Johnson",
      riskLevel: "high",
      probability: 82,
      reasons: ["Attendance < 60%", "Assignment delays", "Test scores declining"],
      recommendedActions: ["1-on-1 counseling", "Parent meeting", "Remedial classes"]
    },
    {
      studentId: "S10072",
      name: "Maria Garcia",
      riskLevel: "medium",
      probability: 45,
      reasons: ["Participation dropped", "Missed 2 assignments"],
      recommendedActions: ["Check-in meeting", "Peer mentoring"]
    },
    {
      studentId: "S10089",
      name: "Jamal Williams",
      riskLevel: "low",
      probability: 18,
      reasons: ["Slight grade dip in Math"],
      recommendedActions: ["Monitor progress"]
    }
  ],
  learningRecommendations: [
    {
      studentId: "S10102",
      name: "Emma Chen",
      strengths: ["Verbal", "Creative"],
      weaknesses: ["Quantitative", "Time management"],
      resources: [
        "Advanced Literature Course",
        "Visual Arts Workshop",
        "Math Foundations Tutoring"
      ]
    },
    {
      studentId: "S10056",
      name: "Daniel Kim",
      strengths: ["Analytical", "Collaborative"],
      weaknesses: ["Public speaking", "Writing"],
      resources: [
        "Debate Club",
        "Writing Center Appointments",
        "STEM Competition Team"
      ]
    }
  ],
  resourceUtilization: {
    classrooms: 68,
    labs: 45,
    library: 32,
    optimalUtilization: {
      classrooms: 85,
      labs: 60,
      library: 50
    }
  },
  automationReports: [
    {
      type: "weekly",
      generated: "2 hours ago",
      recipients: ["Principal", "Dept Heads"],
      highlights: ["Attendance improved 12%", "3 students at high risk"]
    },
    {
      type: "monthly",
      generated: "3 days ago",
      recipients: ["School Board", "District Admin"],
      highlights: ["Overall pass rate 89%", "STEM enrollment up 18%"]
    }
  ],
  nlpQueries: [
    {
      query: "Show top performing students in Science",
      response: "Top 5 Science students: 1. Ethan Brown (98%), 2. Olivia Davis (96%)..."
    },
    {
      query: "What's the attendance trend for Grade 11?",
      response: "Grade 11 attendance: 91% (up 4% from last month)"
    }
  ],
  skillRadarData: [
    {
      subject: "Math",
      current: 75,
      potential: 88
    },
    {
      subject: "Science",
      current: 82,
      potential: 90
    },
    {
      subject: "Language",
      current: 68,
      potential: 85
    },
    {
      subject: "Arts",
      current: 92,
      potential: 95
    },
    {
      subject: "Physical",
      current: 78,
      potential: 82
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function AIAnalytics() {
  const [activeTab, setActiveTab] = useState('predictive');
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [query, setQuery] = useState('');
  const [queryHistory, setQueryHistory] = useState([]);

  const handleQuerySubmit = () => {
    if (!query.trim()) return;
    
    // Simulate AI response
    const newEntry = {
      query,
      response: `AI response to "${query}". Sample data: Based on analysis, we recommend...`,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setQueryHistory([newEntry, ...queryHistory]);
    setQuery('');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header with animated AI icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <Brain className="h-10 w-10 text-indigo-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
              to-indigo-400 bg-clip-text text-transparent">
              Education AI Cortex
            </h1>
            <p className="text-muted-foreground">
              Predictive analytics & intelligent automation
            </p>
          </div>
        </div>
        <Badge className="bg-indigo-500/10 text-indigo-500 px-4 py-1.5">
          <Zap className="h-4 w-4 mr-2" />
          Active Learning Mode
        </Badge>
      </div>

      {/* Main tabs navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-lg">
          <TabsTrigger value="predictive" className="flex gap-2">
            <ShieldAlert className="h-4 w-4" />
            Predictive
          </TabsTrigger>
          <TabsTrigger value="recommend" className="flex gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex gap-2">
            <ClipboardList className="h-4 w-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="ask" className="flex gap-2">
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </TabsTrigger>
        </TabsList>

        {/* Predictive Analytics Tab */}
        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                Dropout Risk Prediction
              </h3>
              
              <div className="space-y-4">
                {educationData.predictiveAnalytics.map((student, index) => (
                  <Card key={index} className={`p-4 ${
                    student.riskLevel === 'high' 
                      ? 'bg-red-500/10 border-red-500/30'
                      : student.riskLevel === 'medium'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-green-500/10 border-green-500/30'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedStudent(expandedStudent === index ? null : index)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {student.studentId}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                          <Progress 
                            value={student.probability} 
                            className={`h-2 ${
                              student.riskLevel === 'high' 
                                ? 'bg-red-500' 
                                : student.riskLevel === 'medium'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`} 
                          />
                          <div className="text-xs text-right mt-1">
                            {student.probability}% risk
                          </div>
                        </div>
                        {expandedStudent === index ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    
                    {expandedStudent === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-3"
                      >
                        <div>
                          <h4 className="text-sm font-medium mb-1">Risk Factors:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {student.reasons.map((reason, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">AI Recommendations:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {student.recommendedActions.map((action, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Create Intervention Plan
                        </Button>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Performance Trends
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={educationData.skillRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar 
                      name="Current" 
                      dataKey="current" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.4} 
                    />
                    <Radar 
                      name="Potential" 
                      dataKey="potential" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.4} 
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  Radar chart shows current vs potential performance across subjects.
                  Gaps indicate areas needing attention.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Recommendations Tab */}
        <TabsContent value="recommend" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {educationData.learningRecommendations.map((student, index) => (
              <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Personalized learning path
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2 text-green-500">
                      <TrendingUp className="h-4 w-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {student.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      Areas to Improve
                    </h4>
                    <ul className="space-y-2">
                      {student.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span className="text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-2 text-blue-500">
                    <Bookmark className="h-4 w-4" />
                    Recommended Resources
                  </h4>
                  <div className="space-y-2">
                    {student.resources.map((resource, i) => (
                      <Card key={i} className="p-3 bg-white/5 hover:bg-white/10 transition">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{resource}</span>
                          <Button variant="ghost" size="sm">
                            Enroll
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resource Optimization Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-400" />
                Resource Utilization
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Classrooms', current: educationData.resourceUtilization.classrooms, optimal: educationData.resourceUtilization.optimalUtilization.classrooms },
                    { name: 'Labs', current: educationData.resourceUtilization.labs, optimal: educationData.resourceUtilization.optimalUtilization.labs },
                    { name: 'Library', current: educationData.resourceUtilization.library, optimal: educationData.resourceUtilization.optimalUtilization.library }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="current" name="Current Usage %" fill="#8884d8">
                      {[0, 1, 2].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                    <Bar dataKey="optimal" name="Optimal Target %" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Classrooms</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {educationData.resourceUtilization.classrooms}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {educationData.resourceUtilization.optimalUtilization.classrooms}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={educationData.resourceUtilization.classrooms} 
                      className="h-2 bg-blue-500/30" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Labs</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {educationData.resourceUtilization.labs}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {educationData.resourceUtilization.optimalUtilization.labs}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={educationData.resourceUtilization.labs} 
                      className="h-2 bg-purple-500/30" 
                      indicatorClassName="bg-purple-500"
                    />
                  </div>
                </Card>
                
                <Card className="p-4 bg-pink-500/10 border-pink-500/30">
                  <h4 className="font-medium mb-2">Library</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {educationData.resourceUtilization.library}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {educationData.resourceUtilization.optimalUtilization.library}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={educationData.resourceUtilization.library} 
                      className="h-2 bg-pink-500/30" 
                      indicatorClassName="bg-pink-500"
                    />
                  </div>
                </Card>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Optimization Suggestions
              </h3>
              
              <div className="space-y-4">
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2">Lab Scheduling</h4>
                  <p className="text-sm text-muted-foreground">
                    Combine 3 underutilized lab sessions in the afternoon to free up 2 staff members.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Schedule
                  </Button>
                </Card>
                
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Classroom Allocation</h4>
                  <p className="text-sm text-muted-foreground">
                    Reassign 4 classrooms from Arts to STEM based on demand patterns.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    See Recommendations
                  </Button>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Library Hours</h4>
                  <p className="text-sm text-muted-foreground">
                    Extend evening hours by 90 minutes to meet 72% of student requests.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Adjust Hours
                  </Button>
                </Card>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Automated Reporting Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {educationData.automationReports.map((report, index) => (
              <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {report.type} Report
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Generated {report.generated}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {report.recipients.length} recipients
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-blue-400" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {report.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>•</span>
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button>
                    View Full Report
                  </Button>
                  <Button variant="outline">
                    Edit Recipients
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-400" />
              Scheduled Automations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-green-500/10 border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Attendance Alerts</h4>
                  <Badge variant="secondary">Daily</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sent to advisors when students miss 3+ consecutive classes
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
              
              <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Grade Reports</h4>
                  <Badge variant="secondary">Bi-weekly</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sent to parents when grades drop below threshold
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
              
              <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Resource Usage</h4>
                  <Badge variant="secondary">Monthly</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sent to facilities team with optimization suggestions
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Natural Language Interface Tab */}
        <TabsContent value="ask" className="space-y-6">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              Ask Education AI
            </h3>
            
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Ask anything about your institution's data..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuerySubmit()}
              />
              <Button onClick={handleQuerySubmit}>
                Ask
              </Button>
            </div>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm text-muted-foreground">
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuery("Show attendance trends")}>
                  Show attendance trends
                </Button>
                <Button variant="outline" size="sm" onClick={() => setQuery("Which students need intervention?")}>
                  Which students need intervention?
                </Button>
                <Button variant="outline" size="sm" onClick={() => setQuery("Compare math scores by grade")}>
                  Compare math scores by grade
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[300px]">
              <div className="space-y-4 pr-4">
                {queryHistory.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-500 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">You</div>
                        <div className="text-sm text-muted-foreground">
                          {item.timestamp}
                        </div>
                        <Card className="p-3 mt-1 bg-white/5">
                          {item.query}
                        </Card>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 ml-11">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo-500 text-white">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">Education AI</div>
                        <div className="text-sm text-muted-foreground">
                          {item.timestamp}
                        </div>
                        <Card className="p-3 mt-1 bg-indigo-500/10 border-indigo-500/30">
                          {item.response}
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
                
                {queryHistory.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mb-2" />
                    <p>Ask questions about your institution's data</p>
                    <p className="text-sm">The AI understands complex queries about students, performance, resources, and more</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating AI Assistant */}
      <motion.div 
        className="fixed bottom-6 right-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className="rounded-full shadow-lg gap-2 h-14 w-14 p-0">
          <Brain className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
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