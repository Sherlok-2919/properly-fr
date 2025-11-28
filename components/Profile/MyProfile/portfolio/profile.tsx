"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Mail, Phone, MapPin, Building2, Calendar, Edit2, Check, Shield, Star } from "lucide-react"

export function ProfileSection() {
    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
                <p className="text-muted-foreground">Manage your account information and preferences</p>
            </div>

            {/* Profile Card */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src="/professional-man-portrait.png" />
                                <AvatarFallback className="text-2xl bg-primary/10 text-primary">JD</AvatarFallback>
                            </Avatar>
                            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-semibold">John Doe</h2>
                                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                                            <Check className="w-3 h-3 mr-1" />
                                            Verified
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground">Property Investor since 2019</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Email</p>
                                        <p className="font-medium">john.doe@email.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Phone</p>
                                        <p className="font-medium">+61 400 123 456</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Location</p>
                                        <p className="font-medium">Sydney, NSW, Australia</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Member Since</p>
                                        <p className="font-medium">March 15, 2019</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <Building2 className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-xs text-muted-foreground">Properties</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <Star className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">Premium</p>
                        <p className="text-xs text-muted-foreground">Plan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <Shield className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">92%</p>
                        <p className="text-xs text-muted-foreground">Security Score</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <Calendar className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">5y 8m</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="business">Business Details</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue="john.doe@email.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" defaultValue="+61 400 123 456" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input id="address" defaultValue="123 George Street" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" defaultValue="Sydney" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="postcode">Postcode</Label>
                                    <Input id="postcode" defaultValue="2000" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="business" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Business Details</CardTitle>
                            <CardDescription>Your business and tax information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="abn">ABN</Label>
                                    <Input id="abn" defaultValue="12 345 678 901" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tfn">TFN (Optional)</Label>
                                    <Input id="tfn" placeholder="Enter TFN" type="password" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="businessName">Business Name</Label>
                                    <Input id="businessName" defaultValue="JD Property Investments Pty Ltd" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Account Preferences</CardTitle>
                            <CardDescription>Customize your experience</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Input id="language" defaultValue="English (Australia)" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Input id="timezone" defaultValue="Australia/Sydney (GMT+11)" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Input id="currency" defaultValue="AUD ($)" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dateFormat">Date Format</Label>
                                    <Input id="dateFormat" defaultValue="DD/MM/YYYY" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
