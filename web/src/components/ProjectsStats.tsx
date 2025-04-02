import React from 'react';

interface Project {
  name: string;
  percentage: number;
  color: string;
}

const ProjectsStats = () => {
  const projects: Project[] = [
    { name: 'Over9k', percentage: 44, color: '#00ff00' },
    { name: 'MagnumShop', percentage: 24, color: '#ffa500' },
    { name: 'Doctor+', percentage: 18, color: '#00a2ff' },
    { name: 'AfterMidnight', percentage: 14, color: '#ff0000' }
  ];

  const totalProjects = projects.length;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 8;
  const gap = 1;

  let currentAngle = 0;
  const segments = projects.map(project => {
    const percentage = project.percentage - gap;
    const length = (percentage / 100) * circumference;
    const segment = {
      color: project.color,
      strokeDasharray: `${length} ${circumference}`,
      strokeDashoffset: -currentAngle * circumference / 360
    };
    currentAngle += (project.percentage / 100) * 360;
    return segment;
  });

  return (
    <div className="bg-[#1a1a1a] p-3 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm font-medium flex items-center gap-2">
          Projects worked
          <span className="text-red-500 text-xs">-5%</span>
        </h3>
        <button className="text-gray-400">•••</button>
      </div>
      
      <div className="relative w-24 h-24 mx-auto mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#2a2a2a"
            strokeWidth={strokeWidth}
          />
          {segments.map((segment, index) => (
            <circle
              key={index}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={projects[index].color}
              strokeWidth={strokeWidth}
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          ))}
          <text x="50" y="45" textAnchor="middle" className="text-lg font-medium" fill="white">
            {totalProjects}
          </text>
          <text x="50" y="60" textAnchor="middle" className="text-[10px]" fill="#666">
            projects
          </text>
        </svg>
      </div>

      <div className="space-y-1.5">
        {projects.map((project, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              <span className="text-xs text-gray-300">{project.name}</span>
            </div>
            <span className="text-xs text-gray-300">{project.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsStats; 