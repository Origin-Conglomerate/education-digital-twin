import { useState } from 'react';
import {
  AreaChart,
  Area,
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart as PieIcon,
  BarChart2,
  Clock,
  Calendar,
  BookOpen,
  Users,
  Award,
  Wallet,
  AlertCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for education finance
const financeData = {
  overview: {
    totalRevenue: 1245000,
    revenueChange: 12.5,
    totalExpenses: 987000,
    expensesChange: 8.2,
    netSurplus: 258000,
    surplusChange: 24.3,
    budgetUtilization: 82,
    financialHealth: 'Excellent'
  },
  revenueSources: [
    { name: 'Tuition Fees', value: 845000, change: 10.2, target: 900000 },
    { name: 'Government Grants', value: 250000, change: 5.5, target: 300000 },
    { name: 'Donations', value: 80000, change: 25.7, target: 75000 },
    { name: 'Research Grants', value: 70000, change: -2.1, target: 100000 }
  ],
  expenseBreakdown: [
    { name: 'Faculty Salaries', value: 520000, percent: 52.7 },
    { name: 'Facilities', value: 180000, percent: 18.2 },
    { name: 'Research', value: 120000, percent: 12.2 },
    { name: 'Administration', value: 90000, percent: 9.1 },
    { name: 'Student Services', value: 77000, percent: 7.8 }
  ],
  scholarships: [
    { name: 'Merit-based', amount: 120000, students: 45, change: 8.3 },
    { name: 'Need-based', amount: 95000, students: 38, change: 12.7 },
    { name: 'Athletic', amount: 65000, students: 22, change: 5.2 },
    { name: 'Research', amount: 45000, students: 15, change: -3.1 }
  ],
  fundraising: {
    annualGoal: 500000,
    raised: 320000,
    progress: 64,
    topCampaigns: [
      { name: 'Alumni Giving Week', amount: 125000, donors: 342 },
      { name: 'Research Endowment', amount: 85000, donors: 128 },
      { name: 'Scholarship Fund', amount: 65000, donors: 215 }
    ]
  },
  aiInsights: [
    {
      type: 'optimization',
      title: 'Cost Saving Opportunity',
      description: 'Facilities maintenance costs 18% higher than peer institutions',
      impact: 'high',
      action: 'Review vendor contracts'
    },
    {
      type: 'trend',
      title: 'Donation Trend',
      description: 'Alumni donations increased by 25% this quarter',
      impact: 'medium',
      action: 'Expand alumni outreach'
    },
    {
      type: 'alert',
      title: 'Budget Variance',
      description: 'Research grants 30% below target for Q3',
      urgency: 'high'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Finance() {
  const [timeRange, setTimeRange] = useState('currentYear');
  const [expandedSection, setExpandedSection] = useState('revenue');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
            Education Financial Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Lightbulb className="h-4 w-4 mr-2" />
              AI Financial Advisor Active
            </Badge>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fiscal Year 2023-24
            </span>
          </div>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="currentYear">Current Year</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FinancialMetricCard
          title="Total Revenue"
          value={`$${(financeData.overview.totalRevenue / 1000).toFixed(1)}k`}
          change={financeData.overview.revenueChange}
          icon={<DollarSign className="h-5 w-5 text-green-500" />}
          chartData={[
            { month: 'Jul', value: 80 },
            { month: 'Aug', value: 95 },
            { month: 'Sep', value: 110 },
            { month: 'Oct', value: 105 }
          ]}
        />
        <FinancialMetricCard
          title="Total Expenses"
          value={`$${(financeData.overview.totalExpenses / 1000).toFixed(1)}k`}
          change={financeData.overview.expensesChange}
          icon={<Wallet className="h-5 w-5 text-orange-500" />}
          chartData={[
            { month: 'Jul', value: 70 },
            { month: 'Aug', value: 85 },
            { month: 'Sep', value: 90 },
            { month: 'Oct', value: 92 }
          ]}
        />
        <FinancialMetricCard
          title="Net Surplus"
          value={`$${(financeData.overview.netSurplus / 1000).toFixed(1)}k`}
          change={financeData.overview.surplusChange}
          icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
          chartData={[
            { month: 'Jul', value: 10 },
            { month: 'Aug', value: 15 },
            { month: 'Sep', value: 20 },
            { month: 'Oct', value: 13 }
          ]}
        />
      </div>

      {/* Revenue Section */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('revenue')}
        >
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold">Revenue Analysis</h2>
          </div>
          {expandedSection === 'revenue' ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        
        {expandedSection === 'revenue' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-medium mb-4">Revenue Sources</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financeData.revenueSources}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" name="Actual" />
                    <Bar dataKey="target" fill="#94a3b8" name="Target" opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Performance vs Target</h3>
                <div className="space-y-4">
                  {financeData.revenueSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{source.name}</span>
                        <Badge variant={source.value >= source.target ? 'default' : 'destructive'}>
                          {source.change > 0 ? '+' : ''}{source.change}%
                        </Badge>
                      </div>
                      <Progress 
                        value={(source.value / source.target) * 100} 
                        className="h-2"
                        indicatorClassName={
                          source.value >= source.target 
                            ? 'bg-green-500' 
                            : 'bg-orange-500'
                        }
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${(source.value / 1000).toFixed(1)}k</span>
                        <span>${(source.target / 1000).toFixed(1)}k</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Expenses Section */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('expenses')}
        >
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold">Expense Management</h2>
          </div>
          {expandedSection === 'expenses' ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        
        {expandedSection === 'expenses' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={financeData.expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {financeData.expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-lg font-medium mb-4">Expense Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={[
                    { month: 'Jul', faculty: 120, facilities: 40, research: 30, admin: 20, services: 18 },
                    { month: 'Aug', faculty: 130, facilities: 42, research: 32, admin: 22, services: 19 },
                    { month: 'Sep', faculty: 135, facilities: 45, research: 35, admin: 23, services: 20 },
                    { month: 'Oct', faculty: 140, facilities: 48, research: 38, admin: 25, services: 20 }
                  ]}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="faculty" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Faculty Salaries" />
                    <Area type="monotone" dataKey="facilities" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Facilities" />
                    <Area type="monotone" dataKey="research" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} name="Research" />
                    <Area type="monotone" dataKey="admin" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Administration" />
                    <Area type="monotone" dataKey="services" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} name="Student Services" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Scholarships & Fundraising Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scholarships */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('scholarships')}
          >
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold">Scholarships & Financial Aid</h2>
            </div>
            {expandedSection === 'scholarships' ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
          
          {expandedSection === 'scholarships' && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-purple-500/10">
                  <div className="text-2xl font-bold">
                    ${financeData.scholarships.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Awarded
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10">
                  <div className="text-2xl font-bold">
                    {financeData.scholarships.reduce((sum, item) => sum + item.students, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Students Benefited
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {financeData.scholarships.map((scholarship, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{scholarship.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">${scholarship.amount.toLocaleString()}</span>
                        <Badge variant={scholarship.change > 0 ? 'default' : 'destructive'}>
                          {scholarship.change > 0 ? '+' : ''}{scholarship.change}%
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={scholarship.students} 
                      max={100}
                      className="h-2"
                      indicatorClassName="bg-purple-500"
                    />
                    <div className="text-sm text-muted-foreground">
                      {scholarship.students} students supported
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Fundraising */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('fundraising')}
          >
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Fundraising</h2>
            </div>
            {expandedSection === 'fundraising' ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
          
          {expandedSection === 'fundraising' && (
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Annual Goal</span>
                  <span className="font-medium">${financeData.fundraising.annualGoal.toLocaleString()}</span>
                </div>
                <Progress 
                  value={financeData.fundraising.progress} 
                  className="h-3"
                  indicatorClassName="bg-blue-500"
                />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Raised</span>
                  <span className="font-medium">${financeData.fundraising.raised.toLocaleString()}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium">Top Campaigns</h3>
              <div className="space-y-4">
                {financeData.fundraising.topCampaigns.map((campaign, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="font-bold text-blue-500">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.donors} donors
                      </div>
                    </div>
                    <div className="font-bold">
                      ${campaign.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* AI Financial Insights */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Financial Insights
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {financeData.aiInsights.map((insight, index) => (
            <Card key={index} className={`p-4 ${
              insight.impact === 'high' || insight.urgency === 'high'
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-blue-500/10 border-blue-500/30'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {insight.type === 'optimization' ? (
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                ) : insight.type === 'trend' ? (
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <h3 className="font-semibold">{insight.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {insight.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  {insight.impact ? `Impact: ${insight.impact}` : `Urgency: ${insight.urgency}`}
                </Badge>
                <Button variant="ghost" size="sm" className="text-blue-500">
                  {insight.action}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

function FinancialMetricCard({ title, value, change, icon, chartData }) {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <Badge variant={change > 0 ? 'default' : 'destructive'}>
          {change > 0 ? '+' : ''}{change}%
          {change > 0 ? (
            <ArrowUpRight className="h-3 w-3 ml-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 ml-1" />
          )}
        </Badge>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={change > 0 ? '#3b82f6' : '#ef4444'} 
              fill={change > 0 ? '#3b82f6' : '#ef4444'} 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}