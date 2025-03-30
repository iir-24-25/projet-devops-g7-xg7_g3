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
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import ConnectedAdmins from "@/components/ConnectedAdmins";
import DailyAssignments from "@/components/DailyAssignments";

<<<<<<< HEAD
// Interface pour les données de l'API
interface PersonData {
  Etudiant: number;
  Professeur: number;
  Parents: number;
  Admin: number;
}
=======
const AdminPage = () => {
  const [studentData, setStudentData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [parentData, setParentData] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
>>>>>>> feat/yassmine/401-modification-prof

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
<<<<<<< HEAD
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
          width={90} 
          height={120} 
        />

        <UserCard 
          type="teacher" 
          style={{ backgroundColor: "#FAD3D4" }} 
          nbrprof={personData?.Professeur?.toString() ?? "0"} 
          imageSrc="/prof.gif" 
          alt="Teacher" 
          width={90} 
          height={120} 
        />

        <UserCard 
          type="parent" 
          style={{ backgroundColor: "#fcfcd4" }} 
          nbrparent={personData?.Parents?.toString() ?? "0"} 
          imageSrc="/paren.gif" 
          alt="Parent" 
          width={90} 
          height={120} 
        />

        <UserCard 
          type="staff" 
          style={{ backgroundColor: "#D3F7FA" }} 
          nbrstaff={personData?.Admin?.toString() ?? "0"} 
          imageSrc="/staf.gif" 
          alt="Admin" 
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
=======
    <div className="flex h-screen">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <div className="flex-1 p-4 flex gap-4 flex-col md:flex-row overflow-auto">
          {/* LEFT */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* USER CARDS */}
            <div className="flex gap-4 justify-between flex-wrap">
              <UserCard type="student" style={{ backgroundColor: '#c7fceb' }} nbretudiant={studentData ?? ''} imageSrc="/stud.gif" alt="" width={100} height={50} />
              <UserCard type="teacher" style={{ backgroundColor: '#FAD3D4' }} nbrprof={teacherData ?? ''} imageSrc="/prof.gif" alt="" width={70} height={50} />
              <UserCard type="parent" style={{ backgroundColor: '#fcfcd4' }} nbrparent={parentData ?? ''} imageSrc="/paren.gif" alt="" width={80} height={60} />
              <UserCard type="staff" style={{ backgroundColor: '#D3F7FA' }} nbrstaff={staffData ?? ''} imageSrc="/staf.gif" alt="" width={90} height={120} />
            </div>
            {/* MIDDLE CHARTS */}
            <div className="flex gap-4 flex-col lg:flex-row">
              {/* COUNT CHART */}
              <div className="w-full lg:w-1/3 h-[450px]">
                <CountChart />
              </div>
              {/* ATTENDANCE CHART */}
              <div className="w-full lg:w-2/3 h-[450px]">
                <AttendanceChart />
              </div>
            </div>
            {/* BOTTOM CHART */}
            <div className="w-full">
              <DailyAssignments />
            </div>
            <div className="w-full h-[450px]">
              <PieChartComponent />
            </div>
            <div className="w-full h-[500px]">
              <FinanceChart />
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <ConnectedAdmins />
            <EventCalendar />
            <Announcements />
          </div>
        </div>
>>>>>>> feat/yassmine/401-modification-prof
      </div>
    </div>
  );
};

export default AdminPage;
