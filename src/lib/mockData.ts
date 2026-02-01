// Current User
export const currentUser = {
  id: 'user-1',
  name: 'Christine Peterson',
  email: 'christine.peterson@techvision.com',
  company: 'TechVision Inc.',
  role: 'Facilities Manager',
  avatar: null,
};

// Projects
export const projects = [
  {
    id: 'proj-1',
    name: 'Executive Suite Renovation',
    description: 'Complete redesign of the 5th floor executive offices with modern ergonomic furniture and collaborative spaces.',
    status: 'in_progress',
    progress: 65,
    budget: 125000,
    spent: 81250,
    startDate: '2025-01-15',
    endDate: '2025-04-30',
    milestones: [
      { id: 'm1', name: 'Design Approval', completed: true, date: '2025-01-20' },
      { id: 'm2', name: 'Furniture Order', completed: true, date: '2025-02-01' },
      { id: 'm3', name: 'Delivery', completed: false, date: '2025-03-15' },
      { id: 'm4', name: 'Installation', completed: false, date: '2025-04-01' },
      { id: 'm5', name: 'Final Walkthrough', completed: false, date: '2025-04-30' },
    ],
  },
  {
    id: 'proj-2',
    name: 'Open Office Collaboration Hub',
    description: 'Creating flexible workspaces on floors 2-3 with modular furniture systems and acoustic solutions.',
    status: 'planning',
    progress: 25,
    budget: 280000,
    spent: 14000,
    startDate: '2025-02-01',
    endDate: '2025-07-31',
    milestones: [
      { id: 'm1', name: 'Space Assessment', completed: true, date: '2025-02-05' },
      { id: 'm2', name: 'Design Concepts', completed: false, date: '2025-02-28' },
      { id: 'm3', name: 'Budget Approval', completed: false, date: '2025-03-15' },
      { id: 'm4', name: 'Procurement', completed: false, date: '2025-04-30' },
      { id: 'm5', name: 'Installation Phase 1', completed: false, date: '2025-06-15' },
    ],
  },
];

// Orders
export const orders = [
  {
    id: 'ORD-2025-0142',
    projectId: 'proj-1',
    projectName: 'Executive Suite Renovation',
    status: 'in_transit',
    total: 45680,
    orderDate: '2025-01-28',
    estimatedDelivery: '2025-02-15',
    carrier: 'FedEx Freight',
    trackingNumber: '7489201847293',
    items: [
      { id: 'item-1', name: 'Herman Miller Aeron Chair', quantity: 8, price: 1495, image: null },
      { id: 'item-2', name: 'Steelcase Height-Adjustable Desk', quantity: 8, price: 2200, image: null },
      { id: 'item-3', name: 'Humanscale Monitor Arm', quantity: 16, price: 350, image: null },
    ],
    tracking: [
      { date: '2025-01-28', status: 'Order Placed', location: 'Online', completed: true },
      { date: '2025-01-29', status: 'Processing', location: 'Warehouse - Chicago, IL', completed: true },
      { date: '2025-01-30', status: 'Shipped', location: 'Chicago, IL', completed: true },
      { date: '2025-02-01', status: 'In Transit', location: 'Indianapolis, IN', completed: true },
      { date: '2025-02-15', status: 'Estimated Delivery', location: 'Your Location', completed: false },
    ],
  },
  {
    id: 'ORD-2025-0138',
    projectId: 'proj-1',
    projectName: 'Executive Suite Renovation',
    status: 'delivered',
    total: 12400,
    orderDate: '2025-01-15',
    estimatedDelivery: '2025-01-25',
    carrier: 'UPS Freight',
    trackingNumber: '1Z999AA10123456784',
    items: [
      { id: 'item-4', name: 'Knoll Dividends Horizon Panels', quantity: 12, price: 850, image: null },
      { id: 'item-5', name: 'Knoll Power Modules', quantity: 12, price: 150, image: null },
    ],
    tracking: [
      { date: '2025-01-15', status: 'Order Placed', location: 'Online', completed: true },
      { date: '2025-01-16', status: 'Processing', location: 'Warehouse - Grand Rapids, MI', completed: true },
      { date: '2025-01-18', status: 'Shipped', location: 'Grand Rapids, MI', completed: true },
      { date: '2025-01-22', status: 'In Transit', location: 'Columbus, OH', completed: true },
      { date: '2025-01-25', status: 'Delivered', location: 'Your Location', completed: true },
    ],
  },
  {
    id: 'ORD-2025-0155',
    projectId: 'proj-2',
    projectName: 'Open Office Collaboration Hub',
    status: 'processing',
    total: 8750,
    orderDate: '2025-01-30',
    estimatedDelivery: '2025-02-28',
    carrier: 'TBD',
    trackingNumber: null,
    items: [
      { id: 'item-6', name: 'Acoustic Panel System', quantity: 25, price: 350, image: null },
    ],
    tracking: [
      { date: '2025-01-30', status: 'Order Placed', location: 'Online', completed: true },
      { date: '2025-01-31', status: 'Processing', location: 'Pending Confirmation', completed: false },
    ],
  },
];

