import { useState } from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  Clock,
  TrendingUp,
  Bell,
  AlertTriangle,
  Zap,
  User,
  Library,
  DollarSign,
  Percent,
  Star,
  Activity,
  Calendar,
  BarChart2,
  MessageSquare,
  Home,
  UserCheck,
  Plus,
  Search,
  Settings,
  HelpCircle,
  Brain
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
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';

// Mock data for education domain
const educationData = {
  currentStats: {
    students: 1245,
    faculty: 78,
    courses: 42,
    attendanceRate: 92,
    avgGPA: 3.4,
    graduationRate: 89
  },
  dailyActivity: [
    { hour: '8:00', classes: 12, students: 450 },
    { hour: '9:00', classes: 28, students: 920 },
    { hour: '10:00', classes: 35, students: 1120 },
    { hour: '11:00', classes: 38, students: 1245 },
    { hour: '12:00', classes: 15, students: 600 },
    { hour: '13:00', classes: 32, students: 1050 }
  ],
  topCourses: [
    { name: 'Computer Science 101', enrollment: 145, avgGrade: 3.7, satisfaction: 4.8 },
    { name: 'Advanced Mathematics', enrollment: 120, avgGrade: 3.5, satisfaction: 4.6 },
    { name: 'Literature Survey', enrollment: 95, avgGrade: 3.9, satisfaction: 4.9 },
    { name: 'Biology Lab', enrollment: 88, avgGrade: 3.6, satisfaction: 4.7 }
  ],
  facultyMetrics: {
    present: 72,
    absent: 6,
    studentRatings: 4.6,
    topPerformers: [
      { name: 'Dr. Smith', courses: 5, rating: 4.9 },
      { name: 'Prof. Johnson', courses: 4, rating: 4.8 }
    ]
  },
  facilities: [
    { id: 'A101', type: 'lecture hall', status: 'occupied', class: 'CS 101' },
    { id: 'B205', type: 'lab', status: 'available', class: '' },
    { id: 'C302', type: 'seminar room', status: 'reserved', class: 'Math 301' },
    { id: 'D110', type: 'auditorium', status: 'occupied', class: 'Guest Lecture' }
  ],
  aiInsights: [
    {
      type: 'prediction',
      title: 'Attendance Drop Alert',
      description: 'Expected 15% lower attendance on Friday due to upcoming holiday',
      impact: 'medium',
      action: 'Consider rescheduling important lectures'
    },
    {
      type: 'optimization',
      title: 'Course Popularity',
      description: 'Computer Science demand increasing. Consider adding more sections.',
      impact: 'high',
      action: 'Review faculty availability'
    }
  ],
  alerts: [
    {
      type: 'facility',
      title: 'Maintenance Needed',
      description: 'Lab B205 equipment needs calibration',
      urgency: 'high'
    },
    {
      type: 'academic',
      title: 'At-Risk Students',
      description: '12 students in Math 201 are below passing threshold',
      urgency: 'medium'
    }
  ]
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
            Education Digital Data Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Live Monitoring
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Students"
          value={educationData.currentStats.students.toLocaleString()}
          icon={<Users className="h-5 w-5 text-blue-500" />}
          trend="+5.2%"
          trendUp={true}
        />
        <MetricCard
          title="Faculty"
          value={educationData.currentStats.faculty.toString()}
          icon={<User className="h-5 w-5 text-indigo-500" />}
          trend="+2.1%"
          trendUp={true}
        />
        <MetricCard
          title="Attendance"
          value={`${educationData.currentStats.attendanceRate}%`}
          icon={<UserCheck className="h-5 w-5 text-green-500" />}
          trend="+1.3%"
          trendUp={true}
        />
        <MetricCard
          title="Avg GPA"
          value={educationData.currentStats.avgGPA.toString()}
          icon={<GraduationCap className="h-5 w-5 text-yellow-500" />}
          trend="+0.2"
          trendUp={true}
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Activity */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Daily Campus Activity
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Hourly</Button>
              <Button variant="outline" size="sm">Daily</Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={educationData.dailyActivity}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="students"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="classes"
                stackId="2"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* AI Insights & Alerts */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-400" />
            AI Insights
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {educationData.aiInsights.map((insight, index) => (
                <Card key={index} className={`p-4 ${insight.impact === 'high'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                  }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === 'prediction' ? (
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                    ) : (
                      <Zap className="h-4 w-4 text-indigo-400" />
                    )}
                    <span className="font-semibold">{insight.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Impact: {insight.impact}
                    </Badge>
                    <Button variant="ghost" size="sm">Take Action</Button>
                  </div>
                </Card>
              ))}

              {educationData.alerts.map((alert, index) => (
                <Card key={index} className={`p-4 ${alert.urgency === 'high'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                  }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`h-4 w-4 ${alert.urgency === 'high' ? 'text-red-400' : 'text-yellow-400'
                      }`} />
                    <span className="font-semibold">{alert.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Top Courses & Faculty */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-400" />
            Popular Courses
          </h3>
          <div className="space-y-4">
            {educationData.topCourses.map((course, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 
                  to-indigo-400 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{course.name}</span>
                    <Badge variant="outline" className="bg-green-500/10">
                      {course.enrollment} students
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      Avg: {course.avgGrade} GPA
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                      <Star className="h-4 w-4" />
                      {course.satisfaction}/5
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Faculty Performance */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-400" />
              Faculty Overview
            </h3>
            <Badge variant="outline" className="bg-green-500/10">
              {educationData.facultyMetrics.present} Active
            </Badge>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">
                  {educationData.facultyMetrics.studentRatings}/5
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg Rating
                </div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="text-2xl font-bold">
                  {educationData.facultyMetrics.present}/{educationData.facultyMetrics.present + educationData.facultyMetrics.absent}
                </div>
                <div className="text-sm text-muted-foreground">
                  Attendance
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Top Performers</h4>
              <div className="space-y-3">
                {educationData.facultyMetrics.topPerformers.map((faculty, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{faculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{faculty.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {faculty.courses} courses • {faculty.rating} rating
                      </div>
                    </div>
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Facility Management */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-400" />
          Facility Status
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {educationData.facilities.map((facility) => (
            <Card key={facility.id} className={`p-4 ${facility.status === 'occupied'
                ? 'bg-red-500/10 border-red-500/30'
                : facility.status === 'reserved'
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-green-500/10 border-green-500/30'
              }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{facility.id}</span>
                <Badge variant="outline">{facility.type}</Badge>
              </div>
              {facility.status !== 'available' && (
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {facility.class}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {facility.status}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Link to="/agentic-ai">
          <Button className="rounded-full shadow-lg gap-2">
            <Plus className="h-4 w-4" />
            Agentic AI
          </Button>
        </Link>
        <Link to="/log-monitor">
          <Button className="rounded-full shadow-lg gap-2">
            <Plus className="h-4 w-4" />
            Log Monitor
          </Button>
        </Link>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, trendUp }) {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <Badge variant="outline" className={`${trendUp ? 'text-green-500' : 'text-red-500'
          }`}>
          {trend}
        </Badge>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </Card>
  );
}