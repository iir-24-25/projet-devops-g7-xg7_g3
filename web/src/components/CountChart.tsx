"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const CountChart = () => {
  const [data, setData] = useState([
    { name: "Total", count: 0, fill: "white" },
    { name: "Girls", count: 0, fill: "#FAD3D4" },
    { name: "Boys", count: 0, fill: "#D3F7FA" },
  ]);

  const [percentages, setPercentages] = useState({ male: 0, female: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/numberGender?type=ETUD");
        const result = await res.json();
        const male = result.MALE || 0;
        const female = result.FEMALE || 0;
        const total = male + female;
        const malePercent = total ? (male / total) * 100 : 0;
        const femalePercent = total ? (female / total) * 100 : 0;

        setData([
          { name: "Total", count: total, fill: "white" },
          { name: "Girls", count: female, fill: "#FAD3D4" },
          { name: "Boys", count: male, fill: "#D3F7FA" },
        ]);

        // Convert the percentages to numbers, not strings
        setPercentages({
          male: Math.round(malePercent * 10) / 10, // Round to 1 decimal place
          female: Math.round(femalePercent * 10) / 10, // Round to 1 decimal place
        });
      } catch (error) {
        console.error("Erreur de chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/day.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#D3F7FA] rounded-full" />
          <h1 className="font-bold">{data[2].count}</h1>
          <h2 className="text-xs text-gray-300">Boys ({percentages.male}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#FAD3D4] rounded-full" />
          <h1 className="font-bold">{data[1].count}</h1>
          <h2 className="text-xs text-gray-300">Girls ({percentages.female}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
