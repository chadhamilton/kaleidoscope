'use client';

import { useState } from 'react';
import { X, Clock, User, Phone, FileText } from 'lucide-react';
import {
  projects,
  timeSlots,
  Installation,
  TimeSlot,
} from '@/lib/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSubmit: (booking: Omit<Installation, 'id' | 'createdAt'>) => void;
  existingInstallations: Installation[];
}

function dateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
  existingInstallations,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    projectId: '',
    timeSlotId: '',
    contactPerson: '',
    phoneNumber: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const dateStr = dateToString(selectedDate);

  const isSlotAvailable = (slotId: string): boolean => {
    return !existingInstallations.some(
      (inst) =>
        inst.date === dateStr &&
        inst.timeSlotId === slotId &&
        inst.status === 'scheduled'
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.projectId) {
      newErrors.projectId = 'Please select a project';
    }
    if (!formData.timeSlotId) {
      newErrors.timeSlotId = 'Please select a time slot';
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const selectedProject = projects.find((p) => p.id === formData.projectId);

    onSubmit({
      projectId: formData.projectId,
      projectName: selectedProject?.name || '',
      date: dateStr,
      timeSlotId: formData.timeSlotId,
      contactPerson: formData.contactPerson.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      notes: formData.notes.trim(),
      status: 'scheduled',
    });

    // Reset form
    setFormData({
      projectId: '',
      timeSlotId: '',
      contactPerson: '',
      phoneNumber: '',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      projectId: '',
      timeSlotId: '',
      contactPerson: '',
      phoneNumber: '',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-1 text-kc-mist hover:text-kc-steel transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-kc-slate mb-1">
          Schedule Installation
        </h2>
        <p className="text-kc-gray mb-6">{formatDateDisplay(selectedDate)}</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-kc-slate mb-1.5">
              Project *
            </label>
            <select
              value={formData.projectId}
              onChange={(e) =>
                setFormData({ ...formData, projectId: e.target.value })
              }
              className={`input w-full ${errors.projectId ? 'border-kc-error' : ''}`}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {errors.projectId && (
              <p className="text-sm text-kc-error mt-1">{errors.projectId}</p>
            )}
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="block text-sm font-medium text-kc-slate mb-1.5">
              <Clock className="w-4 h-4 inline mr-1.5" />
              Time Slot *
            </label>
            <div className="space-y-2">
              {timeSlots.map((slot: TimeSlot) => {
                const available = isSlotAvailable(slot.id);
                return (
                  <label
                    key={slot.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      !available
                        ? 'bg-kc-pearl border-kc-cloud cursor-not-allowed opacity-60'
                        : formData.timeSlotId === slot.id
                        ? 'border-kc-blue bg-kc-blue/5'
                        : 'border-kc-cloud hover:border-kc-blue/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      checked={formData.timeSlotId === slot.id}
                      onChange={(e) =>
                        setFormData({ ...formData, timeSlotId: e.target.value })
                      }
                      disabled={!available}
                      className="w-4 h-4 text-kc-blue focus:ring-kc-blue"
                    />
                    <span className="ml-3 text-kc-slate">{slot.label}</span>
                    {!available && (
                      <span className="ml-auto text-sm text-kc-mist">
                        Booked
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
            {errors.timeSlotId && (
              <p className="text-sm text-kc-error mt-1">{errors.timeSlotId}</p>
            )}
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-sm font-medium text-kc-slate mb-1.5">
              <User className="w-4 h-4 inline mr-1.5" />
              Contact Person *
            </label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) =>
                setFormData({ ...formData, contactPerson: e.target.value })
              }
              placeholder="Enter contact name"
              className={`input w-full ${errors.contactPerson ? 'border-kc-error' : ''}`}
            />
            {errors.contactPerson && (
              <p className="text-sm text-kc-error mt-1">{errors.contactPerson}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-kc-slate mb-1.5">
              <Phone className="w-4 h-4 inline mr-1.5" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="(555) 123-4567"
              className={`input w-full ${errors.phoneNumber ? 'border-kc-error' : ''}`}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-kc-error mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-kc-slate mb-1.5">
              <FileText className="w-4 h-4 inline mr-1.5" />
              Special Instructions
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Any special instructions or notes..."
              rows={3}
              className="input w-full resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Schedule Installation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
