// components/layout/Dashboard.jsx
import React from 'react';
import Sidebar from "../Global/Sidebar";
import Topbar from "../Global/Topbar";

export default function Dashboard({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
