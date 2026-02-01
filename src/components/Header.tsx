'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  Bell,
  Settings,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react';
import { currentUser, notifications } from '@/lib/mockData';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-kc-cloud flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-kc-steel hover:bg-kc-cloud/50 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-kc-pearl border border-kc-cloud rounded-lg px-3 py-2 w-80">
          <Search className="w-4 h-4 text-kc-mist" />
          <input
            type="text"
            placeholder="Search projects, orders, products..."
            className="bg-transparent border-none outline-none flex-1 text-sm text-kc-slate placeholder:text-kc-mist"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 text-kc-steel hover:bg-kc-cloud/50 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-kc-error text-white text-xs flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-kc-cloud z-20 overflow-hidden">
                <div className="p-4 border-b border-kc-cloud">
                  <h3 className="font-heading font-semibold text-kc-slate">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-kc-cloud last:border-0 hover:bg-kc-pearl/50 cursor-pointer ${
                        !notification.read ? 'bg-kc-pearl/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-kc-success rounded-full mt-2 flex-shrink-0" />
                        )}
                        <div className={notification.read ? 'ml-5' : ''}>
                          <p className="font-medium text-kc-slate text-sm">
                            {notification.title}
                          </p>
                          <p className="text-kc-mist text-sm mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-kc-cloud">
                  <button className="w-full text-center text-sm text-kc-steel hover:text-kc-slate font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Settings */}
        <Link
          href="#"
          className="p-2 text-kc-steel hover:bg-kc-cloud/50 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
        </Link>

        {/* User Menu */}
        <div className="relative ml-2">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 hover:bg-kc-cloud/50 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-kc-slate rounded-full flex items-center justify-center text-white text-sm font-medium">
              {currentUser.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <ChevronDown className="w-4 h-4 text-kc-mist hidden sm:block" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-kc-cloud z-20 overflow-hidden">
                <div className="p-4 border-b border-kc-cloud">
                  <p className="font-medium text-kc-slate">{currentUser.name}</p>
                  <p className="text-sm text-kc-mist">{currentUser.email}</p>
                </div>
                <div className="p-2">
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-kc-steel hover:bg-kc-cloud/50 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-kc-steel hover:bg-kc-cloud/50 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </Link>
                  <div className="my-2 border-t border-kc-cloud" />
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-3 py-2 text-kc-error hover:bg-kc-error/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Log out</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
