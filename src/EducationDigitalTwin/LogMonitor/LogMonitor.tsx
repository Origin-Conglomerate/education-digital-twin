import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Book,
  BookOpen,
  CheckCircle,
  Clock,
  Code,
  Download,
  FileText,
  GraduationCap,
  HelpCircle,
  Laptop,
  Loader2,
  Mail,
  MessageSquare,
  Monitor,
  Notebook,
  PenTool,
  RefreshCw,
  Settings,
  Shield,
  Speech,
  Trash2,
  Upload,
  User,
  Users,
  Video,
  Wifi,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Log event types for education
const LOG_TYPES = {
  ATTENDANCE: { label: 'Attendance', icon: <User className="h-4 w-4" />, color: 'text-blue-400' },
  ASSIGNMENT: { label: 'Assignment', icon: <BookOpen className="h-4 w-4" />, color: 'text-green-400' },
  ASSESSMENT: { label: 'Assessment', icon: <FileText className="h-4 w-4" />, color: 'text-purple-400' },
  RESOURCE: { label: 'Resource', icon: <Book className="h-4 w-4" />, color: 'text-orange-400' },
  COMMUNICATION: { label: 'Communication', icon: <MessageSquare className="h-4 w-4" />, color: 'text-cyan-400' },
  SYSTEM: { label: 'System', icon: <Laptop className="h-4 w-4" />, color: 'text-gray-400' },
  INTERVENTION: { label: 'Intervention', icon: <HelpCircle className="h-4 w-4" />, color: 'text-yellow-400' },
  PERFORMANCE: { label: 'Performance', icon: <GraduationCap className="h-4 w-4" />, color: 'text-indigo-400' }
};

// Mock log events for education
const generateLogEvent = () => {
  const types = Object.keys(LOG_TYPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  
  const students = ['Alex Johnson', 'Maria Garcia', 'James Smith', 'Sarah Lee', 'David Kim'];
  const teachers = ['Dr. Wilson', 'Prof. Chen', 'Ms. Rodriguez', 'Mr. Thompson'];
  const courses = ['Mathematics 101', 'History 202', 'Biology 105', 'Computer Science 210'];
  const randomStudent = students[Math.floor(Math.random() * students.length)];
  const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];

  const baseEvent = {
    id: Date.now(),
    timestamp: now,
    type: randomType,
    source: ['LMS', 'SIS', 'Attendance System', 'Assessment Platform'][Math.floor(Math.random() * 4)],
    status: ['success', 'warning', 'error', 'info'][Math.floor(Math.random() * 4)]
  };

  switch(randomType) {
    case 'ATTENDANCE':
      return {
        ...baseEvent,
        message: `Attendance recorded for ${randomStudent} in ${randomCourse}`,
        details: {
          student: randomStudent,
          course: randomCourse,
          status: ['Present', 'Late', 'Excused Absence', 'Unexcused Absence'][Math.floor(Math.random() * 4)],
          recordedBy: randomTeacher
        }
      };
    case 'ASSIGNMENT':
      return {
        ...baseEvent,
        message: `Assignment submitted by ${randomStudent} for ${randomCourse}`,
        details: {
          student: randomStudent,
          course: randomCourse,
          assignment: ['Homework 3', 'Project Draft', 'Reading Response', 'Lab Report'][Math.floor(Math.random() * 4)],
          submittedAt: new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000),
          status: ['On Time', 'Late', 'Resubmitted'][Math.floor(Math.random() * 3)]
        }
      };
    case 'ASSESSMENT':
      return {
        ...baseEvent,
        message: `Assessment completed by ${randomStudent} in ${randomCourse}`,
        details: {
          student: randomStudent,
          course: randomCourse,
          assessment: ['Midterm Exam', 'Quiz 5', 'Final Project', 'Chapter Test'][Math.floor(Math.random() * 4)],
          score: (70 + Math.random() * 30).toFixed(1),
          timeSpent: `${Math.floor(10 + Math.random() * 50)} minutes`
        }
      };
    case 'RESOURCE':
      return {
        ...baseEvent,
        message: `New resource added to ${randomCourse}`,
        details: {
          instructor: randomTeacher,
          course: randomCourse,
          resource: ['Lecture Slides', 'Reading Material', 'Video Tutorial', 'Practice Problems'][Math.floor(Math.random() * 4)],
          format: ['PDF', 'Video', 'Link', 'Document'][Math.floor(Math.random() * 4)]
        }
      };
    case 'COMMUNICATION':
      return {
        ...baseEvent,
        message: `New message in ${randomCourse} discussion`,
        details: {
          sender: Math.random() > 0.5 ? randomTeacher : randomStudent,
          course: randomCourse,
          type: ['Question', 'Announcement', 'Discussion Post', 'Feedback'][Math.floor(Math.random() * 4)],
          recipients: Math.random() > 0.7 ? 'Entire Class' : 'Individual'
        }
      };
    case 'INTERVENTION':
      return {
        ...baseEvent,
        message: `Intervention triggered for ${randomStudent}`,
        details: {
          student: randomStudent,
          course: randomCourse,
          reason: ['Low Attendance', 'Failing Grade', 'Behavioral Concern', 'Missing Assignments'][Math.floor(Math.random() * 4)],
          action: ['Counselor Notification', 'Parent Contact', 'Extra Help Session', 'Plan Created'][Math.floor(Math.random() * 4)]
        }
      };
    case 'PERFORMANCE':
      return {
        ...baseEvent,
        message: `Performance update for ${randomStudent}`,
        details: {
          student: randomStudent,
          course: randomCourse,
          metric: ['Grade', 'Engagement', 'Participation', 'Progress'][Math.floor(Math.random() * 4)],
          oldValue: (70 + Math.random() * 20).toFixed(1),
          newValue: (70 + Math.random() * 20).toFixed(1),
          trend: ['Improving', 'Declining', 'Stable', 'Fluctuating'][Math.floor(Math.random() * 4)]
        }
      };
    default:
      return {
        ...baseEvent,
        message: 'System operation completed',
        details: {
          operation: ['Data sync', 'Backup', 'API call', 'Maintenance'][Math.floor(Math.random() * 4)],
          duration: `${(0.5 + Math.random() * 3).toFixed(2)}s`
        }
      };
  }
};

