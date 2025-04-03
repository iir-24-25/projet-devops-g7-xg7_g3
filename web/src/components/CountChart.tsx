"use client";
<<<<<<< HEAD

import { useState, useEffect } from "react";
=======
>>>>>>> 1b05f7f0d0e20372b07a7f6e534b2b07c9e450d8
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

<<<<<<< HEAD
// Type definition for the data structure
interface GenderData {
  MALE: number;
  FEMALE: number;
}

=======
>>>>>>> 1b05f7f0d0e20372b07a7f6e534b2b07c9e450d8
interface ChartData {
  name: string;
  count: number;
  fill: string;
}

const CountChart = () => {
<<<<<<< HEAD
  // Initial chart data
=======
>>>>>>> 1b05f7f0d0e20372b07a7f6e534b2b07c9e450d8
  const [data, setData] = useState<ChartData[]>([
    { name: "Total", count: 0, fill: "white" },
    { name: "Girls", count: 0, fill: "#FAD3D4" },
    { name: "Boys", count: 0, fill: "#D3F7FA" },
  ]);
  const [percentages, setPercentages] = useState({
    male: 0,
    female: 0
  });
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem("authToken");

  // Static gender data
  const genderData: GenderData = {
    MALE: 700,
    FEMALE: 545,
  };

  // Update chart data when genderData changes
  useEffect(() => {
<<<<<<< HEAD
    const male = genderData.MALE || 0;
    const female = genderData.FEMALE || 0;
    const total = male + female;
    const malePercent = total ? (male / total) * 100 : 0;
    const femalePercent = total ? (female / total) * 100 : 0;

    setData([
      { name: "Total", count: total, fill: "white" },
      { name: "Girls", count: female, fill: "#FAD3D4" },
      { name: "Boys", count: male, fill: "#D3F7FA" },
    ]);

    setPercentages({
      male: Math.round(malePercent * 10) / 10,
      female: Math.round(femalePercent * 10) / 10,
    });
  }, [genderData]);
=======
    const fetchGenderData = async () => {
      try {
        const response = await fetch("http://localhost:8080/numberGender?type=ETUD", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gender data");
        }

        const apiData = await response.json();
        const total = apiData.MALE + apiData.FEMALE;

        // Calculate percentages as numbers
        const malePercent = total > 0 ? Number((apiData.MALE / total * 100).toFixed(1)) : 0;
        const femalePercent = total > 0 ? Number((apiData.FEMALE / total * 100).toFixed(1)) : 0;

        // Update data for chart
        setData([
          { name: "Total", count: total, fill: "white" },
          { name: "Girls", count: apiData.FEMALE, fill: "#FAD3D4" },
          { name: "Boys", count: apiData.MALE, fill: "#D3F7FA" },
        ]);

        setPercentages({
          male: malePercent,
          female: femalePercent
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching gender data:", error);
        setData([
          { name: "Total", count: 1245, fill: "white" },
          { name: "Girls", count: 545, fill: "#FAD3D4" },
          { name: "Boys", count: 700, fill: "#D3F7FA" },
        ]);
        setPercentages({
          male: 56.2,
          female: 43.8
        });
        setLoading(false);
      }
    };

    fetchGenderData();
  }, []);
>>>>>>> 1b05f7f0d0e20372b07a7f6e534b2b07c9e450d8

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>
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
          alt="Icon"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#D3F7FA] rounded-full" />
          <h1 className="font-bold">{data[2].count}</h1>
          <h2 className="text-xs text-gray-300">Boys ({percentages.male}%)</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#FAD3D4] rounded-full" />
          <h1 className="font-bold">{data[1].count}</h1>
          <h2 className="text-xs text-gray-300">Girls ({percentages.female}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;