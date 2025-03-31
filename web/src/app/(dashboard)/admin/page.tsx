"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { fetchData } from "@/api/statisticPersonn";

// Type definitions
interface UserData {
  count: number;
}

const AdminPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const studentUrl = 'http://192.168.137.190:8080/numberEtudiant';
  const teacherUrl = 'http://192.168.137.190:8080/numberprof';
  const parentUrl = 'http://192.168.137.190:8080/numberparent';
  const staffUrl = 'http://192.168.137.190:8080/numberstaff';

  // React Query hooks for data fetching
  const { data: studentData, isLoading: studentLoading, error: studentError } = useQuery<UserData>({
    queryKey: ['studentData'],
    queryFn: () => fetchData(studentUrl),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const { data: teacherData, isLoading: teacherLoading, error: teacherError } = useQuery<UserData>({
    queryKey: ['teacherData'],
    queryFn: () => fetchData(teacherUrl),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const { data: parentData, isLoading: parentLoading, error: parentError } = useQuery<UserData>({
    queryKey: ['parentData'],
    queryFn: () => fetchData(parentUrl),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const { data: staffData, isLoading: staffLoading, error: staffError } = useQuery<UserData>({
    queryKey: ['staffData'],
    queryFn: () => fetchData(staffUrl),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Consolidate errors
  useEffect(() => {
    const errors = [studentError, teacherError, parentError, staffError].filter(Boolean);
    if (errors.length > 0) {
      setError("Erreur lors du chargement des données: " + errors[0]?.message);
    }
  }, [studentError, teacherError, parentError, staffError]);

  // Loading state
  const isLoading = studentLoading || teacherLoading || parentLoading || staffLoading;

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-emerald-600 text-white py-2 px-4 rounded"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`hidden lg:block ${isCollapsed ? 'w-20' : 'w-64'} bg-gray-800 transition-all duration-300`}>
        <Menu 
          isCollapsed={isCollapsed} 
          onCollapse={(collapsed: boolean) => setIsCollapsed(collapsed)} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <div className="flex-1 p-4 flex gap-4 flex-col md:flex-row overflow-auto">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <>
              {/* LEFT */}
              <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* USER CARDS */}
                <div className="flex gap-4 justify-between flex-wrap">
                  <UserCard 
                    type="student" 
                    style={{ backgroundColor: '#c7fceb' }} 
                    nbretudiant={(studentData?.count ?? 0).toString()} // Convert number to string
                    imageSrc="/stud.gif" 
                    alt="Students" 
                    width={100} 
                    height={50} 
                  />
                  <UserCard 
                    type="teacher" 
                    style={{ backgroundColor: '#FAD3D4' }} 
                    nbrprof={(teacherData?.count ?? 0).toString()} // Convert number to string
                    imageSrc="/prof.gif" 
                    alt="Teachers" 
                    width={70} 
                    height={50} 
                  />
                  <UserCard 
                    type="parent" 
                    style={{ backgroundColor: '#fcfcd4' }} 
                    nbrparent={(parentData?.count ?? 0).toString()} // Convert number to string
                    imageSrc="/paren.gif" 
                    alt="Parents" 
                    width={80} 
                    height={60} 
                  />
                  <UserCard 
                    type="staff" 
                    style={{ backgroundColor: '#D3F7FA' }} 
                    nbrstaff={(staffData?.count ?? 0).toString()} // Convert number to string
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
