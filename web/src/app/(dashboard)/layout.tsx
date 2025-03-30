"use client";

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className={`${isCollapsed ? 'w-[80px]' : 'w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]'} p-4 transition-all duration-300`}>
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className={`${isCollapsed ? 'hidden' : 'font-bold'}`}>SchooLama</span>
        </Link>
        <Menu isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
      </div>
      {/* RIGHT */}
      <div className={`${isCollapsed ? 'w-[calc(100%-80px)]' : 'w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%]'} bg-[#F7F8FA] overflow-scroll flex flex-col transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
}
