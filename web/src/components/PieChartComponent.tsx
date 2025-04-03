"use client";

import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, PieProps } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';

interface PieChartData {
  name: string;
  value: number;
  fill: string;
  info: string;
  percentage: string;
}

interface PieChartState {
  activeIndex: number;
  data: PieChartData[];
  loading: boolean;
}

interface CustomPieSectorDataItem extends PieSectorDataItem {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: PieChartData;
  percent: number;
  value: number;
}

const COLORS = ['#00B2FF', '#FFB800', '#FF8042', '#0066FF', '#FF69B4', '#4A4A4A'];

const renderActiveShape = (props: CustomPieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

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

export default class PieChartComponent extends PureComponent<{}, PieChartState> {
  state: PieChartState = {
    activeIndex: 0,
    loading: true,
    data: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const authToken = localStorage.getItem("authToken");
    
    try {
      const response = await fetch("http://localhost:8080/numberPersonneByFiliere", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const apiData = await response.json();
      const total = Object.values<number>(apiData).reduce((sum, value) => sum + value, 0);

      const newData: PieChartData[] = [
        { name: "GI", value: apiData.GI, fill: COLORS[0], info: "Génie Industriel", percentage: `${((apiData.GI / total) * 100).toFixed(1)}%` },
        { name: "IIR", value: apiData.IIR, fill: COLORS[1], info: "Ingenierie Informatique et Reseaux", percentage: `${((apiData.IIR / total) * 100).toFixed(1)}%` },
        { name: "GESI", value: apiData.GESI, fill: COLORS[2], info: "Génie Électrique et Systemes Intelligents", percentage: `${((apiData.GESI / total) * 100).toFixed(1)}%` },
        { name: "IAII", value: apiData.IAII, fill: COLORS[3], info: "Ingénierie des Automatismes et Informatique Industrielle", percentage: `${((apiData.IAII / total) * 100).toFixed(1)}%` },
        { name: "GC", value: apiData.GC, fill: COLORS[4], info: "Génie Civil", percentage: `${((apiData.GC / total) * 100).toFixed(1)}%` },
        { name: "GF", value: apiData.GF, fill: COLORS[5], info: "Génie Financier", percentage: `${((apiData.GF / total) * 100).toFixed(1)}%` },
      ];

      this.setState({ data: newData, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback data
      this.setState({
        data: [
          { name: "GI", value: 8500, fill: COLORS[0], info: "Génie Industriel", percentage: "16.7%" },
          { name: "IIR", value: 8501, fill: COLORS[1], info: "Ingenierie Informatique et Reseaux", percentage: "16.7%" },
          { name: "GESI", value: 8500, fill: COLORS[2], info: "Génie Électrique et Systemes Intelligents ", percentage: "16.7%" },
          { name: "IAII", value: 8500, fill: COLORS[3], info: "Ingénierie des Automatismes et Informatique Industrielle", percentage: "16.7%" },
          { name: "GC", value: 8500, fill: COLORS[4], info: "Génie Civil", percentage: "16.7%" },
          { name: "GF", value: 8500, fill: COLORS[5], info: "Génie Financier", percentage: "16.7%" },
        ],
        loading: false
      });
    }
  };

  onPieEnter: PieProps['onMouseEnter'] = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="bg-white rounded-xl w-full h-full p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-medium">Students by Specialization</h1>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape as any}
                  data={this.state.data}
                  cx="50%"
                  cy="45%"
                  innerRadius={100}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={this.onPieEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-1/2 pl-8 pt-4">
            <div className="grid grid-cols-1 gap-4">
              {this.state.data.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-sm text-gray-700">{item.info}</span>
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