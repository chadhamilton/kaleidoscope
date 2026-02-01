'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Camera,
  Upload,
  Smartphone,
  CheckCircle,
  Clock,
  FileText,
  Eye,
  Download,
  Image as ImageIcon,
} from 'lucide-react';
import {
  designConcepts,
  formatDate,
  formatStatus,
  getStatusColor,
  getStatusBg,
} from '@/lib/mockData';

type TabId = 'concepts' | 'ar';

export default function DesignPlannerPage() {
  const [activeTab, setActiveTab] = useState<TabId>('concepts');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'concepts', label: 'Design Concepts' },
    { id: 'ar', label: 'AR Visualizer' },
  ];

  const arSteps = [
    {
      step: 1,
      title: 'Take a Photo',
      description: 'Capture your space using your device camera or upload an existing photo.',
      icon: Camera,
    },
    {
      step: 2,
      title: 'Select Products',
      description: 'Browse our catalog and choose furniture items to place in your space.',
      icon: FileText,
    },
    {
      step: 3,
      title: 'Visualize',
      description: 'See how products look in your actual space with realistic 3D rendering.',
      icon: Eye,
    },
    {
      step: 4,
      title: 'Save & Share',
      description: 'Download your visualization or share it with your team for feedback.',
      icon: Download,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
          Design Planner
        </h1>
        <p className="text-kc-steel mt-1">
          Explore design concepts and visualize products in your space.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-kc-slate text-white'
                : 'bg-white text-kc-steel hover:bg-kc-cloud/50 border border-kc-cloud'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'concepts' && (
        <div className="grid md:grid-cols-2 gap-6">
          {designConcepts.map((concept, index) => (
            <div
              key={concept.id}
              className="card overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Preview */}
              {concept.thumbnail ? (
                <div className="aspect-video relative">
                  <Image
                    src={concept.thumbnail}
                    alt={concept.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-kc-pearl flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 mx-auto bg-kc-cloud/50 rounded-xl mb-3 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-kc-mist" />
                    </div>
                    <p className="text-sm text-kc-mist">Design Preview</p>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-heading font-semibold text-kc-slate">
                      {concept.name}
                    </h3>
                    <p className="text-xs text-kc-mist mt-0.5">
                      Version {concept.version}
                    </p>
                  </div>
                  <span
                    className={`badge text-xs ${getStatusColor(concept.status)} ${getStatusBg(concept.status)}`}
                  >
                    {formatStatus(concept.status)}
                  </span>
                </div>

                <p className="text-sm text-kc-steel mb-4 line-clamp-2">
                  {concept.description}
                </p>

                <div className="flex items-center justify-between text-xs text-kc-mist">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Updated {formatDate(concept.updatedAt)}</span>
                  </div>
                  <button className="text-kc-steel hover:text-kc-slate font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State Placeholder */}
          {designConcepts.length === 0 && (
            <div className="md:col-span-2 card p-12 text-center">
              <FileText className="w-12 h-12 text-kc-mist mx-auto mb-4" />
              <p className="text-kc-mist">No design concepts yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'ar' && (
        <div className="space-y-8">
          {/* Camera Preview Area */}
          <div className="card p-8">
            <div className="aspect-video bg-kc-pearl rounded-xl flex items-center justify-center border-2 border-dashed border-kc-cloud">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto bg-kc-cloud/50 rounded-full mb-4 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-kc-mist" />
                </div>
                <h3 className="font-heading font-semibold text-kc-slate mb-2">
                  Capture Your Space
                </h3>
                <p className="text-sm text-kc-mist mb-6 max-w-md">
                  Take a photo of your workspace or upload an existing image to start visualizing furniture.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button className="btn-primary flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Open Camera
                  </button>
                  <button className="btn-secondary flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Image
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="card p-6">
            <h2 className="font-heading text-lg font-semibold text-kc-slate mb-6">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {arSteps.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="text-center">
                    <div className="relative mb-4">
                      <div className="w-14 h-14 mx-auto bg-kc-slate/5 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-kc-slate" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-kc-slate text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="font-medium text-kc-slate mb-1">{item.title}</h3>
                    <p className="text-sm text-kc-mist">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile App Recommendation */}
          <div className="card p-6 bg-gradient-to-br from-kc-slate to-kc-blue-dark text-white">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-lg mb-1">
                  Better Experience on Mobile
                </h3>
                <p className="text-kc-mist text-sm mb-3">
                  For the best AR experience with real-time camera visualization, download our mobile app.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-white text-kc-slate rounded-lg text-sm font-medium hover:bg-kc-cloud transition-colors">
                    App Store
                  </button>
                  <button className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                    Google Play
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Realistic 3D Models',
                description: 'High-fidelity product models that look true to life.',
              },
              {
                title: 'Accurate Scaling',
                description: 'Products are rendered at their real-world dimensions.',
              },
              {
                title: 'Multiple Products',
                description: 'Place and arrange multiple items in a single scene.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 p-4 bg-kc-pearl/50 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-kc-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-kc-slate text-sm">{feature.title}</h4>
                  <p className="text-xs text-kc-mist mt-0.5">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
