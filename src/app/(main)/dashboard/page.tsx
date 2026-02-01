'use client';

import Link from 'next/link';
import {
  FolderKanban,
  Package,
  Calendar,
  DollarSign,
  ShoppingBag,
  Calculator,
  Grid3X3,
  MessageCircle,
  ArrowRight,
  Truck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  currentUser,
  projects,
  orders,
  upcomingEvents,
  formatCurrency,
  formatDate,
  formatStatus,
  getStatusColor,
  getStatusBg,
  getEventTypeColor,
} from '@/lib/mockData';

export default function DashboardPage() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const activeProjects = projects.filter(
    (p) => p.status === 'in_progress' || p.status === 'planning'
  ).length;

  const pendingOrders = orders.filter(
    (o) => o.status === 'processing' || o.status === 'in_transit'
  ).length;

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

  const stats = [
    {
      label: 'Active Projects',
      value: activeProjects,
      icon: FolderKanban,
      color: 'bg-kc-success/10 text-kc-success',
    },
    {
      label: 'Pending Orders',
      value: pendingOrders,
      icon: Package,
      color: 'bg-kc-info/10 text-kc-info',
    },
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length,
      icon: Calendar,
      color: 'bg-kc-warning/10 text-kc-warning',
    },
    {
      label: 'Total Budget',
      value: formatCurrency(totalBudget),
      icon: DollarSign,
      color: 'bg-kc-slate/10 text-kc-slate',
    },
  ];

  const quickActions = [
    { name: 'Browse Products', href: '/products', icon: ShoppingBag },
    { name: 'Create Estimate', href: '/budget', icon: Calculator },
    { name: 'Plan Space', href: '/space-planner', icon: Grid3X3 },
    { name: 'Get Support', href: '/support', icon: MessageCircle },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
          {getGreeting()}, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="text-kc-steel mt-1">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`card p-5 animate-slide-up animate-delay-${(index + 1) * 100}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-kc-mist">{stat.label}</p>
                  <p className="text-2xl font-bold text-kc-slate mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold text-kc-slate">
              Active Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-kc-steel hover:text-kc-slate flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 bg-kc-pearl/50 rounded-xl border border-kc-cloud/50 hover:border-kc-cloud hover:bg-kc-pearl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-kc-slate">{project.name}</h3>
                    <p className="text-sm text-kc-mist mt-0.5 line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  <span
                    className={`badge text-xs ${getStatusColor(project.status)} ${getStatusBg(project.status)}`}
                  >
                    {formatStatus(project.status)}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-kc-mist">Progress</span>
                    <span className="font-medium text-kc-slate">{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-kc-mist">Budget</span>
                  <span className="font-medium text-kc-slate">
                    {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold text-kc-slate">
              Recent Orders
            </h2>
            <Link
              href="/orders"
              className="text-sm text-kc-steel hover:text-kc-slate flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 p-3 bg-kc-pearl/50 rounded-lg hover:bg-kc-pearl transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusBg(order.status)}`}
                >
                  {order.status === 'delivered' ? (
                    <CheckCircle2 className={`w-5 h-5 ${getStatusColor(order.status)}`} />
                  ) : order.status === 'in_transit' ? (
                    <Truck className={`w-5 h-5 ${getStatusColor(order.status)}`} />
                  ) : (
                    <Clock className={`w-5 h-5 ${getStatusColor(order.status)}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-kc-slate text-sm truncate">
                    {order.id}
                  </p>
                  <p className="text-xs text-kc-mist truncate">
                    {formatStatus(order.status)}
                  </p>
                </div>
                <p className="font-medium text-kc-slate text-sm">
                  {formatCurrency(order.total)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold text-kc-slate">
              Upcoming Events
            </h2>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-4 bg-kc-pearl/50 rounded-lg hover:bg-kc-pearl transition-colors"
              >
                <div className="text-center min-w-[50px]">
                  <p className="text-2xl font-bold text-kc-slate">
                    {new Date(event.date).getDate()}
                  </p>
                  <p className="text-xs text-kc-mist uppercase">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge text-xs capitalize ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="font-medium text-kc-slate">{event.title}</p>
                  <p className="text-sm text-kc-mist">{event.time}</p>
                </div>
                <p className="text-sm text-kc-steel hidden md:block">
                  {event.project}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="font-heading text-lg font-semibold text-kc-slate mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 bg-kc-pearl/50 rounded-xl border border-kc-cloud/50 hover:border-kc-steel hover:bg-kc-pearl transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-kc-slate/5 flex items-center justify-center group-hover:bg-kc-slate group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-kc-slate text-center">
                    {action.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
