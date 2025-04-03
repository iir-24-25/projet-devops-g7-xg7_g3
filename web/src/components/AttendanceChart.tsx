"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AttendanceData {
  name: string;
  present: number;
  absent: number;
}

const dayMap: { [key: string]: string } = {
  LUNDI: "Lun",
  MARDI: "Mar",
  MERCREDI: "Mer",
  JEUDI: "Jeu",
  VENDREDI: "Ven",
  SAMEDI: "Sam",
  DIMANCHE: "Dim",
};

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendanceData = async () => {
    try {
      const jwtToken = localStorage.getItem("authToken"); // Remplace par ton vrai token
      const headers = { Authorization: `Bearer ${jwtToken}` };

      const weeklyResponse = await fetch("http://localhost:8080/weekly", { headers });
      const presenceResponse = await fetch("http://localhost:8080/presence-par-jour", { headers });

      if (!weeklyResponse.ok || !presenceResponse.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const weeklyData = await weeklyResponse.json();
      const presenceData = await presenceResponse.json();

      // Déterminer les jours passés + actuel
      const today = new Date();
      const todayIndex = today.getDay(); // 1 = lundi, 2 = mardi, ..., 6 = samedi, 0 = dimanche

      const daysToShow = weeklyData.filter((entry: any) => {
        const index = Object.keys(dayMap).indexOf(entry.day);
        return index >= 0 && index <= todayIndex; // Filtrer jours passés + actuel
      });

      const formattedData = daysToShow.map((entry: any) => ({
        name: dayMap[entry.day],
        present: (presenceData[entry.day] || 0) - entry.count,
        absent: entry.count,
      }));

      setAttendanceData(formattedData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart width={500} height={300} data={attendanceData} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
            />
            <Bar
              dataKey="present"
              fill="#D3F7FA"
              legendType="circle"
              radius={[10, 10, 0, 0]}
              activeBar={{ fill: "#D3F7FA" }}
            />
            <Bar
              dataKey="absent"
              fill="#FAD3D4"
              legendType="circle"
              radius={[10, 10, 0, 0]}
              activeBar={{ fill: "#FAD3D4" }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AttendanceChart;
