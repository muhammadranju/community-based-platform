"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <>
      <main className="lg:ml-64 p-4 md:p-8 min-h-screen transition-all duration-300">
        <div className="max-w-[1600px] mx-auto">
          <TopBar toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          {children}
        </div>
      </main>
    </>
  );
}

export default DashboardLayout;
