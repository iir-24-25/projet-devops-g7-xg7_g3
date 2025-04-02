import React from 'react';

const Assignments = () => {
  const assignments = [
    {
      id: 1,
      title: "Basic Design",
      description: "Introduction to Graphics Design",
      status: "Submitted",
      statusColor: "blue",
      date: "23rd March 2022"
    },
    {
      id: 2,
      title: "Advanced UI/UX",
      description: "User Interface Principles",
      status: "Not Submitted",
      statusColor: "yellow",
      date: "10th April 2022"
    }
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Current Assignments</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search assignments..."
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{assignment.title}</h3>
                  <p className="text-sm text-gray-500">{assignment.description}</p>
                </div>
                <span className={`px-3 py-1 bg-${assignment.statusColor}-100 text-${assignment.statusColor}-600 rounded-full text-sm`}>
                  {assignment.status}
                </span>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {assignment.date}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          <button className="px-4 py-2 border rounded-lg text-gray-500 hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border rounded-lg text-gray-500 hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border rounded-lg text-gray-500 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Assignments; 