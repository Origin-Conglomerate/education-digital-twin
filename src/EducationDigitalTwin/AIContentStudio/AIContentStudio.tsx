import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Box,
  Camera,
  Cast,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Cloud,
  Cpu,
  Download,
  Edit,
  Eye,
  FileText,
  Film,
  Glasses,
  Globe,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Loader2,
  Maximize,
  Mic,
  Monitor,
  MoreVertical,
  Palette,
  PieChart,
  Play,
  PlayCircle,
  Plus,
  Radio,
  Rocket,
  Save,
  Send,
  Settings,
  Share2,
  Sparkles,
  Square,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  Users,
  Video,
  Volume2,
  Wand2,
  Wifi,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Content generation types
const contentTypes = [
  { id: 'image', name: 'AI Image', icon: <ImageIcon className="h-5 w-5" />, desc: 'Generate educational diagrams & illustrations', color: 'from-blue-500 to-cyan-500' },
  { id: 'video', name: 'AI Video', icon: <Video className="h-5 w-5" />, desc: 'Create animated lesson videos', color: 'from-purple-500 to-pink-500' },
  { id: 'slides', name: 'AI Slides', icon: <Layers className="h-5 w-5" />, desc: 'Design presentation slides', color: 'from-green-500 to-emerald-500' },
  { id: 'doc', name: 'Documents', icon: <FileText className="h-5 w-5" />, desc: 'Generate study materials & handouts', color: 'from-orange-500 to-amber-500' },
  { id: 'viz', name: 'Visualizations', icon: <PieChart className="h-5 w-5" />, desc: 'Interactive charts & graphs', color: 'from-indigo-500 to-blue-500' },
  { id: '3d', name: '3D Models', icon: <Box className="h-5 w-5" />, desc: 'Create 3D learning objects', color: 'from-pink-500 to-rose-500' }
];

// Generated content library
const generatedContent = [
  { id: 1, type: 'video', title: 'Photosynthesis Explained', course: 'Biology', duration: '5:42', views: 234, status: 'ready' },
  { id: 2, type: 'image', title: 'Solar System Diagram', course: 'Astronomy', views: 189, status: 'ready' },
  { id: 3, type: 'slides', title: 'World War II Timeline', course: 'History', slides: 24, views: 156, status: 'ready' },
  { id: 4, type: '3d', title: 'Human Heart Model', course: 'Anatomy', views: 312, status: 'ready' },
  { id: 5, type: 'viz', title: 'Statistical Analysis Chart', course: 'Mathematics', views: 98, status: 'processing' },
  { id: 6, type: 'doc', title: 'Physics Formula Sheet', course: 'Physics', pages: 8, views: 445, status: 'ready' }
];

// AR/VR Classrooms
const arVrClassrooms = [
  { id: 1, name: 'Virtual Science Lab', students: 24, status: 'live', type: 'vr', subject: 'Chemistry', session: '2:30 PM - 4:00 PM' },
  { id: 2, name: 'Historical Landmarks Tour', students: 18, status: 'scheduled', type: 'ar', subject: 'History', session: '4:30 PM - 5:30 PM' },
  { id: 3, name: 'Anatomy Exploration', students: 32, status: 'live', type: 'vr', subject: 'Biology', session: '1:00 PM - 2:30 PM' },
  { id: 4, name: 'Space Exploration', students: 15, status: 'scheduled', type: 'ar', subject: 'Astronomy', session: 'Tomorrow 10:00 AM' }
];

