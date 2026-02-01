'use client';

import { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
} from 'lucide-react';
import {
  orders,
  formatCurrency,
  formatDate,
  formatStatus,
  getStatusColor,
  getStatusBg,
} from '@/lib/mockData';

type OrderStatus = 'all' | 'processing' | 'in_transit' | 'delivered';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all');
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const statusFilters: { id: OrderStatus; label: string }[] = [
    { id: 'all', label: 'All Orders' },
    { id: 'processing', label: 'Processing' },
    { id: 'in_transit', label: 'In Transit' },
    { id: 'delivered', label: 'Delivered' },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleExpanded = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return CheckCircle2;
      case 'in_transit':
        return Truck;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
          Orders
        </h1>
        <p className="text-kc-steel mt-1">
          Track your orders and view delivery status.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-kc-cloud rounded-lg px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-kc-mist" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-sm text-kc-slate placeholder:text-kc-mist"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === filter.id
                  ? 'bg-kc-slate text-white'
                  : 'bg-white text-kc-steel hover:bg-kc-cloud/50 border border-kc-cloud'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const isExpanded = expandedOrders.includes(order.id);
          const StatusIcon = getStatusIcon(order.status);

          return (
            <div
              key={order.id}
              className="card overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Order Header */}
              <button
                onClick={() => toggleExpanded(order.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-kc-pearl/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusBg(order.status)}`}
                  >
                    <StatusIcon className={`w-6 h-6 ${getStatusColor(order.status)}`} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-kc-slate">{order.id}</h3>
                      <span
                        className={`badge text-xs ${getStatusColor(order.status)} ${getStatusBg(order.status)}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-kc-mist mt-0.5">
                      {order.projectName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="font-medium text-kc-slate">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-sm text-kc-mist">
                      Ordered {formatDate(order.orderDate)}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-kc-mist" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-kc-mist" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-kc-cloud">
                  {/* Tracking Info */}
                  {order.carrier && (
                    <div className="p-5 bg-kc-pearl/30 border-b border-kc-cloud">
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <Truck className="w-4 h-4 text-kc-steel" />
                        <span className="text-kc-steel">
                          {order.carrier}
                          {order.trackingNumber && (
                            <span className="ml-2 font-mono text-kc-mist">
                              #{order.trackingNumber}
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Tracking Timeline */}
                      <div className="space-y-0">
                        {order.tracking.map((event, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  event.completed ? 'bg-kc-success' : 'bg-kc-cloud'
                                }`}
                              />
                              {idx < order.tracking.length - 1 && (
                                <div
                                  className={`w-0.5 h-12 ${
                                    event.completed ? 'bg-kc-success/30' : 'bg-kc-cloud'
                                  }`}
                                />
                              )}
                            </div>
                            <div className="pb-4">
                              <p
                                className={`font-medium text-sm ${
                                  event.completed ? 'text-kc-slate' : 'text-kc-mist'
                                }`}
                              >
                                {event.status}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-kc-mist mt-0.5">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                                <span>•</span>
                                <span>{formatDate(event.date)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="p-5">
                    <h4 className="text-sm font-medium text-kc-slate mb-4">
                      Order Items
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-kc-pearl/50 rounded-lg"
                        >
                          <div className="w-12 h-12 bg-kc-cloud/50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-6 h-6 text-kc-mist" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-kc-slate text-sm truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-kc-mist">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium text-kc-slate text-sm">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-kc-cloud">
                      <span className="font-medium text-kc-steel">Total</span>
                      <span className="text-lg font-bold text-kc-slate">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="card p-12 text-center">
          <Package className="w-12 h-12 text-kc-mist mx-auto mb-4" />
          <p className="text-kc-mist">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
