import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Gauge,
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
} from '@mui/x-charts/Gauge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Thermometer,
  Droplets,
  Wind,
  Ear,
  Wifi,
  Lightbulb,
  DoorOpen,
  Users,
  AlarmClock,
  Shield,
  BatteryFull,
  AlertCircle,
  Settings,
  Zap,
  BookOpen,
  Microscope,
  Dumbbell
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock IoT data for education physical twin
const iotData = {
  campusOverview: {
    buildings: 5,
    classrooms: 42,
    labs: 12,
    onlineDevices: 287,
    energyUsage: '78.5 kWh'
  },
  environmental: {
    temperature: 22.5,
    humidity: 45,
    airQuality: 82,
    noiseLevel: 65,
    co2: 450,
    lighting: 75
  },
  classroomStatus: [
    { id: 'A101', capacity: 30, occupancy: 24, status: 'active', subject: 'Mathematics', nextClass: 'Physics (10:00)' },
    { id: 'B205', capacity: 25, occupancy: 0, status: 'available', subject: null, nextClass: 'Chemistry (11:30)' },
    { id: 'C302', capacity: 40, occupancy: 38, status: 'active', subject: 'Literature', nextClass: 'History (12:45)' },
    { id: 'D110', capacity: 20, occupancy: 0, status: 'maintenance', subject: null, nextClass: 'Computer Science (14:00)' }
  ],
  facilityUsage: [
    { name: 'Library', usage: 78, capacity: 120, peakHours: '14:00-16:00' },
    { name: 'Computer Lab', usage: 65, capacity: 30, peakHours: '10:00-12:00' },
    { name: 'Science Lab', usage: 42, capacity: 25, peakHours: '13:00-15:00' },
    { name: 'Gymnasium', usage: 35, capacity: 50, peakHours: '16:00-18:00' }
  ],
  energyConsumption: [
    { hour: '00:00', usage: 12, source: 'grid' },
    { hour: '03:00', usage: 8, source: 'grid' },
    { hour: '06:00', usage: 15, source: 'solar' },
    { hour: '09:00', usage: 42, source: 'solar' },
    { hour: '12:00', usage: 58, source: 'solar' },
    { hour: '15:00', usage: 65, source: 'grid' },
    { hour: '18:00', usage: 48, source: 'grid' },
    { hour: '21:00', usage: 32, source: 'grid' }
  ],
  alerts: [
    {
      id: 1,
      type: 'environment',
      title: 'High CO2 Levels',
      location: 'Room B205',
      severity: 'high',
      description: 'CO2 levels above 1000ppm detected. Ventilation needed.',
      timestamp: '10:45 AM'
    },
    {
      id: 2,
      type: 'equipment',
      title: 'Projector Malfunction',
      location: 'Room A101',
      severity: 'medium',
      description: 'Projector not responding to control signals.',
      timestamp: '09:30 AM'
    },
    {
      id: 3,
      type: 'security',
      title: 'Unauthorized Access',
      location: 'Science Lab 3',
      severity: 'critical',
      description: 'Access attempt outside scheduled hours.',
      timestamp: '07:15 AM'
    }
  ],
  deviceStatus: [
    { type: 'Smart Board', online: 42, offline: 3 },
    { type: 'Projector', online: 38, offline: 5 },
    { type: 'Air Purifier', online: 25, offline: 2 },
    { type: 'Security Camera', online: 68, offline: 0 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function PhysicalTwin() {
  const [activeTab, setActiveTab] = useState('environment');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate live data updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // In a real app, this would fetch new data from the API
      console.log('Refreshing IoT data...');
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

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
            Campus Physical Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Zap className="h-4 w-4 mr-2" />
              IoT Network Active
            </Badge>
            <span className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              {iotData.campusOverview.onlineDevices} devices connected
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant={autoRefresh ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? 'Live Mode' : 'Paused'}
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Campus Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <OverviewCard
          icon={<BookOpen className="h-6 w-6" />}
          title="Classrooms"
          value={iotData.campusOverview.classrooms}
          change="+2 smart rooms"
        />
        <OverviewCard
          icon={<Microscope className="h-6 w-6" />}
          title="Labs"
          value={iotData.campusOverview.labs}
          change="3 in use"
        />
        <OverviewCard
          icon={<Dumbbell className="h-6 w-6" />}
          title="Facilities"
          value={iotData.campusOverview.buildings}
          change="All operational"
        />
        <OverviewCard
          icon={<Lightbulb className="h-6 w-6" />}
          title="Energy Usage"
          value={iotData.campusOverview.energyUsage}
          change="12% solar"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="environment" className="flex gap-2">
            <Thermometer className="h-4 w-4" />
            Environment
          </TabsTrigger>
          <TabsTrigger value="spaces" className="flex gap-2">
            <DoorOpen className="h-4 w-4" />
            Spaces
          </TabsTrigger>
          <TabsTrigger value="energy" className="flex gap-2">
            <Lightbulb className="h-4 w-4" />
            Energy
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Environment Tab */}
        <TabsContent value="environment" className="space-y-6">
          {/* Environmental Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EnvironmentalMetric
              icon={<Thermometer className="h-6 w-6" />}
              title="Temperature"
              value={`${iotData.environmental.temperature}°C`}
              optimalRange="20-24°C"
              status={iotData.environmental.temperature > 24 ? 'high' :
                iotData.environmental.temperature < 20 ? 'low' : 'optimal'}
            />
            <EnvironmentalMetric
              icon={<Droplets className="h-6 w-6" />}
              title="Humidity"
              value={`${iotData.environmental.humidity}%`}
              optimalRange="40-60%"
              status={iotData.environmental.humidity > 60 ? 'high' :
                iotData.environmental.humidity < 40 ? 'low' : 'optimal'}
            />
            <EnvironmentalMetric
              icon={<Wind className="h-6 w-6" />}
              title="Air Quality"
              value={`${iotData.environmental.airQuality}/100`}
              optimalRange=">80"
              status={iotData.environmental.airQuality < 60 ? 'poor' :
                iotData.environmental.airQuality < 80 ? 'fair' : 'good'}
            />
          </div>

          {/* Detailed Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Ear className="h-5 w-5 text-yellow-400" />
                Noise Levels Monitoring
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { time: '8:00', level: 45 },
                    { time: '9:00', level: 58 },
                    { time: '10:00', level: 72 },
                    { time: '11:00', level: 65 },
                    { time: '12:00', level: 55 },
                    { time: '13:00', level: 48 },
                    { time: '14:00', level: 68 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" />
                    <YAxis label={{ value: 'dB', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="level"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-500/10">
                  Current: {iotData.environmental.noiseLevel} dB
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {iotData.environmental.noiseLevel > 70 ? 'High noise - consider action' : 'Within normal range'}
                </span>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BatteryFull className="h-5 w-5 text-green-400" />
                Device Status Overview
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={iotData.deviceStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="online"
                    >
                      {iotData.deviceStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* <div className="mt-4 grid grid-cols-2 gap-2">
                {iotData.deviceStatus.map((device, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{device.type}</span>
                    <span className="text-sm font-medium ml-auto">
                      {Math.round((device.online / (device.online + device.offline)) * 100}%
                    </span>
                  </div>
                ))}
              </div> */}
            </Card>
          </div>
        </TabsContent>

        {/* Spaces Tab */}
        <TabsContent value="spaces" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classroom Status */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DoorOpen className="h-5 w-5 text-blue-400" />
                Classroom Occupancy
              </h3>
              <div className="space-y-4">
                {iotData.classroomStatus.map((room) => (
                  <div key={room.id} className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${room.status === 'active' ? 'bg-blue-500/10' :
                        room.status === 'available' ? 'bg-green-500/10' :
                          'bg-yellow-500/10'
                      }`}>
                      <DoorOpen className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Room {room.id}</h4>
                        <Badge variant="outline">
                          {room.status === 'active' ? 'In Use' :
                            room.status === 'available' ? 'Available' : 'Maintenance'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {room.status === 'active' ? (
                          <>
                            <span>{room.subject} class</span>
                            <span className="mx-2">•</span>
                            <span>{room.occupancy}/{room.capacity} students</span>
                          </>
                        ) : (
                          <span>Next: {room.nextClass}</span>
                        )}
                      </div>
                      {room.status === 'active' && (
                        <Progress
                          value={(room.occupancy / room.capacity) * 100}
                          className="mt-2 h-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Facility Usage */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                Facility Utilization
              </h3>
              <div className="space-y-6">
                {iotData.facilityUsage.map((facility) => (
                  <div key={facility.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{facility.name}</span>
                      <span className="text-sm text-muted-foreground">
                        Peak: {facility.peakHours}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress
                          value={(facility.usage / facility.capacity) * 100}
                          className="h-2"
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {facility.usage}/{facility.capacity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Energy Tab */}
        <TabsContent value="energy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Energy Consumption */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-green-400" />
                Energy Consumption
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={iotData.energyConsumption}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="hour" />
                    <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="usage"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500/10">
                    Current: {iotData.campusOverview.energyUsage}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {iotData.energyConsumption[iotData.energyConsumption.length - 1].source === 'solar' ?
                      'Using solar energy' : 'Using grid power'}
                  </span>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </Card>

            {/* Energy Distribution */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Energy Distribution
              </h3>
              <div className="h-[250px] flex items-center justify-center">
                <GaugeContainer
                  width={200}
                  height={200}
                  series={[
                    {
                      value: 78,
                      valueMin: 0,
                      valueMax: 100,
                      innerRadius: '70%',
                      outerRadius: '100%',
                      segments: [
                        { limit: 30, color: '#10b981' },
                        { limit: 70, color: '#f59e0b' },
                        { limit: 100, color: '#ef4444' }
                      ]
                    }
                  ]}
                >
                  <GaugeReferenceArc />
                  <GaugeValueArc />
                </GaugeContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">62%</div>
                  <div className="text-sm text-muted-foreground">Classrooms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">23%</div>
                  <div className="text-sm text-muted-foreground">Labs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">15%</div>
                  <div className="text-sm text-muted-foreground">Facilities</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          {/* Alerts */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              Security Alerts
            </h3>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {iotData.alerts.map((alert) => (
                  <Card key={alert.id} className={`p-4 ${alert.severity === 'critical'
                      ? 'bg-red-500/10 border-red-500/30'
                      : alert.severity === 'high'
                        ? 'bg-orange-500/10 border-orange-500/30'
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${alert.severity === 'critical'
                          ? 'bg-red-500/20 text-red-400'
                          : alert.severity === 'high'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                        <Shield className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{alert.title}</span>
                          <Badge variant="outline">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {alert.location}
                          </span>
                          <span className="text-muted-foreground">
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SecurityMetric
              title="Cameras Active"
              value="68/68"
              status="all-active"
            />
            <SecurityMetric
              title="Access Points"
              value="12 secured"
              status="normal"
            />
            <SecurityMetric
              title="Last Incident"
              value="3 days ago"
              status="normal"
            />
          </div>
        </TabsContent>
      </Tabs>

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

function OverviewCard({ icon, title, value, change }) {
  return (
    <Card className="p-4 backdrop-blur-lg bg-white/5">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
          {icon}
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <div className="text-xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground mt-1">{change}</div>
        </div>
      </div>
    </Card>
  );
}

function EnvironmentalMetric({ icon, title, value, optimalRange, status }) {
  const statusColor = status === 'optimal' ? 'green' :
    status === 'high' ? 'red' :
      status === 'low' ? 'blue' : 'yellow';

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg bg-${statusColor}-500/10 text-${statusColor}-400`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Optimal: {optimalRange}</span>
        <Badge variant="outline" className={`bg-${statusColor}-500/10 text-${statusColor}-500`}>
          {status}
        </Badge>
      </div>
    </Card>
  );
}

function SecurityMetric({ title, value, status }) {
  const statusColor = status === 'all-active' ? 'green' :
    status === 'warning' ? 'yellow' :
      status === 'alert' ? 'red' : 'blue';

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
      <div className="text-xl font-bold mb-2">{value}</div>
      <div className={`h-1 w-full bg-${statusColor}-500/20 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-${statusColor}-500`}
          style={{
            width: status === 'all-active' ? '100%' :
              status === 'warning' ? '65%' :
                status === 'alert' ? '30%' : '100%'
          }}
        />
      </div>
    </Card>
  );
}