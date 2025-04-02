import React, { useState } from 'react';

interface Assignment {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  dueDate: string;
  submitted: number;
  notSubmitted: number;
}

const DailyAssignments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const assignments: Assignment[] = [
    {
      id: 1,
      title: "Basic Design",
      subtitle: "Introduction to Graphics Design",
      date: "23rd March 2022",
      dueDate: "8th April 2022",
      submitted: 22,
      notSubmitted: 15
    },
    {
      id: 2,
      title: "Advanced UI/UX",
      subtitle: "User Interface Principles",
      date: "25th March 2022",
      dueDate: "12th April 2022",
      submitted: 18,
      notSubmitted: 14
    },
    {
      id: 3,
      title: "Web Development",
      subtitle: "Frontend Technologies",
      date: "25th March 2022",
      dueDate: "12th April 2022",
      submitted: 25,
      notSubmitted: 7
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">Current Assignments</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search assignments..."
            className="pl-6 pr-3 py-1 rounded-lg border border-gray-200 w-48 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <svg
            className="w-3 h-3 text-gray-400 absolute left-2 top-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-3 gap-3">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="p-3 rounded-lg border border-gray-100 bg-white"
          >
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-800">{assignment.title}</h3>
              <p className="text-xs text-gray-500 truncate">{assignment.subtitle}</p>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <span>{assignment.date}</span>
              <span className="mx-1">•</span>
              <span className="text-pink-500">{assignment.dueDate}</span>
            </div>

            <div className="relative">
              <div className="flex mb-1 items-center justify-between">
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs">{assignment.submitted}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
                    <span className="text-xs">{assignment.notSubmitted}</span>
                  </div>
                </div>
              </div>
              <div className="flex h-1.5 overflow-hidden rounded bg-gray-100">
                <div
                  style={{
                    width: `${(assignment.submitted / (assignment.submitted + assignment.notSubmitted)) * 100}%`
                  }}
                  className="bg-blue-500"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 gap-1">
        <button
          className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        >
          Previous
        </button>
        <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded">1</button>
        <button className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded">2</button>
        <button
          className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DailyAssignments; 