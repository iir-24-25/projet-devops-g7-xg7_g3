"use client";

import { useEffect, useState } from 'react';
import { fetchData } from '@/api/statisticPersonn';
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import PieChartComponent from "@/components/PieChartComponent";

const AdminPage = () => {
  const [studentData, setStudentData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [parentData, setParentData] = useState(null);
  const [staffData, setStaffData] = useState(null);

  const studentBaseUrl = 'http://192.168.137.190:8080/numberEtudiant';
  const teacherBaseUrl = 'http://192.168.137.190:8080/numberprof';
  const parentBaseUrl = 'http://192.168.137.190:8080/numberparent';
  const staffBaseUrl = 'http://192.168.137.190:8080/numberstaff';

  useEffect(() => {
    const loadStudentData = async () => {
      const result = await fetchData(studentBaseUrl, 'your-endpoint');
      setStudentData(result);
    };

    const loadTeacherData = async () => {
      const result = await fetchData(teacherBaseUrl, 'your-endpoint');
      setTeacherData(result);
    };

    const loadParentData = async () => {
      const result = await fetchData(parentBaseUrl, 'your-endpoint');
      setParentData(result);
    };

    const loadStaffData = async () => {
      const result = await fetchData(staffBaseUrl, 'your-endpoint');
      setStaffData(result);
    };

    loadStudentData();
    loadTeacherData();
    loadParentData();
    loadStaffData();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
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