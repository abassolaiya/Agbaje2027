import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaCheck, FaReply } from "react-icons/fa";

const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/contact/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const viewMessage = async (message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `/contact/${message._id}`,
          { status: "read" },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        fetchMessages();
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/contact/${selectedMessage._id}`,
        {
          status: "replied",
          reply: replyText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Reply sent successfully");
      setSelectedMessage(null);
      setReplyText("");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to send reply");
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/contact/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Message deleted");
        fetchMessages();
      } catch (error) {
        toast.error("Failed to delete message");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Messages</h1>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Messages</h3>
            <p className="text-3xl font-bold text-green-700">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Unread</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.unread}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Replied</h3>
            <p className="text-3xl font-bold text-blue-600">
              {messages.filter((m) => m.status === "replied").length}
            </p>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                message.status === "unread" ? "bg-blue-50" : ""
              }`}
              onClick={() => viewMessage(message)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FaEnvelope
                      className={`${message.status === "unread" ? "text-blue-500" : "text-gray-400"}`}
                    />
                    <h3 className="font-semibold text-gray-900">
                      {message.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {message.email}
                    </span>
                    {message.phone && (
                      <span className="text-sm text-gray-500">
                        • {message.phone}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">
                    {message.subject || "No subject"}
                  </p>
                  <p className="text-gray-500 line-clamp-2">
                    {message.message}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                    <div className="flex space-x-2">
                      {message.status === "unread" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          Unread
                        </span>
                      )}
                      {message.status === "read" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          Read
                        </span>
                      )}
                      {message.status === "replied" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Replied
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessage(message._id);
                  }}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Message Details
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700">From:</label>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                  {selectedMessage.phone && (
                    <p className="text-gray-600">{selectedMessage.phone}</p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Subject:
                  </label>
                  <p className="text-gray-900">
                    {selectedMessage.subject || "No subject"}
                  </p>
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Message:
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap mt-2">
                    {selectedMessage.message}
                  </p>
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Reply:</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows="5"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Type your reply here..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={sendReply}
                    className="flex items-center space-x-2 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
                  >
                    <FaReply />
                    <span>Send Reply</span>
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManagement;
