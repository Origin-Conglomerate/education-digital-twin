import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import {
  BookOpen,
  GraduationCap,
  Award,
  ClipboardList,
  BarChart2,
  TrendingUp,
  AlertCircle,
  Users,
  Bookmark,
  Clock,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Book,
  Lightbulb,
  Gauge,
  Target,
  LineChart as LineChartIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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

// Mock data for education domain
const academicData = {
  overview: {
    averageGrade: 86.5,
    graduationRate: 94.2,
    attendanceRate: 92.7,
    learningOutcomes: 88.3,
    standardizedScores: {
      math: 78.5,
      reading: 85.2,
      science: 82.1,
      writing: 80.9
    }
  },
  gradeDistribution: [
    { name: 'A', value: 32, fill: '#10b981' },
    { name: 'B', value: 45, fill: '#3b82f6' },
    { name: 'C', value: 18, fill: '#f59e0b' },
    { name: 'D', value: 4, fill: '#ec4899' },
    { name: 'F', value: 1, fill: '#ef4444' }
  ],
  subjectPerformance: [
    { subject: 'Mathematics', score: 78.5, trend: 'up', improvement: 5.2 },
    { subject: 'English', score: 85.2, trend: 'up', improvement: 3.1 },
    { subject: 'Science', score: 82.1, trend: 'steady', improvement: 0.8 },
    { subject: 'History', score: 79.8, trend: 'down', improvement: -2.4 },
    { subject: 'Arts', score: 88.6, trend: 'up', improvement: 4.7 }
  ],
  learningOutcomes: [
    { outcome: 'Critical Thinking', mastery: 82, target: 85 },
    { outcome: 'Problem Solving', mastery: 78, target: 80 },
    { outcome: 'Communication', mastery: 85, target: 85 },
    { outcome: 'Collaboration', mastery: 88, target: 90 },
    { outcome: 'Creativity', mastery: 75, target: 80 }
  ],
  assessmentTrends: [
    { month: 'Jan', assessments: 45, average: 82.1 },
    { month: 'Feb', assessments: 52, average: 83.5 },
    { month: 'Mar', assessments: 48, average: 84.2 },
    { month: 'Apr', assessments: 56, average: 85.7 },
    { month: 'May', assessments: 62, average: 86.3 }
  ],
  aiInsights: [
    {
      type: 'prediction',
      title: 'Math Performance Alert',
      description: 'Students are struggling with algebraic concepts in Grade 9',
      impact: 'high',
      action: 'Review curriculum pacing'
    },
    {
      type: 'optimization',
      title: 'Learning Style Insight',
      description: '65% of visual learners in Grade 7 are underperforming',
      impact: 'medium',
      action: 'Adjust teaching methods'
    }
  ],
  atRiskStudents: [
    {
      name: 'Alex Johnson',
      grade: '9',
      riskFactors: ['Attendance', 'Math Scores'],
      riskLevel: 'high',
      lastAssessment: 62
    },
    {
      name: 'Maria Garcia',
      grade: '10',
      riskFactors: ['English Writing'],
      riskLevel: 'medium',
      lastAssessment: 71
    },
    {
      name: 'Jamal Williams',
      grade: '8',
      riskFactors: ['Participation', 'Science'],
      riskLevel: 'medium',
      lastAssessment: 68
    }
  ],
  curriculumCoverage: [
    { subject: 'Math', covered: 78, pace: 'on track' },
    { subject: 'Science', covered: 82, pace: 'ahead' },
    { subject: 'ELA', covered: 75, pace: 'behind' },
    { subject: 'Social Studies', covered: 80, pace: 'on track' }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Academics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [timeRange, setTimeRange] = useState('semester');

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
            Academic Performance Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Lightbulb className="h-4 w-4 mr-2" />
              Learning Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Real-time Academic Monitoring
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-lg">
          <TabsTrigger value="overview" className="flex gap-2">
            <Gauge className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="grades" className="flex gap-2">
            <Award className="h-4 w-4" />
            Grades
          </TabsTrigger>
          <TabsTrigger value="outcomes" className="flex gap-2">
            <Target className="h-4 w-4" />
            Outcomes
          </TabsTrigger>
          <TabsTrigger value="curriculum" className="flex gap-2">
            <Book className="h-4 w-4" />
            Curriculum
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex gap-2">
            <Lightbulb className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard
              title="Avg Grade"
              value={`${academicData.overview.averageGrade}%`}
              icon={<BookOpen className="h-5 w-5 text-blue-500" />}
              trend="+2.1%"
              trendUp={true}
            />
            <MetricCard
              title="Graduation Rate"
              value={`${academicData.overview.graduationRate}%`}
              icon={<GraduationCap className="h-5 w-5 text-green-500" />}
              trend="+1.5%"
              trendUp={true}
            />
            <MetricCard
              title="Attendance"
              value={`${academicData.overview.attendanceRate}%`}
              icon={<Users className="h-5 w-5 text-purple-500" />}
              trend="+0.8%"
              trendUp={true}
            />
            <MetricCard
              title="Learning Outcomes"
              value={`${academicData.overview.learningOutcomes}%`}
              icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
              trend="+3.2%"
              trendUp={true}
            />
            <MetricCard
              title="Standardized Scores"
              value="82.2"
              icon={<ClipboardList className="h-5 w-5 text-indigo-500" />}
              trend="+1.8%"
              trendUp={true}
            />
          </div>

          {/* Standardized Test Performance */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-indigo-400" />
              Standardized Test Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(academicData.overview.standardizedScores).map(([subject, score]) => (
                <div key={subject} className="flex flex-col items-center p-4 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold mb-1">
                    {score}%
                  </div>
                  <div className="text-sm font-medium capitalize">
                    {subject}
                  </div>
                  <div className="w-full mt-3">
                    <Progress value={score} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Grade Distribution & Subject Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Distribution */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-blue-400" />
                Grade Distribution
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={academicData.gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {academicData.gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Subject Performance */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-green-400" />
                Subject Performance Trends
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={academicData.subjectPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Grades Tab */}
      {activeTab === 'grades' && (
        <div className="space-y-6">
          {/* Assessment Trends */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Assessment Trends
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={academicData.assessmentTrends}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[75, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* At-Risk Students */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              At-Risk Students
            </h3>
            <div className="space-y-4">
              {academicData.atRiskStudents.map((student, index) => (
                <div key={index} className="flex items-center p-4 rounded-lg bg-white/5">
                  <Avatar className="mr-3">
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Grade {student.grade} • Last Assessment: {student.lastAssessment}%
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {student.riskFactors.map((factor, i) => (
                        <Badge key={i} variant="outline" className={
                          student.riskLevel === 'high' ? 'bg-red-500/10' : 'bg-yellow-500/10'
                        }>
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline" className={
                    student.riskLevel === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                  }>
                    {student.riskLevel} risk
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Outcomes Tab */}
      {activeTab === 'outcomes' && (
        <div className="space-y-6">
          {/* Learning Outcomes Mastery */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-400" />
              Learning Outcomes Mastery
            </h3>
            <div className="space-y-6">
              {academicData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{outcome.outcome}</span>
                    <span className="text-sm font-medium">
                      {outcome.mastery}% / {outcome.target}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={(outcome.mastery / outcome.target) * 100} className="h-2 flex-1" />
                    <Badge variant="outline" className={
                      outcome.mastery >= outcome.target 
                        ? 'bg-green-500/10 text-green-500' 
                        : outcome.mastery >= outcome.target * 0.9 
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-500'
                    }>
                      {outcome.mastery >= outcome.target ? 'Mastered' : outcome.mastery >= outcome.target * 0.9 ? 'Near Target' : 'Needs Focus'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Outcome Correlation */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-blue-400" />
              Outcome Correlation Analysis
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <XAxis type="number" dataKey="mastery" name="Mastery %" domain={[60, 100]} />
                  <YAxis type="number" dataKey="target" name="Target %" domain={[70, 95]} />
                  <ZAxis type="number" dataKey="improvement" range={[60, 400]} name="Improvement" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Outcomes" data={academicData.learningOutcomes} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Curriculum Tab */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          {/* Curriculum Coverage */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Book className="h-5 w-5 text-green-400" />
              Curriculum Coverage
            </h3>
            <div className="space-y-6">
              {academicData.curriculumCoverage.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-sm font-medium">
                      {subject.covered}% covered • 
                      <Badge variant="outline" className={`ml-2 ${
                        subject.pace === 'ahead' 
                          ? 'bg-green-500/10 text-green-500' 
                          : subject.pace === 'behind' 
                            ? 'bg-red-500/10 text-red-500'
                            : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {subject.pace}
                      </Badge>
                    </span>
                  </div>
                  <Progress value={subject.covered} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Pacing Recommendations */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              Pacing Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="flex items-center gap-3 mb-3">
                  <Bookmark className="h-5 w-5 text-blue-400" />
                  <h4 className="font-semibold">ELA Curriculum</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Current pace is 5% behind target. Recommend adding 2 additional instructional hours per week.
                </p>
                <Button variant="outline" size="sm">View Plan</Button>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h4 className="font-semibold">Math Curriculum</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Current pace is 3% ahead of target. Consider enrichment activities for advanced students.
                </p>
                <Button variant="outline" size="sm">View Resources</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* AI Insights */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              AI-Generated Insights
            </h3>
            <div className="space-y-4">
              {academicData.aiInsights.map((insight, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`p-4 cursor-pointer ${
                    insight.impact === 'high' 
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}
                  onClick={() => setExpandedInsight(expandedInsight === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {insight.type === 'prediction' ? (
                          <TrendingUp className="h-5 w-5 text-yellow-400" />
                        ) : (
                          <Lightbulb className="h-5 w-5 text-blue-400" />
                        )}
                        <span className="font-semibold">{insight.title}</span>
                      </div>
                      {expandedInsight === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                    
                    {expandedInsight === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3"
                      >
                        <p className="text-sm text-muted-foreground mb-3">
                          {insight.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            {insight.type === 'prediction' ? 'Predictive' : 'Prescriptive'}
                          </Badge>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Intervention Effectiveness */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-green-400" />
              Intervention Effectiveness
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Math Tutoring', effectiveness: 72, students: 45 },
                  { name: 'Reading Groups', effectiveness: 85, students: 32 },
                  { name: 'Study Skills', effectiveness: 68, students: 28 },
                  { name: 'Peer Mentoring', effectiveness: 78, students: 39 }
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="effectiveness" fill="#10b981" name="Effectiveness %" />
                  <Bar dataKey="students" fill="#3b82f6" name="Students Impacted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
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

function MetricCard({ title, value, icon, trend, trendUp }) {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <Badge variant="outline" className={`${
          trendUp ? 'text-green-500' : 'text-red-500'
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