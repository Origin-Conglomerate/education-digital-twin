import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import {
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  AlertTriangle,
  Zap,
  User,
  GraduationCap,
  Calendar,
  BarChart2,
  PieChart as PieIcon,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ArrowUpRight,
  Bookmark,
  Flag,
  Award,
  Frown,
  Smile,
  Meh,
  Eye,
  ClipboardList,
  Layers
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock student data
const studentsData = {
  summary: {
    total: 1245,
    newThisMonth: 42,
    graduating: 215,
    attendanceRate: 92.4,
    avgGPA: 3.42,
    satisfaction: 4.3
  },
  demographics: {
    byGrade: [
      { name: 'Freshman', value: 320 },
      { name: 'Sophomore', value: 285 },
      { name: 'Junior', value: 310 },
      { name: 'Senior', value: 330 }
    ],
    byGender: [
      { name: 'Male', value: 620 },
      { name: 'Female', value: 600 },
      { name: 'Other', value: 25 }
    ],
    byProgram: [
      { name: 'STEM', value: 580 },
      { name: 'Humanities', value: 320 },
      { name: 'Arts', value: 180 },
      { name: 'Business', value: 165 }
    ]
  },
  attendanceTrends: [
    { month: 'Jan', rate: 91.2 },
    { month: 'Feb', rate: 89.8 },
    { month: 'Mar', rate: 92.5 },
    { month: 'Apr', rate: 93.1 },
    { month: 'May', rate: 94.7 },
    { month: 'Jun', rate: 92.0 }
  ],
  performance: {
    gpaDistribution: [
      { name: '4.0-3.5', value: 420 },
      { name: '3.5-3.0', value: 380 },
      { name: '3.0-2.5', value: 280 },
      { name: '2.5-2.0', value: 120 },
      { name: '<2.0', value: 45 }
    ],
    improvement: [
      { name: 'Improved', value: 680, icon: <ArrowUpRight className="h-4 w-4 text-green-500" /> },
      { name: 'Stable', value: 420, icon: <Meh className="h-4 w-4 text-yellow-500" /> },
      { name: 'Declined', value: 145, icon: <Frown className="h-4 w-4 text-red-500" /> }
    ]
  },
  recentActivity: [
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'AJ',
      program: 'Computer Science',
      status: 'improved',
      change: '+0.4 GPA',
      courses: ['CS101', 'Math201'],
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: 'MG',
      program: 'Biology',
      status: 'at-risk',
      change: '3 absences',
      courses: ['Bio301', 'Chem202'],
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Sam Wilson',
      avatar: 'SW',
      program: 'Economics',
      status: 'excellent',
      change: 'Top 5%',
      courses: ['Econ101', 'Stat300'],
      lastActive: '4 hours ago'
    },
    {
      id: 4,
      name: 'Taylor Smith',
      avatar: 'TS',
      program: 'Literature',
      status: 'warning',
      change: '-0.8 GPA',
      courses: ['Lit210', 'Hist150'],
      lastActive: '3 days ago'
    }
  ],
  sentimentAnalysis: [
    { name: 'Positive', value: 65, color: '#10b981' },
    { name: 'Neutral', value: 25, color: '#f59e0b' },
    { name: 'Negative', value: 10, color: '#ef4444' }
  ],
  aiRecommendations: [
    {
      title: 'At-Risk Students',
      description: '23 students showing consistent decline in performance',
      action: 'Review intervention strategies',
      urgency: 'high'
    },
    {
      title: 'Attendance Patterns',
      description: 'Higher absenteeism on Fridays in STEM programs',
      action: 'Consider schedule adjustments',
      urgency: 'medium'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Students() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-50 to-indigo-50
      dark:from-gray-900 dark:to-gray-800
      border border-gray-200 dark:border-gray-700
      p-6 space-y-6">

      {/* Header with animated gradient */}
      <div className="relative overflow-hidden rounded-xl p-6 
        bg-gradient-to-r from-blue-500 to-indigo-600
        text-white">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-indigo-500/30"
          animate={{
            x: ['-100%', '100%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Student Intelligence</h1>
              <p className="text-blue-100">Comprehensive analytics and insights about your student body</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
          
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
            <SummaryCard 
              icon={<Users className="h-5 w-5" />}
              title="Total Students"
              value={studentsData.summary.total}
              trend="+3.2%"
              trendUp={true}
            />
            <SummaryCard 
              icon={<BookOpen className="h-5 w-5" />}
              title="New Students"
              value={studentsData.summary.newThisMonth}
              trend="+12.5%"
              trendUp={true}
            />
            <SummaryCard 
              icon={<GraduationCap className="h-5 w-5" />}
              title="Graduating"
              value={studentsData.summary.graduating}
              trend="+5.7%"
              trendUp={true}
            />
            <SummaryCard 
              icon={<ClipboardList className="h-5 w-5" />}
              title="Attendance"
              value={`${studentsData.summary.attendanceRate}%`}
              trend="+1.3%"
              trendUp={true}
            />
            <SummaryCard 
              icon={<Award className="h-5 w-5" />}
              title="Avg GPA"
              value={studentsData.summary.avgGPA}
              trend="+0.1"
              trendUp={true}
            />
            <SummaryCard 
              icon={<Smile className="h-5 w-5" />}
              title="Satisfaction"
              value={`${studentsData.summary.satisfaction}/5`}
              trend="+0.2"
              trendUp={true}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Eye className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="demographics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Layers className="h-4 w-4 mr-2" />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Calendar className="h-4 w-4 mr-2" />
            Recent Activity
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Trends */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Attendance Trends
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentsData.attendanceTrends}>
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Sentiment Analysis */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Smile className="h-5 w-5 text-green-500" />
                Student Sentiment
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={studentsData.sentimentAnalysis}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {studentsData.sentimentAnalysis.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* AI Recommendations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                AI Recommendations
              </h3>
              <ScrollArea className="h-[250px]">
                <div className="space-y-4">
                  {studentsData.aiRecommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      rec.urgency === 'high' 
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          rec.urgency === 'high' 
                            ? 'bg-red-100 dark:bg-red-800/50 text-red-600 dark:text-red-300'
                            : 'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300'
                        }`}>
                          {rec.urgency === 'high' ? (
                            <AlertTriangle className="h-5 w-5" />
                          ) : (
                            <Zap className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1 mb-2">{rec.description}</p>
                          <Button variant="outline" size="sm" className="text-xs">
                            {rec.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* By Grade Level */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-purple-500" />
                By Grade Level
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentsData.demographics.byGrade}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* By Program */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-green-500" />
                By Academic Program
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={studentsData.demographics.byProgram}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar name="Students" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* By Gender */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-pink-500" />
                By Gender
              </h3>
              <div className="h-[300px] flex flex-col items-center justify-center">
                <div className="w-[200px] h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={studentsData.demographics.byGender}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {studentsData.demographics.byGender.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-4">
                  {studentsData.demographics.byGender.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GPA Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                GPA Distribution
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentsData.performance.gpaDistribution}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Performance Trends */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Performance Trends
              </h3>
              <div className="space-y-6">
                {studentsData.performance.improvement.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value} students</span>
                    </div>
                    <Progress 
                      value={(item.value / studentsData.summary.total) * 100} 
                      className="h-2"
                      indicatorClassName={
                        item.name === 'Improved' ? 'bg-green-500' : 
                        item.name === 'Stable' ? 'bg-yellow-500' : 'bg-red-500'
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Student Activity Feed</h3>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List View
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {studentsData.recentActivity.map((student) => (
                <Card key={student.id} className={`overflow-hidden ${
                  student.status === 'excellent' ? 'border-green-200 dark:border-green-800' :
                  student.status === 'improved' ? 'border-blue-200 dark:border-blue-800' :
                  student.status === 'warning' ? 'border-yellow-200 dark:border-yellow-800' :
                  'border-red-200 dark:border-red-800'
                }`}>
                  <div className={`p-4 ${
                    student.status === 'excellent' ? 'bg-green-50 dark:bg-green-900/20' :
                    student.status === 'improved' ? 'bg-blue-50 dark:bg-blue-900/20' :
                    student.status === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    'bg-red-50 dark:bg-red-900/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{student.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.program}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant={
                        student.status === 'excellent' ? 'default' :
                        student.status === 'improved' ? 'secondary' :
                        student.status === 'warning' ? 'outline' : 'destructive'
                      }>
                        {student.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Change</span>
                      <span className={`text-sm font-medium ${
                        student.status === 'excellent' || student.status === 'improved' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {student.change}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Active</span>
                      <span className="text-sm">{student.lastActive}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="divide-y">
                {studentsData.recentActivity.map((student) => (
                  <div 
                    key={student.id} 
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                    onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{student.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.program}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={
                          student.status === 'excellent' ? 'default' :
                          student.status === 'improved' ? 'secondary' :
                          student.status === 'warning' ? 'outline' : 'destructive'
                        }>
                          {student.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {expandedStudent === student.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedStudent === student.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2">Courses</h5>
                              <div className="flex flex-wrap gap-2">
                                {student.courses.map((course, i) => (
                                  <Badge key={i} variant="outline">{course}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2">Performance Change</h5>
                              <p className={`${
                                student.status === 'excellent' || student.status === 'improved' 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-red-600 dark:text-red-400'
                              }`}>
                                {student.change}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2">Last Active</h5>
                              <p>{student.lastActive}</p>
                            </div>
                            <div className="flex items-end justify-end">
                              <Button variant="outline" size="sm">View Profile</Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SummaryCard({ icon, title, value, trend, trendUp }) {
  return (
    <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/20">
          {icon}
        </div>
        <div>
          <p className="text-sm text-blue-50/80">{title}</p>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">{value}</h3>
            <Badge variant="outline" className={`border-white/20 bg-white/10 ${
              trendUp ? 'text-green-300' : 'text-red-300'
            }`}>
              {trend}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}