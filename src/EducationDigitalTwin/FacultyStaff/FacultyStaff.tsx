import { useState } from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import {
  Users,
  UserCheck,
  Clock,
  Award,
  BookOpen,
  Calendar,
  BarChart2,
  PieChart as PieIcon,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Plus,
  Mail,
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  Bookmark,
  Video,
  Download,
  Share2,
  MoreHorizontal,
  GraduationCap,
  TrendingUp,
  AlertCircle
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
import { motion, AnimatePresence } from 'framer-motion';
import { LabelList } from 'recharts';

// Mock data
const facultyData = {
  summary: {
    totalFaculty: 48,
    presentToday: 42,
    attendanceRate: 87,
    avgWorkload: 18,
    avgRating: 4.7,
    professionalDevHours: 1560
  },
  topPerformers: [
    { 
      id: 'F101', 
      name: 'Dr. Sarah Chen', 
      department: 'Computer Science',
      courses: 4,
      students: 245,
      rating: 4.9,
      attendance: 98,
      workload: 22,
      research: 8,
      image: '/avatars/sarah.jpg'
    },
    { 
      id: 'F202', 
      name: 'Prof. James Wilson', 
      department: 'Mathematics',
      courses: 3,
      students: 180,
      rating: 4.8,
      attendance: 95,
      workload: 18,
      research: 5,
      image: '/avatars/james.jpg'
    },
    { 
      id: 'F303', 
      name: 'Dr. Emily Parker', 
      department: 'Literature',
      courses: 2,
      students: 120,
      rating: 4.9,
      attendance: 100,
      workload: 15,
      research: 3,
      image: '/avatars/emily.jpg'
    }
  ],
  departments: [
    { name: 'Computer Science', faculty: 12, ratio: 18, rating: 4.7 },
    { name: 'Mathematics', faculty: 10, ratio: 20, rating: 4.6 },
    { name: 'Literature', faculty: 8, ratio: 15, rating: 4.8 },
    { name: 'Physics', faculty: 6, ratio: 22, rating: 4.5 },
    { name: 'History', faculty: 5, ratio: 17, rating: 4.7 }
  ],
  workloadDistribution: [
    { name: '0-10 hrs', value: 8 },
    { name: '10-15 hrs', value: 12 },
    { name: '15-20 hrs', value: 15 },
    { name: '20+ hrs', value: 13 }
  ],
  performanceMetrics: [
    { subject: 'Teaching', value: 92 },
    { subject: 'Research', value: 85 },
    { subject: 'Mentoring', value: 88 },
    { subject: 'Service', value: 76 },
    { subject: 'Development', value: 82 }
  ],
  attendanceTrends: [
    { month: 'Jan', rate: 85, absent: 8 },
    { month: 'Feb', rate: 88, absent: 6 },
    { month: 'Mar', rate: 90, absent: 5 },
    { month: 'Apr', rate: 87, absent: 7 },
    { month: 'May', rate: 92, absent: 4 },
    { month: 'Jun', rate: 89, absent: 6 }
  ],
  aiInsights: [
    {
      type: 'recommendation',
      title: 'Workload Balance',
      description: '15 faculty members exceed recommended workload. Consider redistributing courses.',
      action: 'Review assignments'
    },
    {
      type: 'alert',
      title: 'Attendance Concern',
      description: 'Physics department shows 12% lower attendance than average.',
      action: 'Investigate causes'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

export default function FacultyStaff() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaculty, setExpandedFaculty] = useState(null);

  const toggleFacultyExpand = (facultyId) => {
    setExpandedFaculty(expandedFaculty === facultyId ? null : facultyId);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-indigo-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 
            to-purple-400 bg-clip-text text-transparent">
            Faculty Operations Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-indigo-500/10 text-indigo-500">
              <Users className="h-4 w-4 mr-2" />
              {facultyData.summary.totalFaculty} Faculty Members
            </Badge>
            <span className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              {facultyData.summary.presentToday} Present Today
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Attendance Rate" 
          value={`${facultyData.summary.attendanceRate}%`} 
          icon={<UserCheck className="h-5 w-5 text-green-500" />}
          trend="+2% from last month"
          trendUp={true}
        />
        <StatCard 
          title="Avg Workload" 
          value={`${facultyData.summary.avgWorkload} hrs`} 
          icon={<BookOpen className="h-5 w-5 text-blue-500" />}
          trend="+1 hr from last term"
          trendUp={false}
        />
        <StatCard 
          title="Avg Rating" 
          value={facultyData.summary.avgRating} 
          icon={<Star className="h-5 w-5 text-yellow-500" />}
          trend="Stable"
          trendUp={null}
        />
        <StatCard 
          title="Dev Hours" 
          value={facultyData.summary.professionalDevHours} 
          icon={<Award className="h-5 w-5 text-purple-500" />}
          trend="+120 this year"
          trendUp={true}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-blue-400" />
                Faculty Performance Metrics
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={facultyData.performanceMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Faculty" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Workload Distribution */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-400" />
                Workload Distribution
              </h3>
              <div className="flex items-center justify-center h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={facultyData.workloadDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {facultyData.workloadDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Attendance Trends */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-400" />
                Attendance Trends
              </h3>
              <Select defaultValue="6months">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="12months">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={facultyData.attendanceTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Attendance Rate" />
                <Bar dataKey="absent" fill="#ec4899" radius={[4, 4, 0, 0]} name="Absent Faculty" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* AI Insights */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Faculty Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facultyData.aiInsights.map((insight, index) => (
                <Card key={index} className={`p-4 ${
                  insight.type === 'alert' 
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-indigo-500/10 border-indigo-500/30'
                }`}>
                  <div className="flex items-start gap-3">
                    {insight.type === 'alert' ? (
                      <AlertCircle className="h-5 w-5 text-red-400 mt-1" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-indigo-400 mt-1" />
                    )}
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      <Button variant="ghost" size="sm" className="text-indigo-400">
                        {insight.action} →
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-6">
          {/* Faculty Directory */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-400" />
                Faculty Directory
              </h3>
              <div className="flex gap-2">
                <Input placeholder="Search faculty..." className="w-[200px]" />
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {facultyData.topPerformers.map((faculty) => (
                <Card key={faculty.id} className="overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleFacultyExpand(faculty.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={faculty.image} />
                        <AvatarFallback>{faculty.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{faculty.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {faculty.department} • {faculty.courses} courses
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-4 w-4" />
                        <span>{faculty.rating}</span>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10">
                        {faculty.attendance}%
                      </Badge>
                      {expandedFaculty === faculty.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {expandedFaculty === faculty.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 pt-2 border-t border-gray-200/10 grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      {/* Faculty Details */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-sm">Performance Metrics</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Workload:</span>
                            <span className="font-medium">{faculty.workload} hrs/week</span>
                          </div>
                          <Progress value={(faculty.workload / 25) * 100} className="h-2" />
                          
                          <div className="flex items-center justify-between">
                            <span>Research:</span>
                            <span className="font-medium">{faculty.research} papers</span>
                          </div>
                          <Progress value={(faculty.research / 10) * 100} className="h-2" />
                        </div>
                      </div>

                      {/* Courses */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-sm">Teaching</h5>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Students:</span>
                            <span className="font-medium">{faculty.students}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Courses:</span>
                            <span className="font-medium">{faculty.courses}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Attendance:</span>
                            <span className="font-medium">{faculty.attendance}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-sm">Actions</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Report
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          {/* Department Analytics */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-purple-400" />
              Department Overview
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200/10">
                    <th className="text-left py-3 px-4">Department</th>
                    <th className="text-left py-3 px-4">Faculty</th>
                    <th className="text-left py-3 px-4">Student Ratio</th>
                    <th className="text-left py-3 px-4">Avg Rating</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyData.departments.map((dept) => (
                    <tr key={dept.name} className="border-b border-gray-200/10 hover:bg-white/5">
                      <td className="py-3 px-4 font-medium">{dept.name}</td>
                      <td className="py-3 px-4">{dept.faculty}</td>
                      <td className="py-3 px-4">1:{dept.ratio}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span>{dept.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={
                          dept.rating >= 4.7 ? 'bg-green-500/10' : 
                          dept.rating >= 4.5 ? 'bg-yellow-500/10' : 'bg-red-500/10'
                        }>
                          {dept.rating >= 4.7 ? 'Excellent' : dept.rating >= 4.5 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Faculty Ratios */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-400" />
                Faculty-Student Ratios
              </h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High Ratio</SelectItem>
                  <SelectItem value="low">Low Ratio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={facultyData.departments}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ratio" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="ratio" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="rounded-full shadow-lg gap-2">
          <Plus className="h-4 w-4" />
          New Faculty
        </Button>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendUp }) {
  return (
    <Card className="p-4 backdrop-blur-lg bg-white/5">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
      </div>
      {trend && (
        <p className={`text-xs mt-2 ${
          trendUp === true ? 'text-green-500' : 
          trendUp === false ? 'text-red-500' : 'text-muted-foreground'
        }`}>
          {trend}
        </p>
      )}
    </Card>
  );
}