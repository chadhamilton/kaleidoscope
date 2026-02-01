'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  ShoppingBag,
  Palette,
  Grid3X3,
  Calculator,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import Logo from './Logo';

const mainNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Orders', href: '/orders', icon: Package },
  { name: 'Products', href: '/products', icon: ShoppingBag },
];

const designToolsItems = [
  { name: 'Design Planner', href: '/design-planner', icon: Palette },
  { name: 'Space Planner', href: '/space-planner', icon: Grid3X3 },
];

const bottomNavItems = [
  { name: 'Budget Estimator', href: '/budget', icon: Calculator },
  { name: 'Support', href: '/support', icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [designToolsOpen, setDesignToolsOpen] = useState(true);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const NavLink = ({ item }: { item: { name: string; href: string; icon: React.ComponentType<{ className?: string }> } }) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
          active
            ? 'bg-kc-slate text-white'
            : 'text-kc-steel hover:bg-kc-cloud/50 hover:text-kc-slate'
        }`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{item.name}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-kc-cloud h-screen flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-kc-cloud">
        <Link href="/dashboard">
          <Logo size="md" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Main Nav */}
        {mainNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}

        {/* Design Tools Section */}
        <div className="pt-4">
          <button
            onClick={() => setDesignToolsOpen(!designToolsOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-kc-mist uppercase tracking-wider"
          >
            <span>Design Tools</span>
            {designToolsOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {designToolsOpen && (
            <div className="mt-1 space-y-1">
              {designToolsItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Nav */}
        <div className="pt-4 border-t border-kc-cloud mt-4">
          {bottomNavItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-kc-cloud">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-kc-slate rounded-full flex items-center justify-center text-white font-medium">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-kc-slate truncate">{currentUser.name}</p>
            <p className="text-sm text-kc-mist truncate">{currentUser.role}</p>
          </div>
          <Link
            href="/login"
            className="p-2 text-kc-mist hover:text-kc-error hover:bg-kc-error/10 rounded-lg transition-colors"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
