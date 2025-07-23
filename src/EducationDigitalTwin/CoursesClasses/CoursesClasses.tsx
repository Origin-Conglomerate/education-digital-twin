import { useState } from 'react';
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
  LabelList
} from 'recharts';
import {
  BookOpen,
  Clock,
  Users,
  Calendar,
  GraduationCap,
  BarChart2,
  PieChart as PieIcon,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Plus,
  AlertCircle,
  Star,
  CheckCircle,
  XCircle,
  Bookmark,
  Video,
  Download,
  Share2,
  MoreHorizontal
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
import { AnimatePresence } from 'framer-motion';

// Mock data
const educationData = {
  summary: {
    totalCourses: 42,
    activeClasses: 28,
    studentsEnrolled: 1560,
    attendanceRate: 89,
    completionRate: 76,
    avgPerformance: 82
  },
  popularCourses: [
    { 
      id: 'CS101', 
      title: 'Introduction to AI', 
      instructor: 'Dr. Sarah Chen',
      enrolled: 245,
      capacity: 300,
      rating: 4.8,
      sessions: ['Mon 9:00-11:00', 'Wed 9:00-11:00'],
      room: 'Tech Hall 203',
      performance: 92,
      resources: 18
    },
    { 
      id: 'MATH202', 
      title: 'Advanced Calculus', 
      instructor: 'Prof. James Wilson',
      enrolled: 180,
      capacity: 200,
      rating: 4.6,
      sessions: ['Tue 13:00-15:00', 'Thu 13:00-15:00'],
      room: 'Science Bldg 105',
      performance: 85,
      resources: 12
    },
    { 
      id: 'ENG105', 
      title: 'Creative Writing', 
      instructor: 'Dr. Emily Parker',
      enrolled: 120,
      capacity: 150,
      rating: 4.9,
      sessions: ['Fri 10:00-12:00'],
      room: 'Humanities 302',
      performance: 88,
      resources: 24
    },
    { 
      id: 'PHYS301', 
      title: 'Quantum Mechanics', 
      instructor: 'Prof. Robert Lee',
      enrolled: 95,
      capacity: 120,
      rating: 4.7,
      sessions: ['Mon 14:00-16:00', 'Wed 14:00-16:00'],
      room: 'Physics Lab A',
      performance: 79,
      resources: 15
    }
  ],
  upcomingClasses: [
    { 
      course: 'CS101', 
      title: 'Introduction to AI - Lecture 8', 
      time: 'Today, 9:00-11:00',
      room: 'Tech Hall 203',
      instructor: 'Dr. Sarah Chen',
      students: 245,
      materials: 5
    },
    { 
      course: 'MATH202', 
      title: 'Advanced Calculus - Problem Session', 
      time: 'Tomorrow, 13:00-15:00',
      room: 'Science Bldg 105',
      instructor: 'Prof. James Wilson',
      students: 180,
      materials: 3
    },
    { 
      course: 'ENG105', 
      title: 'Creative Writing - Workshop', 
      time: 'Fri, 10:00-12:00',
      room: 'Humanities 302',
      instructor: 'Dr. Emily Parker',
      students: 120,
      materials: 2
    }
  ],
  enrollmentTrends: [
    { month: 'Jan', enrollments: 320, completions: 280 },
    { month: 'Feb', enrollments: 450, completions: 380 },
    { month: 'Mar', enrollments: 510, completions: 420 },
    { month: 'Apr', enrollments: 480, completions: 410 },
    { month: 'May', enrollments: 390, completions: 350 },
    { month: 'Jun', enrollments: 270, completions: 240 }
  ],
  coursePerformance: [
    { subject: 'Computer Science', avgScore: 88, completion: 82 },
    { subject: 'Mathematics', avgScore: 85, completion: 78 },
    { subject: 'Literature', avgScore: 91, completion: 87 },
    { subject: 'Physics', avgScore: 83, completion: 75 },
    { subject: 'History', avgScore: 89, completion: 80 }
  ],
  roomUtilization: [
    { name: 'Tech Hall 203', utilization: 92, courses: 4 },
    { name: 'Science Bldg 105', utilization: 88, courses: 3 },
    { name: 'Humanities 302', utilization: 76, courses: 2 },
    { name: 'Physics Lab A', utilization: 68, courses: 2 },
    { name: 'Lecture Hall B', utilization: 58, courses: 1 }
  ],
  aiInsights: [
    {
      type: 'recommendation',
      title: 'High Demand Course',
      description: 'Introduction to AI has 92% enrollment. Consider adding another section.',
      action: 'Schedule planning'
    },
    {
      type: 'alert',
      title: 'Low Performance Alert',
      description: 'Physics courses show 12% lower completion than average.',
      action: 'Review curriculum'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

export default function CoursesClasses() {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleCourseExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
            Academic Operations Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <BookOpen className="h-4 w-4 mr-2" />
              {educationData.summary.totalCourses} Courses
            </Badge>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {educationData.summary.studentsEnrolled} Students
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Active Classes" 
          value={educationData.summary.activeClasses} 
          icon={<BookOpen className="h-5 w-5 text-blue-500" />}
          trend="+3 this week"
          trendUp={true}
        />
        <StatCard 
          title="Attendance Rate" 
          value={`${educationData.summary.attendanceRate}%`} 
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          trend="+2% from last month"
          trendUp={true}
        />
        <StatCard 
          title="Completion Rate" 
          value={`${educationData.summary.completionRate}%`} 
          icon={<GraduationCap className="h-5 w-5 text-purple-500" />}
          trend="+5% from last term"
          trendUp={true}
        />
        <StatCard 
          title="Avg Performance" 
          value={educationData.summary.avgPerformance} 
          icon={<Star className="h-5 w-5 text-yellow-500" />}
          trend="Stable"
          trendUp={null}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Enrollment Trends */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                Enrollment Trends
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
              <LineChart data={educationData.enrollmentTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="completions"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance & Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Performance */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                Subject Performance
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={educationData.coursePerformance}>
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="avgScore" position="top" />
                  </Bar>
                  <Bar dataKey="completion" fill="#10b981" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="completion" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Room Utilization */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-purple-400" />
                Room Utilization
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={educationData.roomUtilization}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="utilization"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {educationData.roomUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              Academic Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationData.aiInsights.map((insight, index) => (
                <Card key={index} className={`p-4 ${
                  insight.type === 'alert' 
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {insight.type === 'alert' ? (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    )}
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="text-blue-400">
                      {insight.action} →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          {/* Course Catalog */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Course Catalog
              </h3>
              <div className="flex gap-2">
                <Input placeholder="Search courses..." className="w-[200px]" />
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {educationData.popularCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleCourseExpand(course.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{course.id} - {course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.instructor} • {course.sessions.length} sessions/week
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-green-500/10">
                        {course.enrolled}/{course.capacity}
                      </Badge>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-4 w-4" />
                        <span>{course.rating}</span>
                      </div>
                      {expandedCourse === course.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedCourse === course.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-4 pb-4 pt-2 border-t border-gray-200/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Course Details */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-sm">Course Details</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>Sessions: {course.sessions.join(', ')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Bookmark className="h-4 w-4 text-muted-foreground" />
                                <span>Room: {course.room}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Video className="h-4 w-4 text-muted-foreground" />
                                <span>Resources: {course.resources} materials</span>
                              </div>
                            </div>
                          </div>

                          {/* Performance */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-sm">Performance Metrics</h5>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Avg Score</span>
                                <span className="font-medium">{course.performance}%</span>
                              </div>
                              <Progress value={course.performance} className="h-2" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Report
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="h-4 w-4" />
                                Share
                              </Button>
                            </div>
                          </div>

                          {/* Enrollment */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-sm">Enrollment Status</h5>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Capacity</span>
                              <span className="font-medium">
                                {Math.round((course.enrolled / course.capacity) * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={(course.enrolled / course.capacity) * 100} 
                              className="h-2" 
                            />
                            <div className="flex justify-between text-sm">
                              <span>{course.enrolled} enrolled</span>
                              <span>{course.capacity - course.enrolled} seats left</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          {/* Upcoming Classes */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              Upcoming Classes
            </h3>
            
            <div className="space-y-4">
              {educationData.upcomingClasses.map((classItem, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{classItem.title}</h4>
                        <Badge variant="outline">{classItem.course}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Bookmark className="h-4 w-4" />
                            <span>{classItem.room}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{classItem.students} students</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Video className="h-4 w-4" />
                            <span>{classItem.materials} materials</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                          <Button size="sm">
                            Start Session
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Room Scheduling */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-purple-400" />
                Room Scheduling
              </h3>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200/10">
                    <th className="text-left py-3 px-4">Room</th>
                    <th className="text-left py-3 px-4">Mon</th>
                    <th className="text-left py-3 px-4">Tue</th>
                    <th className="text-left py-3 px-4">Wed</th>
                    <th className="text-left py-3 px-4">Thu</th>
                    <th className="text-left py-3 px-4">Fri</th>
                  </tr>
                </thead>
                <tbody>
                  {educationData.roomUtilization.map((room) => (
                    <tr key={room.name} className="border-b border-gray-200/10 hover:bg-white/5">
                      <td className="py-3 px-4 font-medium">{room.name}</td>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                        <td key={day} className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            {day === 'Mon' && (
                              <>
                                <Badge variant="outline" className="w-fit">CS101 9-11</Badge>
                                <Badge variant="outline" className="w-fit">PHYS301 14-16</Badge>
                              </>
                            )}
                            {day === 'Tue' && (
                              <Badge variant="outline" className="w-fit">MATH202 13-15</Badge>
                            )}
                            {day === 'Wed' && (
                              <>
                                <Badge variant="outline" className="w-fit">CS101 9-11</Badge>
                                <Badge variant="outline" className="w-fit">PHYS301 14-16</Badge>
                              </>
                            )}
                            {day === 'Thu' && (
                              <Badge variant="outline" className="w-fit">MATH202 13-15</Badge>
                            )}
                            {day === 'Fri' && (
                              <Badge variant="outline" className="w-fit">ENG105 10-12</Badge>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="rounded-full shadow-lg gap-2">
          <Plus className="h-4 w-4" />
          New Course
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