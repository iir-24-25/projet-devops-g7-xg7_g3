"use client";

import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

// Définition du type pour les données du PieChart
interface DataType {
  name: string;
  value: number;
}

// Définition du type pour activeShape (PieSectorDataItem attendu par Recharts)
const renderActiveShape: React.FC<any> = (props) => {
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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
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
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class PieChartComponent extends PureComponent {
  state = {
    activeIndex: 0,
    data: [],
  };

  async componentDidMount() {
    try {
      // Récupérer les données depuis l'API
      const response = await fetch("http://localhost:8080/numberPersonneByFiliere");
      const data = await response.json();

      // Transformer l'objet en tableau pour Recharts
      const transformedData = Object.keys(data).map(filiere => ({
        name: filiere,
        value: data[filiere],
      }));

      // Mettre à jour l'état avec les données transformées
      this.setState({ data: transformedData });
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  onPieEnter = (_: unknown, index: number) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div className="bg-white rounded-xl w-full h-full p-4">
        {/* TITLE */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Students by Filiere</h1>
          <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape} // ✅ Correctement typé
              data={this.state.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
