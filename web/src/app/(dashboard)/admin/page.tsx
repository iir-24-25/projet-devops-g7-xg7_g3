"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import axios from "axios"; // Import axios
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
  const router = useRouter(); // Initialize router for navigation
  const [authToken, setAuthToken] = useState<string | null>(null); // Store token state
  const [counts, setCounts] = useState({
    studentCount: 0,
    teacherCount: 0,
    parentCount: 0,
    staffCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch authToken from localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token); // Set authToken if present
  }, []);

  // Redirect to login if no authToken
  useEffect(() => {
    if (!authToken) {
      router.push("/login");
    }
  }, [authToken, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/numberPersonneByType", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        // Set the counts based on the API response
        setCounts({
          studentCount: response.data.Etudiant || 0,
          teacherCount: response.data.Professeur || 0,
          parentCount: response.data.Parents || 0,
          staffCount: response.data.Admin || 0,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to default values if the API request fails
        setCounts({
          studentCount: 1200,
          teacherCount: 150,
          parentCount: 900,
          staffCount: 80,
        });
        setLoading(false);
      }
    };

    if (authToken) {
      fetchData(); // Only fetch if authToken exists
    } else {
      setLoading(false); // Stop loading if no token
    }
  }, [authToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 flex gap-4 flex-col md:flex-row overflow-auto">
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            <div className="flex gap-4 justify-between flex-wrap">
              <UserCard
                type="student"
                style={{ backgroundColor: "#c7fceb" }}
                nbretudiant={counts.studentCount.toString()}
                imageSrc="/stud.gif"
                alt="Students"
                width={100}
                height={50}
              />
              <UserCard
                type="teacher"
                style={{ backgroundColor: "#FAD3D4" }}
                nbrprof={counts.teacherCount.toString()}
                imageSrc="/prof.gif"
                alt="Teachers"
                width={70}
                height={50}
              />
              <UserCard
                type="parent"
                style={{ backgroundColor: "#fcfcd4" }}
                nbrparent={counts.parentCount.toString()}
                imageSrc="/paren.gif"
                alt="Parents"
                width={80}
                height={60}
              />
              <UserCard
                type="staff"
                style={{ backgroundColor: "#D3F7FA" }}
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
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
