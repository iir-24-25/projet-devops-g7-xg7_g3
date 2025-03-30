"use client";

import React, { useState, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  time: string;
  date: number;
  color: string;
}

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    color: '#4F46E5' // couleur par défaut
  });
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const colorOptions = [
    { name: 'Indigo', value: '#4F46E5' },
    { name: 'Rose', value: '#EC4899' },
    { name: 'Green', value: '#22C55E' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Purple', value: '#A855F7' }
  ];

  // Générer les jours de la semaine actuelle
  const generateWeekDays = (startDate: Date) => {
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'long' }),
        year: date.getFullYear()
      });
    }
    return days;
  };

  const [days, setDays] = useState(generateWeekDays(currentWeekStart));

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event = {
      id: events.length + 1,
      title: newEvent.title,
      time: newEvent.time,
      date: selectedDate,
      color: newEvent.color
    };
    setEvents([...events, event]);
    setShowEventModal(false);
    setNewEvent({ title: '', time: '', color: '#4F46E5' });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeekStart(newDate);
    setDays(generateWeekDays(newDate));
  };

  const getEventsForSelectedDate = () => {
    return events.filter(event => event.date === selectedDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header with month and navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {days[0].month} {days[0].year}
        </h2>
        <div className="flex gap-4">
          <button 
            onClick={() => navigateDate('prev')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => navigateDate('next')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(({ day }) => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar dates */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {days.map(({ date }) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`aspect-square flex items-center justify-center rounded-full text-sm
              ${selectedDate === date 
                ? 'bg-indigo-600 text-white' 
                : 'hover:bg-gray-100'}`}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Upcoming Schedule */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold">Upcoming Schedule</h3>
            <p className="text-sm text-gray-500">
              {days.find(d => d.date === selectedDate)?.day}, {selectedDate} {days[0].month}
            </p>
          </div>
          <button
            onClick={() => setShowEventModal(true)}
            className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Events list */}
        <div className="space-y-4">
          {getEventsForSelectedDate().length > 0 ? (
            getEventsForSelectedDate().map((event) => (
              <div 
                key={event.id} 
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ backgroundColor: `${event.color}10` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-1 h-12 rounded-full" style={{ backgroundColor: event.color }}></div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No events scheduled for today</p>
              <p className="text-sm">Click + to add a new event</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New Event</h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, color: color.value })}
                      className={`w-8 h-8 rounded-lg transition-transform ${
                        newEvent.color === color.value ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;


