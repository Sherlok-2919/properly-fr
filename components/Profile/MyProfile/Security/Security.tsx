"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Smartphone,
    Monitor,
    MapPin,
    Key,
    AlertTriangle,
    Check,
    X,
    LogOut,
    Copy,
    RefreshCw,
    Trash2,
} from "lucide-react"

const sessions = [
    {
        id: 1,
        device: "MacBook Pro",
        browser: "Chrome 119",
        location: "Sydney, Australia",
        ip: "203.45.xxx.xxx",
        time: "Active now",
        current: true,
    },
    {
        id: 2,
        device: "iPhone 15 Pro",
        browser: "Safari Mobile",
        location: "Sydney, Australia",
        ip: "203.45.xxx.xxx",
        time: "2 hours ago",
        current: false,
    },
    {
        id: 3,
        device: "Windows PC",
        browser: "Firefox 120",
        location: "Melbourne, Australia",
        ip: "110.23.xxx.xxx",
        time: "3 days ago",
        current: false,
    },
]

const loginHistory = [
    { id: 1, status: "success", location: "Sydney, Australia", device: "MacBook Pro", time: "Today, 9:30 AM" },
    { id: 2, status: "success", location: "Sydney, Australia", device: "iPhone 15 Pro", time: "Today, 7:15 AM" },
    { id: 3, status: "failed", location: "Unknown", device: "Unknown", time: "Yesterday, 11:45 PM" },
    { id: 4, status: "success", location: "Melbourne, Australia", device: "Windows PC", time: "3 days ago" },
]

const apiKeys = [
    { id: 1, name: "Production API Key", key: "pk_live_xxxxx...xxxxx", created: "Oct 15, 2024", lastUsed: "2 hours ago" },
    { id: 2, name: "Development API Key", key: "pk_test_xxxxx...xxxxx", created: "Sep 1, 2024", lastUsed: "1 week ago" },
]

import { User } from "@/lib/db"

interface SecuritySectionProps {
    user?: User | null;
}

export function SecuritySection({ user }: SecuritySectionProps) {
    const securityScore = 92

    return (
        <div className="space-y-4 sm:space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Security & Access</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Manage your account security and active sessions</p>
            </div>

            {/* Security Score - Stack on mobile */}
            <Card>
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                            <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    className="text-muted sm:hidden"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeDasharray={`${securityScore * 2.01} 201`}
                                    className="text-emerald-500 sm:hidden"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    className="text-muted hidden sm:block"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${securityScore * 2.51} 251`}
                                    className="text-emerald-500 hidden sm:block"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl sm:text-2xl font-bold">{securityScore}%</span>
                            </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-base sm:text-lg font-semibold">Security Score: Excellent</h3>
                            <p className="text-sm text-muted-foreground mb-3">Your account is well protected</p>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-xs">
                                    <Check className="w-3 h-3 mr-1" />
                                    Strong Password
                                </Badge>
                                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-xs">
                                    <Check className="w-3 h-3 mr-1" />
                                    2FA Enabled
                                </Badge>
                                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-xs">
                                    <Check className="w-3 h-3 mr-1" />
                                    Email Verified
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Add Recovery Email
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
                <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                            <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">Add an extra layer of security</CardDescription>
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-700 w-fit">Enabled</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border gap-2">
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            <div>
                                <p className="font-medium text-sm">Authenticator App</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">Google Authenticator</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 w-fit text-xs">
                            Active
                        </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border gap-2">
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            <div>
                                <p className="font-medium text-sm">SMS Backup</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">+61 400 *** 456</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 w-fit text-xs">
                            Active
                        </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-dashed gap-3">
                        <div className="flex items-center gap-3">
                            <Key className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            <div>
                                <p className="font-medium text-sm">Backup Codes</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">8 codes remaining</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                            View Codes
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
                <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <CardTitle className="text-base">Active Sessions</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">Devices currently logged in</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="text-destructive bg-transparent w-full sm:w-auto">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border gap-3"
                            >
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                        <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-medium text-sm">{session.device}</p>
                                            {session.current && (
                                                <Badge variant="secondary" className="text-[10px] sm:text-xs bg-emerald-50 text-emerald-700">
                                                    Current
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                                            <span>{session.browser}</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {session.location}
                                            </span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>{session.ip}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0">
                                    <span className="text-xs sm:text-sm text-muted-foreground">{session.time}</span>
                                    {!session.current && (
                                        <Button variant="ghost" size="sm" className="text-destructive h-8 px-2">
                                            <LogOut className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Login History */}
            <Card>
                <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-base">Login History</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Recent login attempts to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                        {loginHistory.map((login) => (
                            <div
                                key={login.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors gap-2"
                            >
                                <div className="flex items-center gap-3">
                                    {login.status === "success" ? (
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                                        </div>
                                    ) : (
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                                            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs sm:text-sm font-medium">
                                            {login.status === "success" ? "Successful login" : "Failed login attempt"}
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                                            {login.device} • {login.location}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs sm:text-sm text-muted-foreground pl-10 sm:pl-0">{login.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* API Keys */}
            <Card>
                <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <CardTitle className="text-base">API Keys</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">Manage API access for integrations</CardDescription>
                        </div>
                        <Button size="sm" className="w-full sm:w-auto">
                            <Key className="w-4 h-4 mr-2" />
                            Generate New Key
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {apiKeys.map((apiKey) => (
                            <div
                                key={apiKey.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border gap-3"
                            >
                                <div className="min-w-0">
                                    <p className="font-medium text-sm">{apiKey.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <code className="text-xs sm:text-sm bg-muted px-2 py-0.5 rounded truncate">{apiKey.key}</code>
                                        <Button variant="ghost" size="icon" className="w-6 h-6 flex-shrink-0">
                                            <Copy className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                                        Created {apiKey.created} • Last used {apiKey.lastUsed}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 justify-end">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive h-8 w-8">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
                <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Irreversible account actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-destructive/30 gap-3">
                        <div>
                            <p className="font-medium text-sm">Deactivate Account</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Temporarily disable your account</p>
                        </div>
                        <Button
                            variant="outline"
                            className="text-destructive border-destructive/50 bg-transparent w-full sm:w-auto"
                        >
                            Deactivate
                        </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-destructive/30 gap-3">
                        <div>
                            <p className="font-medium text-sm">Delete Account</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive" className="w-full sm:w-auto">
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
