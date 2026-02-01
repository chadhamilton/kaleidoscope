'use client';

import { useState } from 'react';
import { Check, Circle, Calendar, DollarSign } from 'lucide-react';
import {
  projects,
  formatCurrency,
  formatDate,
  formatStatus,
  getStatusColor,
  getStatusBg,
} from '@/lib/mockData';

type FilterTab = 'all' | 'in_progress' | 'planning' | 'completed';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'planning', label: 'Planning' },
    { id: 'completed', label: 'Completed' },
  ];

  const filteredProjects =
    activeTab === 'all'
      ? projects
      : projects.filter((p) => p.status === activeTab);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
          Projects
        </h1>
        <p className="text-kc-steel mt-1">
          Track and manage your workspace design projects.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-kc-slate text-white'
                : 'bg-white text-kc-steel hover:bg-kc-cloud/50 border border-kc-cloud'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="card p-6 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-heading text-lg font-semibold text-kc-slate">
                  {project.name}
                </h2>
                <p className="text-sm text-kc-mist mt-1 line-clamp-2">
                  {project.description}
                </p>
              </div>
              <span
                className={`badge ${getStatusColor(project.status)} ${getStatusBg(project.status)}`}
              >
                {formatStatus(project.status)}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-kc-steel">Project Progress</span>
                <span className="font-medium text-kc-slate">{project.progress}%</span>
              </div>
              <div className="progress-bar h-3">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-kc-slate mb-3">Milestones</h3>
              <div className="space-y-2">
                {project.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-3 text-sm"
                  >
                    {milestone.completed ? (
                      <div className="w-5 h-5 rounded-full bg-kc-success/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-kc-success" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-kc-cloud flex-shrink-0" />
                    )}
                    <span
                      className={`flex-1 ${
                        milestone.completed ? 'text-kc-mist line-through' : 'text-kc-slate'
                      }`}
                    >
                      {milestone.name}
                    </span>
                    <span className="text-kc-mist text-xs">
                      {formatDate(milestone.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-kc-cloud flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-kc-mist" />
                  <span className="text-kc-steel">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-kc-mist" />
                <span className="text-kc-steel">
                  <span className="font-medium text-kc-slate">{formatCurrency(project.spent)}</span>
                  {' / '}
                  {formatCurrency(project.budget)}
                </span>
              </div>
            </div>

            {/* Budget Utilization Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-kc-mist mb-1">
                <span>Budget Utilization</span>
                <span>{Math.round((project.spent / project.budget) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-kc-cloud rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    project.spent / project.budget > 0.9
                      ? 'bg-kc-error'
                      : project.spent / project.budget > 0.7
                      ? 'bg-kc-warning'
                      : 'bg-kc-success'
                  }`}
                  style={{ width: `${Math.min((project.spent / project.budget) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-kc-mist">No projects found with the selected filter.</p>
        </div>
      )}
    </div>
  );
}
