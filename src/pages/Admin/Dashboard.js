import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FaUsers,
  FaNewspaper,
  FaImages,
  FaEnvelope,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import axios from "axios";

import VolunteerManagement from "./VolunteerManagement";
import NewsManagement from "./NewsManagement";
import GalleryManagement from "./GalleryManagement";
import MessagesManagement from "./MessagesManagement";
import EventsManagement from "./EventsManagement";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const res = await axios.get("/auth/me");
        setUserRole(res.data.data.role);
      } catch (error) {
        console.error("Auth error:", error.response?.status, error.message);
        // Only redirect if token is invalid (401)
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
          navigate("/admin/login");
        } else {
          // Network or server error – assume viewer role to keep dashboard accessible
          setUserRole("viewer");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin/volunteers", name: "Volunteers", icon: <FaUsers /> },
    { path: "/admin/news", name: "News", icon: <FaNewspaper /> },
    { path: "/admin/gallery", name: "Gallery", icon: <FaImages /> },
    { path: "/admin/messages", name: "Messages", icon: <FaEnvelope /> },
    { path: "/admin/events", name: "Events", icon: <FaCalendarAlt /> },
    // { path: "/admin/analytics", name: "Analytics", icon: <FaChartLine /> },
  ];

  if (userRole === "admin") {
    menuItems.push({ path: "/admin/users", name: "Users", icon: <FaUsers /> });
  }

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
            <Route path="users" element={<UserManagement />} />
            <Route path="analytics" element={<div>Analytics Dashboard</div>} />
            <Route path="/" element={<VolunteerManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
