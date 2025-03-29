"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Définir un type pour les données
interface ChartData {
  name: string;
  Present: number;
  Absent: number;
}

// Tableau des abréviations des mois
const monthAbbreviations: Record<string, string> = {
  JANVIER: "Jan",
  FÉVRIER: "Feb",
  MARS: "Mar",
  AVRIL: "Apr",
  MAI: "May",
  JUIN: "Jun",
  JUILLET: "Jul",
  AOÛT: "Aug",
  SEPTEMBRE: "Sep",
  OCTOBRE: "Oct",
  NOVEMBRE: "Nov",
  DÉCEMBRE: "Dec",
};

// Fonction pour calculer la présence
const calculatePresence = (presenceData: Record<string, number>, absenceData: Record<string, number>): ChartData[] => {
  return Object.keys(presenceData).map((month) => {
    const monthAbbreviation = monthAbbreviations[month] || month; // Utiliser l'abréviation ou le nom complet si non trouvé
    const present = presenceData[month] - (absenceData[month] || 0);
    return {
      name: monthAbbreviation,
      Present: present,
      Absent: absenceData[month] || 0,
    };
  });
};

const FinanceChart = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Fetch les données de présence et d'absences
    const fetchData = async () => {
      try {
        const presenceResponse = await fetch("http://localhost:8080/presence-par-mois");
        const presenceData = await presenceResponse.json();

        const absenceResponse = await fetch("http://localhost:8080/Absences/month");
        const absenceData = await absenceResponse.json();

        // Calculer la présence
        const formattedData = calculatePresence(presenceData, absenceData);

        // Mettre à jour l'état avec les données calculées
        setData(formattedData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={20} />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line type="monotone" dataKey="Present" stroke="#C3EBFA" strokeWidth={5} />
          <Line type="monotone" dataKey="Absent" stroke="#CFCEFF" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