export default function LogMonitor() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    warnings: 0,
    errors: 0,
    lastHour: 0,
    activeStudents: 0
  });
  const logsEndRef = useRef(null);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Simulate live log events
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newEvent = generateLogEvent();
      setLogs(prev => [newEvent, ...prev].slice(0, 200));
      setStats(prev => ({
        total: prev.total + 1,
        warnings: prev.warnings + (newEvent.status === 'warning' ? 1 : 0),
        errors: prev.errors + (newEvent.status === 'error' ? 1 : 0),
        lastHour: prev.lastHour + 1,
        activeStudents: Math.floor(5 + Math.random() * 20) // Simulate active student count
      }));
    }, 800 + Math.random() * 1200); // Random interval between 0.8-2s

    return () => clearInterval(interval);
  }, [isPaused]);

  // Reset last hour count every hour
  useEffect(() => {
    const hourTimer = setInterval(() => {
      setStats(prev => ({ ...prev, lastHour: 0 }));
    }, 3600000);

    return () => clearInterval(hourTimer);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.type === filter.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details.student && log.details.student.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details.course && log.details.course.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const clearLogs = () => {
    setLogs([]);
    setStats(prev => ({ ...prev, total: 0, warnings: 0, errors: 0 }));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-gray-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 
            to-cyan-300 bg-clip-text text-transparent">
            Education Digital Twin Monitor
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-indigo-500/10 text-indigo-500">
              <Wifi className="h-4 w-4 mr-2" />
              Live Stream Active
            </Badge>
            <span className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {stats.total} total events
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isPaused ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setIsPaused(!isPaused)}
            className="gap-2"
          >
            {isPaused ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4" />
                Pause
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Events</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <BookOpen className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Active Students</div>
              <div className="text-2xl font-bold">{stats.activeStudents}</div>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Users className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Interventions</div>
              <div className="text-2xl font-bold">{stats.warnings}</div>
            </div>
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <HelpCircle className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">System Issues</div>
              <div className="text-2xl font-bold">{stats.errors}</div>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs by student, course, or message..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(LOG_TYPES).map(([key, value]) => (
              <SelectItem key={key} value={key.toLowerCase()}>
                <div className="flex items-center gap-2">
                  {value.icon}
                  {value.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Log Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Book className="h-8 w-8 mb-2" />
                <p>No educational events match your filters</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    log.status === 'error' 
                      ? 'bg-red-500/10 border-red-500/20' 
                      : log.status === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      log.status === 'error' 
                        ? 'bg-red-500/10 text-red-400' 
                        : log.status === 'warning'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-white/5'
                    }`}>
                      {LOG_TYPES[log.type].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${LOG_TYPES[log.type].color}`}>
                            {LOG_TYPES[log.type].label}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {log.source}
                          </Badge>
                          {log.status === 'error' && (
                            <Badge variant="destructive" className="text-xs">
                              Error
                            </Badge>
                          )}
                          {log.status === 'warning' && (
                            <Badge variant="secondary" className="text-xs">
                              Warning
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </div>
                      </div>
                      <p className="mb-2">{log.message}</p>
                      <div className="text-sm text-muted-foreground">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1">
                              <span className="font-medium capitalize">{key}:</span>
                              <span>{value instanceof Date ? formatDate(value) : value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            {filteredLogs.filter(l => l.status === 'success').length} Normal
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            {filteredLogs.filter(l => l.status === 'warning').length} Interventions
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            {filteredLogs.filter(l => l.status === 'error').length} Issues
          </span>
        </div>
        <div>
          {isPaused ? 'Updates Paused' : 'Streaming Live'}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-indigo-400 rounded-full"
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

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}