"use client";

import { useState, useEffect } from "react";
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import PieChartComponent from "@/components/PieChartComponent";
import Navbar from "@/components/Navbar";
import DailyAssignments from "@/components/DailyAssignments";
import ConnectedAdmins from "@/components/ConnectedAdmins";

const AdminPage = () => {
  const authToken = localStorage.getItem("authToken");
  // if (authToken == null){
  //   router.push("/login")
  // }
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [counts, setCounts] = useState({
    studentCount: 0,
    teacherCount: 0,
    parentCount: 0,
    staffCount: 0
  });
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/numberPersonneByType", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        
        // Map API response to our state
        setCounts({
          studentCount: data.Etudiant || 0,
          teacherCount: data.Professeur || 0,
          parentCount: data.Parents || 0,
          staffCount: data.Admin || 0
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to default values if API fails
        setCounts({
          studentCount: 1200,
          teacherCount: 150,
          parentCount: 900,
          staffCount: 80
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 flex gap-4 flex-col md:flex-row overflow-auto">
          <>
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
              <div className="flex gap-4 justify-between flex-wrap">
                <UserCard 
                  type="student" 
                  style={{ backgroundColor: '#c7fceb' }} 
                  nbretudiant={counts.studentCount.toString()} 
                  imageSrc="/stud.gif" 
                  alt="Students" 
                  width={100} 
                  height={50} 
                />
                <UserCard 
                  type="teacher" 
                  style={{ backgroundColor: '#FAD3D4' }} 
                  nbrprof={counts.teacherCount.toString()} 
                  imageSrc="/prof.gif" 
                  alt="Teachers" 
                  width={70} 
                  height={50} 
                />
                <UserCard 
                  type="parent" 
                  style={{ backgroundColor: '#fcfcd4' }} 
                  nbrparent={counts.parentCount.toString()} 
                  imageSrc="/paren.gif" 
                  alt="Parents" 
                  width={80} 
                  height={60} 
                />
                <UserCard 
                  type="staff" 
                  style={{ backgroundColor: '#D3F7FA' }} 
                  nbrstaff={counts.staffCount.toString()} 
                  imageSrc="/staf.gif" 
                  alt="Staff" 
                  width={90} 
                  height={120} 
                />
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 h-[450px]">
                  <CountChart />
                </div>
                <div className="w-full lg:w-2/3 h-[450px]">
                  <AttendanceChart />
                </div>
              </div>
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
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              <ConnectedAdmins />
              <EventCalendar />
              <Announcements />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;