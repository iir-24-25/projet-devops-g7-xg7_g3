"use client";
import { useState, useEffect } from "react";
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

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [presenceData, setPresenceData] = useState({});

  useEffect(() => {
    // Récupérer les données des API
    const fetchData = async () => {
      try {
        // Récupérer les données de présence par jour
        const responsePresence = await fetch("http://localhost:8080/presence-par-jour");
        const presenceData = await responsePresence.json();
        setPresenceData(presenceData);

        // Récupérer les données de présence par semaine
        const responseWeekly = await fetch("http://localhost:8080/weekly");
        const weeklyData = await responseWeekly.json();

        // Organiser les données dans le format requis par Recharts
        const formattedData = weeklyData.map((item) => {
          const day = item.day;
          const absent = item.count;  // Nombre d'absents pour ce jour (venant de weeklyData)
          const present = presenceData[day.toUpperCase()] - absent; // Présents = présence - absents
          return {
            name: day,
            present: present,  // Nombre d'étudiants présents
            absent: absent,    // Nombre d'étudiants absents
          };
        });

        // Mettre à jour l'état avec les données formatées
        setAttendanceData(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
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
          />
          <Bar
            dataKey="absent"
            fill="#FAD3D4"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
