"use client";

import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
  { 
    name: 'UI Design', 
    value: 38, 
    fill: '#00B2FF',
    info: 'Interface Design', 
    percentage: '38%'
  },
  { 
    name: 'UX Design', 
    value: 18, 
    fill: '#FFB800',
    info: 'Experience Design', 
    percentage: '18%'
  },
  { 
    name: 'Development', 
    value: 12, 
    fill: '#FF8042',
    info: 'Web Development', 
    percentage: '12%'
  },
  { 
    name: 'UI Motion', 
    value: 12, 
    fill: '#0066FF',
    info: 'Animation Design', 
    percentage: '12%'
  },
  { 
    name: 'Animation', 
    value: 10, 
    fill: '#FF69B4',
    info: 'Motion Design', 
    percentage: '10%'
  },
  { 
    name: 'User Research', 
    value: 10, 
    fill: '#4A4A4A',
    info: 'User Studies', 
    percentage: '10%'
  }
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill={fill} className="text-lg font-medium">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#666" className="text-sm">
        {payload.info}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default class PieChartComponent extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div className="bg-white rounded-xl w-full h-full p-4">
        {/* TITLE */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-medium">Topics your Interested in</h1>
          </div>
          <select className="text-sm text-gray-600 border rounded-full px-3 py-1">
            <option>Last Month</option>
          </select>
        </div>

        <div className="flex">
          {/* Left side - Chart */}
          <div className="w-1/2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={this.onPieEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Right side - Legend */}
          <div className="w-1/2 pl-8 pt-4">
            <div className="grid grid-cols-1 gap-4">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.percentage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}