// Product Images from Unsplash (high-quality furniture photography)
export const productImages = {
  aeron: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80',
  desk: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
  knollChair: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
  table: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  monitorArm: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80',
  panels: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  pod: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
  gesture: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
};

// Products
export const products = [
  {
    id: 'prod-1',
    name: 'Aeron Chair',
    manufacturer: 'Herman Miller',
    category: 'Seating',
    description: 'The iconic Aeron Chair is as comfortable and easy to use as it is beautiful. Its innovative design and powerful ergonomic support make it perfect for any office environment.',
    price: 1495,
    leadTime: '2-3 weeks',
    stock: 'in_stock',
    warranty: '12 years',
    sustainability: 'BIFMA Certified, 90% recyclable materials',
    features: ['Adjustable lumbar support', 'Tilt limiter', 'Adjustable arms', '3 sizes available', 'Breathable mesh back'],
    dimensions: { width: 27, depth: 27, height: '41-45' },
    finishes: ['Graphite', 'Carbon', 'Mineral'],
    fabrics: ['Classic Pellicle', 'Onyx Ultra Matte'],
    image: productImages.aeron,
    images: [
      productImages.aeron,
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&q=80',
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
    ],
  },
  {
    id: 'prod-2',
    name: 'Migration SE Desk',
    manufacturer: 'Steelcase',
    category: 'Desks',
    description: 'A height-adjustable desk that seamlessly transitions from sitting to standing with the touch of a button. Features quiet motors and programmable height presets.',
    price: 2200,
    leadTime: '3-4 weeks',
    stock: 'in_stock',
    warranty: '5 years',
    sustainability: 'SCS Indoor Advantage Gold Certified',
    features: ['Electric height adjustment', '4 programmable presets', 'Quiet dual motors', 'Cable management trough', 'Anti-collision technology'],
    dimensions: { width: 60, depth: 30, height: '22.6-48.7' },
    finishes: ['White', 'Black', 'Platinum Metallic'],
    fabrics: null,
    image: productImages.desk,
    images: [
      productImages.desk,
      'https://images.unsplash.com/photo-1595500381751-d940898d0e03?w=800&q=80',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    ],
  },
  {
    id: 'prod-3',
    name: 'ReGeneration by Knoll',
    manufacturer: 'Knoll',
    category: 'Seating',
    description: 'ReGeneration rethinks ergonomic seating to adapt to your unique movements. Its flexible, elastomer back moves with you naturally.',
    price: 1045,
    leadTime: '2-3 weeks',
    stock: 'in_stock',
    warranty: '12 years',
    sustainability: 'Greenguard Gold Certified, Up to 75% recyclable',
    features: ['Flex Back technology', 'Dynamic suspension', 'Adjustable arms', 'Multiple base options'],
    dimensions: { width: 26.5, depth: 23.5, height: '36-40.5' },
    finishes: ['Dark Plastic', 'Light Plastic'],
    fabrics: ['Cato Fabric', 'Ultrasuede'],
    image: productImages.knollChair,
    images: [
      productImages.knollChair,
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80',
    ],
  },
  {
    id: 'prod-4',
    name: 'Eames Rectangular Table',
    manufacturer: 'Herman Miller',
    category: 'Tables',
    description: 'The Eames Tables bring together the refined lines and warm organic shapes that define the furniture of Charles and Ray Eames.',
    price: 3495,
    leadTime: '4-6 weeks',
    stock: 'low_stock',
    warranty: '5 years',
    sustainability: 'FSC-certified veneer options',
    features: ['Solid wood edges', 'Veneer or laminate top', 'Universal base', 'Multiple sizes available'],
    dimensions: { width: 84, depth: 36, height: 28.5 },
    finishes: ['Walnut', 'White Ash', 'Ebony'],
    fabrics: null,
    image: productImages.table,
    images: [
      productImages.table,
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80',
    ],
  },
  {
    id: 'prod-5',
    name: 'M10 Monitor Arm',
    manufacturer: 'Humanscale',
    category: 'Accessories',
    description: 'A sleek, slim-profile monitor arm that creates cleaner workspaces. The innovative design provides smooth, effortless adjustability.',
    price: 350,
    leadTime: '1-2 weeks',
    stock: 'in_stock',
    warranty: '15 years',
    sustainability: 'Made with recycled materials',
    features: ['Weight-compensating', 'Cable management', 'Quick-release VESA mount', 'Up to 20 lbs capacity'],
    dimensions: { width: 4, depth: 18, height: 14 },
    finishes: ['Silver', 'White', 'Black'],
    fabrics: null,
    image: productImages.monitorArm,
    images: [
      productImages.monitorArm,
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    ],
  },
  {
    id: 'prod-6',
    name: 'Dividends Horizon Panel',
    manufacturer: 'Knoll',
    category: 'Panels',
    description: 'A refined panel system that balances privacy with collaboration. Features integrated power and data connectivity options.',
    price: 850,
    leadTime: '4-5 weeks',
    stock: 'in_stock',
    warranty: '10 years',
    sustainability: 'BIFMA Certified',
    features: ['Frameless design', 'Acoustic options', 'Power integration', 'Magnetic accessories'],
    dimensions: { width: 48, depth: 2, height: 54 },
    finishes: ['Warm White', 'Cool Gray'],
    fabrics: ['Merit Fabric', 'Pebble Fabric'],
    image: productImages.panels,
    images: [
      productImages.panels,
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    ],
  },
  {
    id: 'prod-7',
    name: 'Acoustic Focus Room',
    manufacturer: 'Framery',
    category: 'Pods',
    description: 'A soundproof pod for focused work or private calls. Premium acoustics ensure speech privacy and concentration.',
    price: 12500,
    leadTime: '6-8 weeks',
    stock: 'made_to_order',
    warranty: '7 years',
    sustainability: 'Carbon neutral manufacturing',
    features: ['Speech privacy class A', 'Integrated ventilation', 'LED lighting', 'Power outlets', 'Occupancy sensor'],
    dimensions: { width: 40, depth: 40, height: 90 },
    finishes: ['Birch', 'Oak', 'White'],
    fabrics: ['Blazer', 'Hallingdal'],
    image: productImages.pod,
    images: [
      productImages.pod,
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
  },
  {
    id: 'prod-8',
    name: 'Gesture Chair',
    manufacturer: 'Steelcase',
    category: 'Seating',
    description: 'Designed for the way we work today, Gesture is the first chair designed to support our interactions with technology.',
    price: 1299,
    leadTime: '2-3 weeks',
    stock: 'in_stock',
    warranty: '12 years',
    sustainability: 'Level 3 Certified, Up to 90% recyclable',
    features: ['360 arm design', 'Core Equalizer', 'Seat slider', 'LiveBack technology', 'Multiple arm styles'],
    dimensions: { width: 24.75, depth: 23.75, height: '37-41.25' },
    finishes: ['Black', 'Platinum', 'Arctic White'],
    fabrics: ['Connect 3D', 'Cogent Connect'],
    image: productImages.gesture,
    images: [
      productImages.gesture,
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80',
    ],
  },
];

// Categories with counts
export const categories = [
  { name: 'Seating', count: 3 },
  { name: 'Desks', count: 1 },
  { name: 'Tables', count: 1 },
  { name: 'Panels', count: 1 },
  { name: 'Pods', count: 1 },
  { name: 'Accessories', count: 1 },
];

// Manufacturers
export const manufacturers = [
  'Herman Miller',
  'Steelcase',
  'Knoll',
  'Humanscale',
  'Framery',
];

// Upcoming Events
export const upcomingEvents = [
  {
    id: 'evt-1',
    title: 'Executive Chairs Delivery',
    type: 'delivery',
    date: '2025-02-15',
    time: '9:00 AM - 12:00 PM',
    project: 'Executive Suite Renovation',
  },
  {
    id: 'evt-2',
    title: 'Panel Installation',
    type: 'installation',
    date: '2025-02-18',
    time: '8:00 AM - 5:00 PM',
    project: 'Executive Suite Renovation',
  },
  {
    id: 'evt-3',
    title: 'Design Review Meeting',
    type: 'meeting',
    date: '2025-02-20',
    time: '2:00 PM - 3:30 PM',
    project: 'Open Office Collaboration Hub',
  },
  {
    id: 'evt-4',
    title: 'Acoustic Panels Delivery',
    type: 'delivery',
    date: '2025-02-28',
    time: '10:00 AM - 2:00 PM',
    project: 'Open Office Collaboration Hub',
  },
];

// Notifications
export const notifications = [
  {
    id: 'notif-1',
    title: 'Order Shipped',
    message: 'Your order ORD-2025-0142 has been shipped and is on its way.',
    type: 'order',
    read: false,
    createdAt: '2025-01-30T10:30:00Z',
  },
  {
    id: 'notif-2',
    title: 'Design Approved',
    message: 'The design concept for Executive Suite has been approved by stakeholders.',
    type: 'project',
    read: false,
    createdAt: '2025-01-29T14:15:00Z',
  },
  {
    id: 'notif-3',
    title: 'Meeting Reminder',
    message: 'Design review meeting scheduled for tomorrow at 2:00 PM.',
    type: 'calendar',
    read: true,
    createdAt: '2025-01-28T09:00:00Z',
  },
];

// Design Concepts
export const designConcepts = [
  {
    id: 'concept-1',
    name: 'Modern Executive Suite',
    projectId: 'proj-1',
    status: 'approved',
    version: 'v2.1',
    description: 'Contemporary design featuring neutral tones with accent colors, ergonomic furniture, and flexible meeting spaces.',
    createdAt: '2025-01-18',
    updatedAt: '2025-01-25',
    thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1280&q=80',
  },
  {
    id: 'concept-2',
    name: 'Collaborative Open Space',
    projectId: 'proj-2',
    status: 'in_review',
    version: 'v1.3',
    description: 'Open floor plan with modular workstations, acoustic zones, and informal collaboration areas.',
    createdAt: '2025-02-01',
    updatedAt: '2025-02-05',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1280&q=80',
  },
];

// Estimate Items (for budget page)
export const estimateItems = [
  { productId: 'prod-1', quantity: 8 },
  { productId: 'prod-2', quantity: 8 },
  { productId: 'prod-5', quantity: 16 },
];

// Helper Functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // Project statuses
    in_progress: 'text-kc-success',
    planning: 'text-kc-info',
    completed: 'text-kc-mist',

    // Order statuses
    processing: 'text-kc-warning',
    in_transit: 'text-kc-info',
    delivered: 'text-kc-success',
    cancelled: 'text-kc-error',

    // Stock statuses
    in_stock: 'text-kc-success',
    low_stock: 'text-kc-warning',
    out_of_stock: 'text-kc-error',
    made_to_order: 'text-kc-info',

    // Design concept statuses
    approved: 'text-kc-success',
    in_review: 'text-kc-warning',
    draft: 'text-kc-mist',
  };
  return colors[status] || 'text-kc-mist';
}

