'use client';

import { useState } from 'react';
import {
  Move,
  RotateCcw,
  Trash2,
  Wand2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Info,
  ZoomIn,
  ZoomOut,
  Maximize,
  Grid,
} from 'lucide-react';
import { products, formatCurrency } from '@/lib/mockData';

interface FurnitureItem {
  id: string;
  productId: string;
  x: number;
  y: number;
  rotation: number;
}

interface ComplianceCheck {
  id: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
}

export default function SpacePlannerPage() {
  const [placedItems, setPlacedItems] = useState<FurnitureItem[]>([
    { id: 'placed-1', productId: 'prod-1', x: 100, y: 100, rotation: 0 },
    { id: 'placed-2', productId: 'prod-2', x: 300, y: 150, rotation: 0 },
  ]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showComplianceResults, setShowComplianceResults] = useState(false);
  const [complianceResults, setComplianceResults] = useState<ComplianceCheck[]>([]);
  const [zoom, setZoom] = useState(1);

  const furnitureCategories = [
    { name: 'Chairs', items: products.filter((p) => p.category === 'Seating') },
    { name: 'Desks', items: products.filter((p) => p.category === 'Desks') },
    { name: 'Tables', items: products.filter((p) => p.category === 'Tables') },
    { name: 'Other', items: products.filter((p) => !['Seating', 'Desks', 'Tables'].includes(p.category)) },
  ];

  const handleGenerateLayout = () => {
    const newItems: FurnitureItem[] = [
      { id: 'gen-1', productId: 'prod-1', x: 50, y: 80, rotation: 0 },
      { id: 'gen-2', productId: 'prod-1', x: 50, y: 180, rotation: 0 },
      { id: 'gen-3', productId: 'prod-1', x: 50, y: 280, rotation: 0 },
      { id: 'gen-4', productId: 'prod-2', x: 150, y: 80, rotation: 0 },
      { id: 'gen-5', productId: 'prod-2', x: 150, y: 180, rotation: 0 },
      { id: 'gen-6', productId: 'prod-2', x: 150, y: 280, rotation: 0 },
      { id: 'gen-7', productId: 'prod-4', x: 350, y: 130, rotation: 0 },
    ];
    setPlacedItems(newItems);
  };

  const handleCheckCompliance = () => {
    const results: ComplianceCheck[] = [
      {
        id: 'ada-1',
        title: 'ADA Aisle Width',
        status: 'pass',
        message: 'All aisles meet the minimum 36" width requirement.',
      },
      {
        id: 'ada-2',
        title: 'Wheelchair Clearance',
        status: 'pass',
        message: '60" turning radius clearance available in main areas.',
      },
      {
        id: 'flow-1',
        title: 'Traffic Flow',
        status: 'warning',
        message: 'Consider additional clearance near the entrance area.',
      },
      {
        id: 'egress-1',
        title: 'Emergency Egress',
        status: 'pass',
        message: 'Clear path to exits maintained.',
      },
      {
        id: 'density-1',
        title: 'Space Density',
        status: 'pass',
        message: 'Occupancy within recommended limits.',
      },
    ];
    setComplianceResults(results);
    setShowComplianceResults(true);
  };

  const removeItem = (itemId: string) => {
    setPlacedItems((prev) => prev.filter((item) => item.id !== itemId));
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    }
  };

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
            Space Planner
          </h1>
          <p className="text-kc-steel mt-1">
            Design your floor plan and check for compliance issues.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleGenerateLayout}
            className="btn-secondary flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Generate AI Layout
          </button>
          <button
            onClick={handleCheckCompliance}
            className="btn-primary flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Check Compliance
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Furniture Palette */}
        <div className="lg:col-span-1">
          <div className="card p-4 sticky top-6">
            <h2 className="font-heading font-semibold text-kc-slate mb-4">
              Furniture Palette
            </h2>

            <div className="space-y-4">
              {furnitureCategories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-xs font-medium text-kc-mist uppercase tracking-wider mb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-2">
                    {category.items.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 bg-kc-pearl/50 rounded-lg cursor-grab hover:bg-kc-pearl transition-colors"
                        draggable
                      >
                        <div className="w-10 h-10 bg-kc-cloud/50 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">
                            {item.category === 'Seating' ? '🪑' : item.category === 'Desks' ? '🖥️' : '📦'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-kc-slate truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-kc-mist">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-kc-cloud">
              <p className="text-xs text-kc-mist">
                Drag items onto the floor plan or click to add.
              </p>
            </div>
          </div>
        </div>

        {/* Floor Plan Canvas */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            {/* Canvas Toolbar */}
            <div className="flex items-center justify-between p-3 border-b border-kc-cloud bg-kc-pearl/30">
              <div className="flex items-center gap-2">
                <button className="p-2 text-kc-mist hover:text-kc-slate hover:bg-kc-cloud/50 rounded transition-colors">
                  <Move className="w-4 h-4" />
                </button>
                <button className="p-2 text-kc-mist hover:text-kc-slate hover:bg-kc-cloud/50 rounded transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button className="p-2 text-kc-mist hover:text-kc-slate hover:bg-kc-cloud/50 rounded transition-colors">
                  <Grid className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-kc-cloud mx-1" />
                <button
                  onClick={() => selectedItemId && removeItem(selectedItemId)}
                  disabled={!selectedItemId}
                  className="p-2 text-kc-mist hover:text-kc-error hover:bg-kc-error/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="p-2 text-kc-mist hover:text-kc-slate hover:bg-kc-cloud/50 rounded transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs text-kc-mist w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="p-2 text-kc-mist hover:text-kc-slate hover:bg-kc-cloud/50 rounded transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className="p-2 text-kc-mist hover:text-kc-slate hover:bg-kc-cloud/50 rounded transition-colors">
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div
              className="relative bg-white overflow-auto"
              style={{ height: '500px' }}
            >
              {/* Grid Background */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'linear-gradient(#e8eef3 1px, transparent 1px), linear-gradient(90deg, #e8eef3 1px, transparent 1px)',
                  backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                }}
              />

              {/* Floor Plan Outline */}
              <div
                className="absolute border-2 border-kc-slate bg-kc-pearl/20"
                style={{
                  left: 20 * zoom,
                  top: 20 * zoom,
                  width: 500 * zoom,
                  height: 400 * zoom,
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                }}
              >
                {/* Placed Items */}
                {placedItems.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`absolute cursor-pointer transition-all ${
                        selectedItemId === item.id
                          ? 'ring-2 ring-kc-success ring-offset-2'
                          : 'hover:ring-2 hover:ring-kc-mist hover:ring-offset-2'
                      }`}
                      style={{
                        left: item.x,
                        top: item.y,
                        transform: `rotate(${item.rotation}deg)`,
                      }}
                    >
                      <div className="w-16 h-16 bg-kc-slate/10 border border-kc-slate/30 rounded flex items-center justify-center">
                        <span className="text-2xl">
                          {product.category === 'Seating' ? '🪑' : product.category === 'Desks' ? '🖥️' : product.category === 'Tables' ? '📋' : '📦'}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Door */}
                <div
                  className="absolute bg-kc-warning/20 border-2 border-kc-warning"
                  style={{ left: 220, top: 380, width: 60, height: 20 }}
                >
                  <span className="text-[8px] text-kc-warning font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    DOOR
                  </span>
                </div>

                {/* Window */}
                <div
                  className="absolute bg-kc-info/10 border-2 border-kc-info"
                  style={{ left: 0, top: 150, width: 10, height: 100 }}
                />
              </div>
            </div>

            {/* Canvas Info */}
            <div className="p-3 border-t border-kc-cloud bg-kc-pearl/30 flex items-center justify-between text-xs text-kc-mist">
              <span>Floor Plan: 25&apos; x 20&apos; (500 sq ft)</span>
              <span>{placedItems.length} items placed</span>
            </div>
          </div>
        </div>

        {/* Compliance Results Panel */}
        <div className="lg:col-span-1">
          <div className="card p-4 sticky top-6">
            <h2 className="font-heading font-semibold text-kc-slate mb-4">
              Compliance Check
            </h2>

            {!showComplianceResults ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto bg-kc-pearl rounded-xl flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-kc-mist" />
                </div>
                <p className="text-sm text-kc-mist mb-4">
                  Click &quot;Check Compliance&quot; to analyze your floor plan for ADA compliance and best practices.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {complianceResults.map((check) => (
                  <div
                    key={check.id}
                    className={`p-3 rounded-lg ${
                      check.status === 'pass'
                        ? 'bg-kc-success/10'
                        : check.status === 'warning'
                        ? 'bg-kc-warning/10'
                        : 'bg-kc-error/10'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {check.status === 'pass' ? (
                        <CheckCircle className="w-4 h-4 text-kc-success flex-shrink-0 mt-0.5" />
                      ) : check.status === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-kc-warning flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-kc-error flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            check.status === 'pass'
                              ? 'text-kc-success'
                              : check.status === 'warning'
                              ? 'text-kc-warning'
                              : 'text-kc-error'
                          }`}
                        >
                          {check.title}
                        </p>
                        <p className="text-xs text-kc-steel mt-0.5">
                          {check.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div className="pt-3 border-t border-kc-cloud mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Info className="w-4 h-4 text-kc-mist" />
                    <span className="text-kc-steel">
                      {complianceResults.filter((c) => c.status === 'pass').length} of{' '}
                      {complianceResults.length} checks passed
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="card p-4 bg-kc-info/5 border-kc-info/20">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-kc-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-kc-slate font-medium">
              Space Planning Tips
            </p>
            <p className="text-sm text-kc-steel mt-1">
              Maintain 36&quot; minimum aisle widths for ADA compliance. Consider natural light sources when placing workstations, and ensure clear paths to emergency exits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
