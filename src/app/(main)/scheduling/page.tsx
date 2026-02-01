'use client';

import { useState } from 'react';
import { CalendarDays, Clock, MapPin, Phone, Plus } from 'lucide-react';
import Calendar from '@/components/Calendar';
import BookingModal from '@/components/BookingModal';
import {
  installations as initialInstallations,
  timeSlots,
  Installation,
  formatDate,
  getInstallationStatusColor,
  getTimeSlotLabel,
  formatStatus,
} from '@/lib/mockData';

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

export default function SchedulingPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [installationsList, setInstallationsList] = useState<Installation[]>(
    initialInstallations
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBookingSubmit = (
    booking: Omit<Installation, 'id' | 'createdAt'>
  ) => {
    const newInstallation: Installation = {
      ...booking,
      id: `inst-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setInstallationsList((prev) => [...prev, newInstallation]);
  };

  const getSelectedDateInstallations = (): Installation[] => {
    if (!selectedDate) return [];
    const dateStr = dateToString(selectedDate);
    return installationsList.filter(
      (inst) => inst.date === dateStr && inst.status === 'scheduled'
    );
  };

  const getAvailableSlots = (): Array<{ id: string; label: string; startTime: string; endTime: string; available: boolean }> => {
    const dateStr = selectedDate ? dateToString(selectedDate) : '';
    return timeSlots.map((slot) => ({
      ...slot,
      available: selectedDate
        ? !installationsList.some(
            (inst) =>
              inst.date === dateStr &&
              inst.timeSlotId === slot.id &&
              inst.status === 'scheduled'
          )
        : true,
    }));
  };

  const upcomingInstallations = installationsList
    .filter((inst) => inst.status === 'scheduled' && inst.date >= dateToString(new Date()))
    .sort((a, b) => a.date.localeCompare(b.date));

  const selectedDateInstallations = getSelectedDateInstallations();
  const availableSlots = getAvailableSlots();
  const hasAvailableSlot = availableSlots.some((slot) => slot.available);

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-kc-slate mb-1">
          Scheduling
        </h1>
        <p className="text-kc-gray">
          Schedule and manage installation appointments
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Calendar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={setCurrentMonth}
            installations={installationsList}
          />
        </div>

        {/* Selected Date Panel */}
        <div className="lg:col-span-1">
          <div className="card p-5 h-full">
            {selectedDate ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays className="w-5 h-5 text-kc-blue" />
                  <h3 className="font-semibold text-kc-slate">
                    {formatDateDisplay(selectedDate)}
                  </h3>
                </div>

                {/* Scheduled for this date */}
                {selectedDateInstallations.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-kc-mist uppercase tracking-wider mb-2">
                      Scheduled
                    </h4>
                    <div className="space-y-2">
                      {selectedDateInstallations.map((inst) => (
                        <div
                          key={inst.id}
                          className="p-3 bg-kc-pearl rounded-lg text-sm"
                        >
                          <p className="font-medium text-kc-slate">
                            {inst.projectName}
                          </p>
                          <p className="text-kc-gray">
                            {getTimeSlotLabel(inst.timeSlotId)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Time Slots */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-kc-mist uppercase tracking-wider mb-2">
                    Available Slots
                  </h4>
                  <div className="space-y-2">
                    {availableSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`flex items-center gap-2 p-3 rounded-lg ${
                          slot.available
                            ? 'bg-kc-success/10 text-kc-success'
                            : 'bg-kc-pearl text-kc-mist'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{slot.label}</span>
                        {!slot.available && (
                          <span className="ml-auto text-xs">Booked</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule Button */}
                {hasAvailableSlot && (
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(true)}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Schedule Installation
                  </button>
                )}

                {!hasAvailableSlot && (
                  <p className="text-sm text-kc-mist text-center py-2">
                    No available slots for this date
                  </p>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CalendarDays className="w-12 h-12 text-kc-cloud mb-3" />
                <p className="text-kc-gray">
                  Select a date to view availability
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Installations */}
      <div className="card p-5">
        <h2 className="text-lg font-semibold text-kc-slate mb-4">
          Upcoming Installations
        </h2>

        {upcomingInstallations.length > 0 ? (
          <div className="space-y-3">
            {upcomingInstallations.map((inst) => (
              <div
                key={inst.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-kc-pearl rounded-xl"
              >
                {/* Date Badge */}
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-medium text-kc-mist">
                    {new Date(inst.date).toLocaleDateString('en-US', {
                      month: 'short',
                    })}
                  </div>
                  <div className="text-2xl font-semibold text-kc-slate">
                    {new Date(inst.date).getDate()}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-kc-slate truncate">
                    {inst.projectName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-kc-gray">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {getTimeSlotLabel(inst.timeSlotId)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {inst.contactPerson}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {inst.phoneNumber}
                    </span>
                  </div>
                  {inst.notes && (
                    <p className="text-sm text-kc-mist mt-1 truncate">
                      {inst.notes}
                    </p>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  <span
                    className={`badge ${getInstallationStatusColor(inst.status)}`}
                  >
                    {formatStatus(inst.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-kc-gray">
            <CalendarDays className="w-12 h-12 text-kc-cloud mx-auto mb-3" />
            <p>No upcoming installations scheduled</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedDate && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          selectedDate={selectedDate}
          onSubmit={handleBookingSubmit}
          existingInstallations={installationsList}
        />
      )}
    </div>
  );
}