export function getStatusBg(status: string): string {
  const colors: Record<string, string> = {
    // Project statuses
    in_progress: 'bg-kc-success/10',
    planning: 'bg-kc-info/10',
    completed: 'bg-kc-mist/10',

    // Order statuses
    processing: 'bg-kc-warning/10',
    in_transit: 'bg-kc-info/10',
    delivered: 'bg-kc-success/10',
    cancelled: 'bg-kc-error/10',

    // Stock statuses
    in_stock: 'bg-kc-success/10',
    low_stock: 'bg-kc-warning/10',
    out_of_stock: 'bg-kc-error/10',
    made_to_order: 'bg-kc-info/10',

    // Design concept statuses
    approved: 'bg-kc-success/10',
    in_review: 'bg-kc-warning/10',
    draft: 'bg-kc-mist/10',
  };
  return colors[status] || 'bg-kc-mist/10';
}

export function formatStatus(status: string): string {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getEventTypeColor(type: string): string {
  const colors: Record<string, string> = {
    delivery: 'bg-kc-success/10 text-kc-success',
    installation: 'bg-kc-info/10 text-kc-info',
    meeting: 'bg-kc-warning/10 text-kc-warning',
  };
  return colors[type] || 'bg-kc-mist/10 text-kc-mist';
}

// ============================================
// SCHEDULING TYPES
// ============================================

export interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
}

