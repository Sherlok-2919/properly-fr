"use client";

import React, { useState } from 'react';
import { Menu, Copy, HelpCircle, Bell, ChevronDown, LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { logout } from '@/app/actions/auth';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopBarProps {
  onMenuClick?: () => void;
  userName?: string;
  userRole?: string;
  userEmail?: string;
  uniqueId?: string;
  notificationCount?: number;
}

const TopBar: React.FC<TopBarProps> = ({
  onMenuClick,
  userName = 'John Doe',
  userRole = 'Property Investor',
  userEmail = 'john.doe@email.com',
  uniqueId = 'ID-0000',
  notificationCount = 3,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const displayUniqueId = `Unique ID : ${uniqueId}`;
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueId);
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-gray-600" />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">{displayUniqueId}</span>
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label="Copy ID"
          >
            <Copy size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Help Button */}
        <Link href="/dashboard/tickets">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle size={20} className="text-gray-600" />
          </button>
        </Link>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-900">Notifications</p>
                  <button className="text-xs text-blue-600 hover:text-blue-700">Mark all as read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                    <p className="text-sm font-medium text-gray-900">New Property Alert</p>
                    <p className="text-xs text-gray-500 mt-1">A new property matching your criteria in Sydney has been listed.</p>
                    <p className="text-xs text-gray-400 mt-2">2 mins ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                    <p className="text-sm font-medium text-gray-900">Subscription Updated</p>
                    <p className="text-xs text-gray-500 mt-1">Your premium subscription has been successfully renewed.</p>
                    <p className="text-xs text-gray-400 mt-2">1 day ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-900">Security Alert</p>
                    <p className="text-xs text-gray-500 mt-1">New login detected from a new device.</p>
                    <p className="text-xs text-gray-400 mt-2">2 days ago</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <Link href="/dashboard/notifications" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1.5 transition-colors"
          >
            <Avatar className="w-9 h-9">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-left hidden lg:block">
              <div className="text-sm font-semibold text-gray-900">{userName}</div>
              <div className="text-xs text-gray-500">{userRole}</div>
            </div>
            <ChevronDown size={16} className="text-gray-400 hidden lg:block" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              {/* Backdrop for mobile */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowUserMenu(false)}
              />

              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>

                <div className="py-1">
                  <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link href="/dashboard/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                  <Link href="/dashboard/profile/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </div>

                <div className="border-t border-gray-100 mt-1 pt-1">
                  <form action={logout}>
                    <button type="submit" className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;