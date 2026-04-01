import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaNewspaper,
  FaImages,
  FaEnvelope,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import VolunteerManagement from "./VolunteerManagement";
import NewsManagement from "./NewsManagement";
import GalleryManagement from "./GalleryManagement";
import MessagesManagement from "./MessagesManagement";
import EventsManagement from "./EventsManagement";

const AdminDashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: "/admin/volunteers", name: "Volunteers", icon: <FaUsers /> },
    { path: "/admin/news", name: "News", icon: <FaNewspaper /> },
    { path: "/admin/gallery", name: "Gallery", icon: <FaImages /> },
    { path: "/admin/messages", name: "Messages", icon: <FaEnvelope /> },
    { path: "/admin/events", name: "Events", icon: <FaCalendarAlt /> },
    { path: "/admin/analytics", name: "Analytics", icon: <FaChartLine /> },
  ];

  return (
    <div className="flex h-screen pt-16">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white transition-all duration-300`}
      >
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full text-left mb-6"
          >
            {sidebarOpen ? "← Collapse" : "→"}
          </button>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-green-700 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.icon}
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="p-8">
          <Routes>
            <Route path="volunteers" element={<VolunteerManagement />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="messages" element={<MessagesManagement />} />
            <Route path="events" element={<EventsManagement />} />
            <Route path="analytics" element={<div>Analytics Dashboard</div>} />
            <Route path="/" element={<VolunteerManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
