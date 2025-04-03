"use client";

import React, { useState } from 'react';

interface Event {
  title: string;
  subtitle?: string;
  location: string;
  time: string;
}

const SimpleCalendar = () => {
  const [selectedDate] = useState(new Date(2024, 8, 7)); // September 7
  
  // Events matching the image exactly
  const events: Event[] = [
    {
      title: "Workshop",
      subtitle: "Atomic Design System",
      location: "Sylco",
      time: "6:00 - 7:20"
    },
    {
      title: "Workshop",
      subtitle: "UX Design Basic",
      location: "Sylco",
      time: "8:30 - 9:30"
    }
  ];

  // Generate calendar days to match the image
  const generateCalendarDays = () => {
    const days = [
      { dayName: 'sun', dayNumber: 6 },
      { dayName: 'mon', dayNumber: 7, isToday: true },
      { dayName: 'tue', dayNumber: 8 },
      { dayName: 'wed', dayNumber: 9 },
      { dayName: 'thu', dayNumber: 10 },
      { dayName: 'fri', dayNumber: 11 }
    ];
    return days;
  };

  const getEventForHour = (hour: number) => {
    return events.find(event => {
      const [startHour] = event.time.split(':').map(Number);
      return startHour === hour;
    });
  };

  return (
    <div className="p-4">
      {/* Month and Add Task button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[15px] font-normal text-gray-900">September</h2>
        <button className="text-[13px] text-blue-500 flex items-center">
          <span className="text-lg mr-1">+</span>
          <span className="text-blue-500">Add Task</span>
        </button>
      </div>

      {/* Calendar days */}
      <div className="flex gap-4 mb-8">
        {generateCalendarDays().map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-2 rounded-2xl cursor-pointer min-w-[40px]
              ${day.isToday ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
          >
            <span className="text-[13px] mb-1">{day.dayName}</span>
            <span className="text-[15px]">{day.dayNumber}</span>
          </div>
        ))}
      </div>

      {/* Time slots and events */}
      <div className="space-y-8">
        {[6, 7, 8, 9, 10, 11].map((hour) => {
          const event = getEventForHour(hour);
          return (
            <div key={hour} className="flex">
              <div className="w-12 text-[13px] text-gray-400 pt-1">{`${hour}:00`}</div>
              <div className="flex-1 pl-2">
                {event && (
                  <div className="bg-[#EDF6FF] p-3 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[14px] font-medium text-gray-900">{event.title}</h3>
                        {event.subtitle && (
                          <p className="text-[13px] text-gray-600 mt-0.5">{event.subtitle}</p>
                        )}
                        <p className="text-[12px] text-gray-400 mt-0.5">{event.time}</p>
                      </div>
                      <div className="flex items-center text-gray-500 text-[13px]">
                        <span className="mr-1">📍</span>
                        {event.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleCalendar; 