"use client";

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

interface MenuProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/maison.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/professeur.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/eleves.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/classroom.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/book.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = ({ isCollapsed, onCollapse }: MenuProps) => {
  return (
    <div className={`mt-4 text-sm ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
      {/* Collapse Button */}
      <button
        onClick={() => onCollapse(!isCollapsed)}
        className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} mb-4`}
      >
        <svg 
          className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} 
          />
        </svg>
      </button>

      {menuItems.map((i) => (
        <div className={`flex flex-col gap-2 ${isCollapsed ? 'w-full items-center' : ''}`} key={i.title}>
          <span className={`${isCollapsed ? 'hidden' : 'text-gray-400 font-light my-4'}`}>
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center ${
                    isCollapsed 
                      ? 'justify-center w-12 h-12 rounded-full hover:bg-lamaSkyLight' 
                      : 'justify-start gap-4 py-2 px-4 rounded-md hover:bg-lamaSkyLight w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-lamaSkyLight'
                  } text-gray-500 transition-colors duration-200`}
                >
                  <Image 
                    src={item.icon} 
                    alt="" 
                    width={20} 
                    height={20} 
                    className={`${isCollapsed ? 'w-6 h-6' : ''}`}
                  />
                  <span className={`${isCollapsed ? 'hidden' : ''}`}>{item.label}</span>
                </Link>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
