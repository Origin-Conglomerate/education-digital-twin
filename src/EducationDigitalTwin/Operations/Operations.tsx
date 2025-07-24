import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Cell
} from 'recharts';
import {
  Building,
  Clock,
  Calendar,
  Users,
  BookOpen,
  Bus,
  Wifi,
  BatteryFull,
  Plus,
  Lightbulb,
  AlertCircle,
  Gauge,
  MapPin,
  ClipboardList,
  Settings,
  ArrowRight,
  ChevronDown,
  ChevronUp
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

const operationsData = {
  facilityUsage: {
    rooms: [
      { name: 'Classroom A1', capacity: 30, usage: 82, status: 'active' },
      { name: 'Science Lab B2', capacity: 24, usage: 45, status: 'underused' },
      { name: 'Auditorium', capacity: 200, usage: 68, status: 'active' },
      { name: 'Computer Lab C3', capacity: 40, usage: 91, status: 'overused' },
      { name: 'Library', capacity: 50, usage: 35, status: 'underused' },
    ],
    dailyPattern: [
      { hour: '8:00', usage: 25 },
      { hour: '9:00', usage: 65 },
      { hour: '10:00', usage: 88 },
      { hour: '11:00', usage: 92 },
      { hour: '12:00', usage: 45 },
      { hour: '13:00', usage: 78 },
      { hour: '14:00', usage: 85 },
      { hour: '15:00', usage: 70 },
    ]
  },
  resources: {
    allocated: 78,
    available: 22,
    items: [
      { name: 'Projectors', total: 25, inUse: 18 },
      { name: 'Laptops', total: 120, inUse: 95 },
      { name: 'Lab Equipment', total: 45, inUse: 32 },
      { name: 'Sports Gear', total: 80, inUse: 42 },
    ]
  },
  timetable: {
    conflicts: 3,
    optimizationOpportunities: [
      'Move Math 101 to larger room',
      'Balance science lab usage',
      'Reduce gap between classes'
    ],
    utilization: 72
  },
  events: [
    { name: 'Science Fair', date: '2023-11-15', attendees: 120, resources: 'Lab equipment, projectors' },
    { name: 'Parent-Teacher Meeting', date: '2023-11-20', attendees: 200, resources: 'Classrooms, chairs' },
    { name: 'Sports Day', date: '2023-11-25', attendees: 300, resources: 'Field, sports gear' },
  ],
  transportation: {
    buses: [
      { id: 'B1', route: 'North District', students: 45, capacity: 50, onTime: 92 },
      { id: 'B2', route: 'East District', students: 38, capacity: 50, onTime: 85 },
      { id: 'B3', route: 'West District', students: 42, capacity: 50, onTime: 88 },
    ],
    lateArrivals: 2,
    efficiency: 89
  },
  aiRecommendations: [
    {
      title: 'Facility Reallocation',
      description: 'Move Art classes to underused Library space on Fridays',
      impact: 'high',
      savings: '15% space utilization'
    },
    {
      title: 'Timetable Adjustment',
      description: 'Shift PE classes to afternoon to reduce shower facility congestion',
      impact: 'medium',
      savings: '8% resource optimization'
    }
  ],
  alerts: [
    {
      type: 'maintenance',
      title: 'HVAC System',
      description: 'AC units in South Wing need servicing',
      urgency: 'high'
    },
    {
      type: 'safety',
      title: 'Fire Extinguishers',
      description: '3 units expired last month',
      urgency: 'medium'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Operations() {
  const [activeTab, setActiveTab] = useState('facilities');
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
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
            Education Operations Twin
          </h1>
          <p className="text-muted-foreground">
            AI-powered facility, resource and logistics management
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 bg-transparent gap-2 p-0 h-auto">
          <TabsTrigger value="facilities" className="py-3 data-[state=active]:bg-blue-500/20">
            <Building className="h-4 w-4 mr-2" />
            Facilities
          </TabsTrigger>
          <TabsTrigger value="resources" className="py-3 data-[state=active]:bg-purple-500/20">
            <BookOpen className="h-4 w-4 mr-2" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="timetable" className="py-3 data-[state=active]:bg-green-500/20">
            <Clock className="h-4 w-4 mr-2" />
            Timetable
          </TabsTrigger>
          <TabsTrigger value="events" className="py-3 data-[state=active]:bg-yellow-500/20">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="transport" className="py-3 data-[state=active]:bg-red-500/20">
            <Bus className="h-4 w-4 mr-2" />
            Transport
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Facilities Tab */}
        {activeTab === 'facilities' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Room Utilization */}
            <Card 
              className={`p-6 backdrop-blur-lg bg-white/5 transition-all duration-300 ${
                expandedCard === 'utilization' ? 'lg:col-span-3' : 'lg:col-span-2'
              }`}
            >
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCard('utilization')}
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-400" />
                  Room Utilization Analytics
                </h3>
                {expandedCard === 'utilization' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
              
              <div className={`${expandedCard === 'utilization' ? 'block' : 'hidden lg:block'}`}>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Daily Usage Pattern</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={operationsData.facilityUsage.dailyPattern}>
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="usage"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Room Status</h4>
                    <div className="space-y-4">
                      {operationsData.facilityUsage.rooms.map((room, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{room.name}</span>
                            <Badge 
                              variant="outline" 
                              className={
                                room.status === 'overused' ? 'bg-red-500/10 text-red-500' :
                                room.status === 'underused' ? 'bg-yellow-500/10 text-yellow-500' :
                                'bg-green-500/10 text-green-500'
                              }
                            >
                              {room.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <Progress 
                              value={room.usage} 
                              className="h-2"
                              indicatorClassName={
                                room.status === 'overused' ? 'bg-red-500' :
                                room.status === 'underused' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }
                            />
                            <span className="text-sm text-muted-foreground">
                              {room.usage}% of {room.capacity} capacity
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Recommendations */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                AI Recommendations
              </h3>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {operationsData.aiRecommendations.map((rec, index) => (
                    <Card key={index} className="p-4 bg-blue-500/5 border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                        <span className="font-semibold">{rec.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {rec.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-blue-500/10">
                          {rec.savings}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-blue-400">
                          Implement <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </Card>
                  ))}

                  {operationsData.alerts.map((alert, index) => (
                    <Card key={index} className={`p-4 ${
                      alert.urgency === 'high'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className={`h-4 w-4 ${
                          alert.urgency === 'high' ? 'text-red-400' : 'text-yellow-400'
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
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resource Allocation */}
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-400" />
                Resource Allocation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Overall Allocation</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Allocated', value: operationsData.resources.allocated },
                            { name: 'Available', value: operationsData.resources.available }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#8b5cf6" />
                          <Cell fill="#3b82f6" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-8 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                      <span className="text-sm">Allocated ({operationsData.resources.allocated}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm">Available ({operationsData.resources.available}%)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Item Utilization</h4>
                  <div className="space-y-4">
                    {operationsData.resources.items.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {item.inUse}/{item.total} in use
                          </span>
                        </div>
                        <Progress 
                          value={(item.inUse / item.total) * 100} 
                          className="h-2"
                          indicatorClassName="bg-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Resource Requests */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-green-400" />
                Pending Requests
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Projector for Room A1</span>
                    <Badge variant="outline">High Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Needed for Biology presentation on Nov 15
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Approve</Button>
                    <Button variant="outline" size="sm">Deny</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Additional Laptops</span>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Computer Science class needs 5 more units
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Approve</Button>
                    <Button variant="outline" size="sm">Deny</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Sports Equipment</span>
                    <Badge variant="outline">Low Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Basketballs needed for tournament prep
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Approve</Button>
                    <Button variant="outline" size="sm">Deny</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Timetable Tab */}
        {activeTab === 'timetable' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timetable Overview */}
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                Timetable Optimization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Current Status</h4>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-green-500/10">
                      <div className="text-2xl font-bold">
                        {operationsData.timetable.utilization}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Overall Utilization
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/10">
                      <div className="text-2xl font-bold">
                        {operationsData.timetable.conflicts}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Scheduling Conflicts
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Optimization Opportunities</h4>
                  <div className="space-y-4">
                    {operationsData.timetable.optimizationOpportunities.map((opt, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                        <div>
                          <p className="font-medium">{opt}</p>
                          <Button variant="link" size="sm" className="h-6 p-0 text-green-400">
                            View Details <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Timetable Suggestions */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                AI Suggestions
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="font-medium mb-2">Balance Science Labs</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Currently 3 labs at 90% capacity while 2 are at 40%
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-blue-500/10">
                      Potential: 15% better use
                    </Badge>
                    <Button variant="ghost" size="sm">Apply</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="font-medium mb-2">Reduce Gaps</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    32 students have more than 1 hour gaps between classes
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-purple-500/10">
                      Potential: 8% efficiency
                    </Badge>
                    <Button variant="ghost" size="sm">Apply</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="font-medium mb-2">Optimize Electives</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Music classes could be consolidated to free up 2 rooms
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-500/10">
                      Potential: 2 rooms freed
                    </Badge>
                    <Button variant="ghost" size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Events */}
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-400" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {operationsData.events.map((event, index) => (
                  <Card key={index} className="p-4 bg-yellow-500/5 border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{event.name}</span>
                      <Badge variant="outline" className="bg-yellow-500/10">
                        {event.date}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">{event.attendees} attendees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Resources: {event.resources}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Location: {index % 2 === 0 ? 'Main Hall' : 'Field'}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Manage Resources</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Event Resources */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Wifi className="h-5 w-5 text-blue-400" />
                Resource Availability
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Science Fair (Nov 15)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Projectors</span>
                      <Badge variant="outline">5/6 available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tables</span>
                      <Badge variant="outline">12/15 available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chairs</span>
                      <Badge variant="outline">45/50 available</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Sports Day (Nov 25)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Basketballs</span>
                      <Badge variant="outline">8/10 available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cones</span>
                      <Badge variant="outline">24/30 available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">First Aid Kits</span>
                      <Badge variant="outline">3/5 available</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Transport Tab */}
        {activeTab === 'transport' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bus Routes */}
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Bus className="h-5 w-5 text-red-400" />
                Transportation Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-red-500/10">
                    <div className="text-2xl font-bold">
                      {operationsData.transportation.efficiency}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      On-time Efficiency
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-500/10">
                    <div className="text-2xl font-bold">
                      {operationsData.transportation.lateArrivals}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Late Arrivals Today
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-medium mb-4">Bus Utilization</h4>
                  <div className="space-y-4">
                    {operationsData.transportation.buses.map((bus, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            Bus {bus.id} - {bus.route}
                          </span>
                          <Badge variant="outline" className="bg-green-500/10">
                            {bus.onTime}% on time
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress 
                            value={(bus.students / bus.capacity) * 100} 
                            className="h-2"
                            indicatorClassName="bg-red-500"
                          />
                          <span className="text-sm text-muted-foreground">
                            {bus.students}/{bus.capacity} students
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Route Optimization */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-purple-400" />
                Route Optimization
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="font-medium mb-2">Consolidate East Routes</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Could reduce 2 buses to 1 with minor schedule adjustments
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-purple-500/10">
                      Save $1,200/month
                    </Badge>
                    <Button variant="ghost" size="sm">View Plan</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="font-medium mb-2">Add North District Stop</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    12 students could be added to existing route
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-blue-500/10">
                      Save $400/month
                    </Badge>
                    <Button variant="ghost" size="sm">View Plan</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="font-medium mb-2">Optimize Afternoon Route</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reduce wait times by resequencing 3 stops
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-500/10">
                      Save 15 mins/day
                    </Badge>
                    <Button variant="ghost" size="sm">View Plan</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="rounded-full shadow-lg gap-2">
          <Plus className="h-4 w-4" />
          New Operation
        </Button>
      </div>
    </div>
  );
}
