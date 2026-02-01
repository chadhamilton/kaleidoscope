'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Installation } from '@/lib/mockData';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

interface CalendarProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  installations: Installation[];
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const days: CalendarDay[] = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month days (fill remaining cells to complete 6 rows)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function dateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function hasInstallation(date: Date, installations: Installation[]): boolean {
  const dateStr = dateToString(date);
  return installations.some(inst => inst.date === dateStr && inst.status === 'scheduled');
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({
  currentMonth,
  selectedDate,
  onDateSelect,
  onMonthChange,
  installations,
}: CalendarProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = generateCalendarDays(year, month);

  const monthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const goToPreviousMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-kc-pearl rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-kc-steel" />
        </button>
        <h2 className="text-lg font-semibold text-kc-slate">{monthYear}</h2>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-kc-pearl rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-kc-steel" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-kc-mist py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isSelected = selectedDate && isSameDay(day.date, selectedDate);
          const isTodayDate = isToday(day.date);
          const hasEvent = hasInstallation(day.date, installations);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(day.date)}
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors
                ${!day.isCurrentMonth ? 'text-kc-cloud' : 'text-kc-slate'}
                ${isSelected ? 'bg-kc-blue text-white' : 'hover:bg-kc-pearl'}
                ${isTodayDate && !isSelected ? 'ring-2 ring-kc-blue ring-inset' : ''}
              `}
            >
              <span className={day.isCurrentMonth ? 'font-medium' : ''}>
                {day.date.getDate()}
              </span>
              {hasEvent && day.isCurrentMonth && (
                <span
                  className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-kc-blue'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
