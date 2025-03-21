"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import PieChartComponent from "@/components/PieChartComponent";

// Interface pour les données de l'API
interface PersonData {
  Etudiant: number;
  Professeur: number;
  Parents: number;
  Surveillance: number;
}

// Fonction pour récupérer les données depuis l'API
const fetchData = async (url: string): Promise<PersonData | null> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erreur fetchData:", error);
    return null;
  }
};

const AdminPage = () => {
  const [personData, setPersonData] = useState<PersonData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData("http://localhost:8080/numberPersonneByType");
      if (result) {
        setPersonData(result);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
        <UserCard 
          type="student" 
          style={{ backgroundColor: "#c7fceb" }} 
          nbretudiant={personData?.Etudiant?.toString() ?? "0"} 
          imageSrc="/stud.gif" 
          alt="Student" 
          width={100} 
          height={50} 
        />

        <UserCard 
          type="teacher" 
          style={{ backgroundColor: "#FAD3D4" }} 
          nbrprof={personData?.Professeur?.toString() ?? "0"} 
          imageSrc="/prof.gif" 
          alt="Teacher" 
          width={70} 
          height={50} 
        />

        <UserCard 
          type="parent" 
          style={{ backgroundColor: "#fcfcd4" }} 
          nbrparent={personData?.Parents?.toString() ?? "0"} 
          imageSrc="/paren.gif" 
          alt="Parent" 
          width={80} 
          height={60} 
        />

        <UserCard 
          type="staff" 
          style={{ backgroundColor: "#D3F7FA" }} 
          nbrstaff={personData?.Surveillance?.toString() ?? "0"} 
          imageSrc="/staf.gif" 
          alt="Staff" 
          width={90} 
          height={120} 
        />

        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>

        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
        <div className="w-full h-[450px]">
          <PieChartComponent />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