export default function AIContentStudio() {
  const [selectedType, setSelectedType] = useState(contentTypes[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [arVrDialogOpen, setArVrDialogOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getContentIcon = (type) => {
    const contentType = contentTypes.find(ct => ct.id === type);
    return contentType ? contentType.icon : <FileText className="h-5 w-5" />;
  };

  return (
    <div className="h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Content Studio
          </h1>
          <p className="text-muted-foreground">Generate AI-powered educational content & manage immersive classrooms</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={arVrDialogOpen} onOpenChange={setArVrDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
                <Glasses className="h-4 w-4" />
                AR/VR Classrooms
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Glasses className="h-6 w-6 text-purple-600" />
                  Immersive AR/VR Classrooms
                </DialogTitle>
                <DialogDescription>
                  Create and manage immersive learning experiences with AR/VR technology
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="active" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Active Sessions</TabsTrigger>
                  <TabsTrigger value="create">Create Classroom</TabsTrigger>
                  <TabsTrigger value="devices">Connected Devices</TabsTrigger>
                </TabsList>

                {/* Active Sessions */}
                <TabsContent value="active" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {arVrClassrooms.map((classroom) => (
                      <Card key={classroom.id} className="p-4 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${classroom.type === 'vr' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
                              <Glasses className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{classroom.name}</h3>
                              <p className="text-sm text-muted-foreground">{classroom.subject}</p>
                            </div>
                          </div>
                          <Badge variant={classroom.status === 'live' ? 'default' : 'secondary'}>
                            {classroom.status === 'live' ? (
                              <>
                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-1"></div>
                                Live
                              </>
                            ) : (
                              'Scheduled'
                            )}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{classroom.students} students</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {classroom.type.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{classroom.session}</span>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {classroom.status === 'live' ? (
                            <>
                              <Button size="sm" className="gap-2">
                                <Eye className="h-3 w-3" />
                                Monitor
                              </Button>
                              <Button size="sm" variant="outline" className="gap-2">
                                <Cast className="h-3 w-3" />
                                Broadcast
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="outline" className="gap-2">
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="gap-2">
                                <PlayCircle className="h-3 w-3" />
                                Start Early
                              </Button>
                            </>
                          )}
                        </div>

                        {classroom.status === 'live' && (
                          <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Student Engagement</span>
                              <span className="text-sm font-semibold">94%</span>
                            </div>
                            <Progress value={94} className="h-2" />
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>

                  {/* Live Metrics */}
                  <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                    <h3 className="font-semibold mb-4">Live Session Metrics</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">56</div>
                        <div className="text-sm text-muted-foreground">Active Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">2</div>
                        <div className="text-sm text-muted-foreground">Live Sessions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">92%</div>
                        <div className="text-sm text-muted-foreground">Avg Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">42</div>
                        <div className="text-sm text-muted-foreground">VR Headsets</div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Create Classroom */}
                <TabsContent value="create" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Create New Immersive Classroom</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Classroom Name</label>
                          <Input placeholder="e.g., Virtual Chemistry Lab" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subject</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="biology">Biology</SelectItem>
                              <SelectItem value="chemistry">Chemistry</SelectItem>
                              <SelectItem value="physics">Physics</SelectItem>
                              <SelectItem value="history">History</SelectItem>
                              <SelectItem value="geography">Geography</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Experience Type</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Card className="p-4 cursor-pointer hover:bg-accent transition-colors border-2 border-purple-500">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-purple-500/20 rounded-lg">
                                <Glasses className="h-6 w-6 text-purple-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold">Virtual Reality (VR)</h4>
                                <p className="text-sm text-muted-foreground">Fully immersive 3D environment</p>
                              </div>
                            </div>
                          </Card>
                          <Card className="p-4 cursor-pointer hover:bg-accent transition-colors border-2">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-blue-500/20 rounded-lg">
                                <Monitor className="h-6 w-6 text-blue-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold">Augmented Reality (AR)</h4>
                                <p className="text-sm text-muted-foreground">Overlay digital content on real world</p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Environment Template</label>
                        <div className="grid md:grid-cols-3 gap-3">
                          {[
                            { name: 'Science Laboratory', icon: '🧪', color: 'bg-blue-500/10' },
                            { name: 'Historical Site', icon: '🏛️', color: 'bg-amber-500/10' },
                            { name: 'Space Environment', icon: '🚀', color: 'bg-purple-500/10' },
                            { name: 'Underwater World', icon: '🌊', color: 'bg-cyan-500/10' },
                            { name: 'Anatomy Theater', icon: '🫀', color: 'bg-red-500/10' },
                            { name: 'Custom 3D Space', icon: '✨', color: 'bg-pink-500/10' }
                          ].map((template, idx) => (
                            <Card key={idx} className={`p-3 cursor-pointer hover:shadow-md transition-all ${template.color}`}>
                              <div className="text-center">
                                <div className="text-3xl mb-2">{template.icon}</div>
                                <p className="text-sm font-medium">{template.name}</p>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Max Students</label>
                          <Input type="number" placeholder="30" defaultValue="30" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Session Duration</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="45">45 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="90">1.5 hours</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Features</label>
                        <div className="grid md:grid-cols-3 gap-2">
                          {[
                            { name: 'Voice Chat', icon: <Mic className="h-4 w-4" /> },
                            { name: 'Screen Share', icon: <Monitor className="h-4 w-4" /> },
                            { name: 'Interactive Objects', icon: <Box className="h-4 w-4" /> },
                            { name: 'Whiteboard', icon: <Edit className="h-4 w-4" /> },
                            { name: 'Recording', icon: <Video className="h-4 w-4" /> },
                            { name: 'Hand Tracking', icon: <Wand2 className="h-4 w-4" /> }
                          ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-accent cursor-pointer">
                              {feature.icon}
                              <span className="text-sm">{feature.name}</span>
                              <CheckCircle className="h-4 w-4 ml-auto text-green-500" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                          <Rocket className="h-4 w-4 mr-2" />
                          Create & Launch Classroom
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Save className="h-4 w-4 mr-2" />
                          Save as Draft
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Connected Devices */}
                <TabsContent value="devices" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600">42</div>
                        <div className="text-sm text-muted-foreground">VR Headsets</div>
                        <div className="text-xs text-green-600 mt-1">38 Active</div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">28</div>
                        <div className="text-sm text-muted-foreground">AR Glasses</div>
                        <div className="text-xs text-blue-600 mt-1">22 Active</div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600">96%</div>
                        <div className="text-sm text-muted-foreground">Battery Health</div>
                        <div className="text-xs text-purple-600 mt-1">All Devices</div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-4">Device Inventory</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'VR-001', type: 'Meta Quest 3', status: 'in-use', battery: 78, student: 'Student A' },
                        { id: 'VR-002', type: 'Meta Quest 3', status: 'in-use', battery: 92, student: 'Student B' },
                        { id: 'AR-001', type: 'HoloLens 2', status: 'charging', battery: 45, student: null },
                        { id: 'VR-003', type: 'PSVR 2', status: 'in-use', battery: 67, student: 'Student C' },
                        { id: 'AR-002', type: 'Magic Leap', status: 'available', battery: 100, student: null }
                      ].map((device, idx) => (
                        <Card key={idx} className="p-3 hover:bg-accent transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${device.type.includes('Quest') || device.type.includes('PSVR') ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
                                <Glasses className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{device.id}</span>
                                  <Badge variant="outline" className="text-xs">{device.type}</Badge>
                                </div>
                                {device.student && (
                                  <p className="text-xs text-muted-foreground">Assigned to: {device.student}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${
                                  device.status === 'in-use' ? 'bg-green-500' :
                                  device.status === 'charging' ? 'bg-yellow-500' :
                                  'bg-gray-500'
                                } animate-pulse`}></div>
                                <span className="text-sm capitalize">{device.status}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Zap className="h-4 w-4" />
                                <span className="text-sm">{device.battery}%</span>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-12rem)]">
        {/* Left Sidebar - Content Type Selection */}
        <div className="col-span-3 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Content Types</h3>
            <div className="space-y-2">
              {contentTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedType.id === type.id ? `bg-gradient-to-r ${type.color} text-white` : ''
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  <div className="flex items-center gap-3">
                    {type.icon}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{type.name}</h4>
                      <p className={`text-xs ${selectedType.id === type.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {type.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generation Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Views</span>
                <span className="font-semibold">12.4K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Courses</span>
                <span className="font-semibold">18</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Center - Generation Studio */}
        <div className="col-span-6 flex flex-col gap-4">
          <Card className="flex-1 p-6 flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">AI Content Generator</h2>
              <p className="text-sm text-muted-foreground">
                Describe what you want to create, and our AI will generate it for you
              </p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Example: Create a detailed diagram showing the water cycle with labels for evaporation, condensation, precipitation, and collection...`}
                  className="min-h-32 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grade Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elementary">Elementary (K-5)</SelectItem>
                      <SelectItem value="middle">Middle School (6-8)</SelectItem>
                      <SelectItem value="high">High School (9-12)</SelectItem>
                      <SelectItem value="college">College/University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Style & Quality</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Palette className="h-4 w-4 mr-2" />
                    Professional
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Simple
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Detailed
                  </Button>
                </div>
              </div>

              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Generating {selectedType.name}...</h4>
                      <p className="text-sm text-muted-foreground">AI is creating your content</p>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </motion.div>
              )}

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-lg h-12"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                >
                  <Wand2 className="h-5 w-5 mr-2" />
                  Generate {selectedType.name}
                </Button>
                <Button variant="outline" className="h-12">
                  <Upload className="h-5 w-5" />
                </Button>
              </div>

              {generationProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-600">Content Generated Successfully!</h4>
                      <p className="text-sm text-muted-foreground">Your {selectedType.name.toLowerCase()} is ready to use</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Generated Content Library */}
        <div className="col-span-3 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Content Library</h3>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-2">
                {generatedContent.map((content) => (
                  <Card
                    key={content.id}
                    className="p-3 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        content.status === 'processing' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                      }`}>
                        {getContentIcon(content.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{content.title}</h4>
                        <p className="text-xs text-muted-foreground">{content.course}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {content.type}
                          </Badge>
                          {content.status === 'processing' ? (
                            <Badge variant="secondary" className="text-xs">
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Processing
                            </Badge>
                          ) : (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Eye className="h-3 w-3" />
                              {content.views}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {content.status === 'ready' && (
                      <div className="mt-2 flex gap-1">
                        <Button size="sm" variant="ghost" className="flex-1 h-7 text-xs">
                          <Play className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1 h-7 text-xs">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