export interface Installation {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  timeSlotId: string;
  contactPerson: string;
  phoneNumber: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

// ============================================
// TIMESLOTS DATA
// ============================================

export const timeSlots: TimeSlot[] = [
  {
    id: 'slot-1',
    label: '9:00 AM - 12:00 PM',
    startTime: '09:00',
    endTime: '12:00',
  },
  {
    id: 'slot-2',
    label: '1:00 PM - 5:00 PM',
    startTime: '13:00',
    endTime: '17:00',
  },
];

// ============================================
// INSTALLATIONS (MOCK DATA)
// ============================================

export const installations: Installation[] = [
  {
    id: 'inst-1',
    projectId: 'proj-1',
    projectName: 'Executive Suite Renovation',
    date: '2025-02-18',
    timeSlotId: 'slot-1',
    contactPerson: 'John Miller',
    phoneNumber: '(555) 123-4567',
    notes: 'Please check in at front desk. Freight elevator required.',
    status: 'scheduled',
    createdAt: '2025-01-25T10:00:00Z',
  },
  {
    id: 'inst-2',
    projectId: 'proj-1',
    projectName: 'Executive Suite Renovation',
    date: '2025-02-25',
    timeSlotId: 'slot-2',
    contactPerson: 'Sarah Johnson',
    phoneNumber: '(555) 987-6543',
    notes: 'Final furniture installation for conference room.',
    status: 'scheduled',
    createdAt: '2025-01-28T14:30:00Z',
  },
  {
    id: 'inst-3',
    projectId: 'proj-2',
    projectName: 'Open Office Collaboration Hub',
    date: '2025-03-05',
    timeSlotId: 'slot-1',
    contactPerson: 'Mike Davis',
    phoneNumber: '(555) 456-7890',
    notes: 'Acoustic panel installation - floors 2-3.',
    status: 'scheduled',
    createdAt: '2025-02-01T09:15:00Z',
  },
];

// ============================================
// SCHEDULING HELPER FUNCTIONS
// ============================================

export function getInstallationStatusColor(status: string): string {
  const colors: Record<string, string> = {
    scheduled: 'bg-kc-info/10 text-kc-info',
    completed: 'bg-kc-success/10 text-kc-success',
    cancelled: 'bg-kc-error/10 text-kc-error',
  };
  return colors[status] || 'bg-kc-mist/10 text-kc-mist';
}

export function getTimeSlotLabel(timeSlotId: string): string {
  const slot = timeSlots.find(s => s.id === timeSlotId);
  return slot?.label || 'Unknown';
}
