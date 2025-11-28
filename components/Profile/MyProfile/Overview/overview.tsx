"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Building2,
    TrendingUp,
    DollarSign,
    Percent,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    FileText,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Clock,
} from "lucide-react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts"

// ... existing code (data arrays remain the same) ...
const portfolioData = [
    { month: "Jan", value: 1250000 },
    { month: "Feb", value: 1280000 },
    { month: "Mar", value: 1320000 },
    { month: "Apr", value: 1350000 },
    { month: "May", value: 1420000 },
    { month: "Jun", value: 1480000 },
    { month: "Jul", value: 1520000 },
    { month: "Aug", value: 1580000 },
]

const incomeExpenseData = [
    { month: "Jan", income: 8500, expense: 3200 },
    { month: "Feb", income: 8500, expense: 2800 },
    { month: "Mar", income: 8500, expense: 4100 },
    { month: "Apr", income: 8700, expense: 2900 },
    { month: "May", income: 8700, expense: 3500 },
    { month: "Jun", income: 8700, expense: 2600 },
]

const propertyDistribution = [
    { name: "Residential", value: 65 },
    { name: "Commercial", value: 25 },
    { name: "Industrial", value: 10 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"]

export function OverviewSection() {
    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header - Stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">Dashboard Overview</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Welcome back, John. Here's your portfolio summary.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                        <FileText className="w-4 h-4 mr-2" />
                        <span className="hidden xs:inline">Generate</span> Report
                    </Button>
                    <Button size="sm" className="flex-1 sm:flex-none">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Property
                    </Button>
                </div>
            </div>

            {/* Stats Grid - 2 cols on mobile, 4 on lg */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard
                    title="Total Portfolio Value"
                    value="$1,580,000"
                    change="+12.4%"
                    trend="up"
                    icon={Building2}
                    description="3 properties"
                />
                <StatCard
                    title="Net Equity"
                    value="$892,000"
                    change="+8.2%"
                    trend="up"
                    icon={DollarSign}
                    description="56.5% equity ratio"
                />
                <StatCard
                    title="Monthly Income"
                    value="$8,700"
                    change="+2.3%"
                    trend="up"
                    icon={TrendingUp}
                    description="$7,100 net"
                />
                <StatCard
                    title="Average Yield"
                    value="6.8%"
                    change="-0.2%"
                    trend="down"
                    icon={Percent}
                    description="All properties"
                />
            </div>

            {/* Charts Row - Stack on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Portfolio Growth Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                                <CardTitle className="text-base font-semibold">Portfolio Growth</CardTitle>
                                <CardDescription>Total portfolio value over time</CardDescription>
                            </div>
                            <div className="flex gap-1 overflow-x-auto pb-1">
                                {["1M", "3M", "6M", "1Y", "All"].map((period) => (
                                    <Button
                                        key={period}
                                        variant={period === "6M" ? "secondary" : "ghost"}
                                        size="sm"
                                        className="h-7 px-2 text-xs flex-shrink-0"
                                    >
                                        {period}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] sm:h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={portfolioData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: "#6b7280" }}
                                        tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                                        width={50}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        }}
                                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Property Distribution */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">Property Distribution</CardTitle>
                        <CardDescription>By property type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[160px] sm:h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={propertyDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {propertyDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
                            {propertyDistribution.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                    <span className="text-xs sm:text-sm text-muted-foreground">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Income vs Expenses & Tasks - Stack on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Income vs Expenses */}
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                                <CardTitle className="text-base font-semibold">Income vs Expenses</CardTitle>
                                <CardDescription>Monthly comparison</CardDescription>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
                                    <span className="text-xs sm:text-sm text-muted-foreground">Income</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500" />
                                    <span className="text-xs sm:text-sm text-muted-foreground">Expenses</span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[180px] sm:h-[240px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={incomeExpenseData} barGap={4}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: "#6b7280" }}
                                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                        width={40}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        }}
                                        formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                                    />
                                    <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Tasks & Reminders */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-semibold">Tasks & Reminders</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                                4 pending
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3">
                        <TaskItem
                            title="Tax Return Due"
                            description="FY 2024 submission deadline"
                            date="Dec 15, 2024"
                            status="urgent"
                        />
                        <TaskItem
                            title="Insurance Renewal"
                            description="123 Main St property"
                            date="Dec 28, 2024"
                            status="pending"
                        />
                        <TaskItem
                            title="Rent Collection"
                            description="456 Oak Ave - overdue"
                            date="Nov 15, 2024"
                            status="overdue"
                        />
                        <TaskItem
                            title="Property Inspection"
                            description="789 Pine Rd scheduled"
                            date="Nov 20, 2024"
                            status="completed"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Properties List */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold">Your Properties</CardTitle>
                            <CardDescription>Quick overview of your portfolio</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <PropertyCard
                            address="123 Main Street"
                            suburb="Sydney, NSW 2000"
                            type="Residential"
                            value="$680,000"
                            yield="5.8%"
                            equity={62}
                            status="active"
                        />
                        <PropertyCard
                            address="456 Oak Avenue"
                            suburb="Melbourne, VIC 3000"
                            type="Residential"
                            value="$520,000"
                            yield="6.2%"
                            equity={48}
                            status="active"
                        />
                        <PropertyCard
                            address="789 Business Park"
                            suburb="Brisbane, QLD 4000"
                            type="Commercial"
                            value="$380,000"
                            yield="8.4%"
                            equity={58}
                            status="active"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StatCard({
    title,
    value,
    change,
    trend,
    icon: Icon,
    description,
}: {
    title: string
    value: string
    change: string
    trend: "up" | "down"
    icon: React.ElementType
    description: string
}) {
    return (
        <Card>
            <CardContent className="p-3 sm:p-5">
                <div className="flex items-start justify-between">
                    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{title}</p>
                        <p className="text-lg sm:text-2xl font-bold">{value}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <Badge
                                variant="secondary"
                                className={
                                    trend === "up"
                                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-xs"
                                        : "bg-rose-50 text-rose-700 hover:bg-rose-50 text-xs"
                                }
                            >
                                {trend === "up" ? (
                                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                                ) : (
                                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                                )}
                                {change}
                            </Badge>
                            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">{description}</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ml-2">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function TaskItem({
    title,
    description,
    date,
    status,
}: {
    title: string
    description: string
    date: string
    status: "urgent" | "pending" | "overdue" | "completed"
}) {
    const statusConfig = {
        urgent: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" },
        pending: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
        overdue: { icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50" },
        completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${config.color}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate">{title}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{description}</p>
                <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{date}</span>
                </div>
            </div>
        </div>
    )
}

function PropertyCard({
    address,
    suburb,
    type,
    value,
    yield: propertyYield,
    equity,
}: {
    address: string
    suburb: string
    type: string
    value: string
    yield: string
    equity: number
    status: string
}) {
    return (
        <div className="p-3 sm:p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <Badge variant="secondary" className="text-[10px] sm:text-xs">
                    {type}
                </Badge>
            </div>
            <h4 className="font-semibold text-xs sm:text-sm group-hover:text-primary transition-colors">{address}</h4>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">{suburb}</p>
            <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs text-muted-foreground">Value</span>
                    <span className="text-xs sm:text-sm font-semibold">{value}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs text-muted-foreground">Yield</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-600">{propertyYield}</span>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] sm:text-xs text-muted-foreground">Equity</span>
                        <span className="text-[10px] sm:text-xs font-medium">{equity}%</span>
                    </div>
                    <Progress value={equity} className="h-1 sm:h-1.5" />
                </div>
            </div>
        </div>
    )
}
