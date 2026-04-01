import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All News" },
    { id: "news", name: "News" },
    { id: "press-release", name: "Press Releases" },
    { id: "statement", name: "Statements" },
    { id: "event", name: "Events" },
    { id: "speech", name: "Speeches" },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/news?published=true");
      setNews(response.data.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews =
    selectedCategory === "all"
      ? news
      : news.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            News & Updates
          </h1>
          <p className="text-xl text-gray-600">
            Stay informed about our campaign progress and activities
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category.id
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <motion.article
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {item.featuredImage && (
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-green-700 font-semibold">
                    {categories.find((c) => c.id === item.category)?.name ||
                      item.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(
                      new Date(item.publishedAt || item.createdAt),
                      "MMM dd, yyyy",
                    )}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.excerpt || item.content.substring(0, 150)}...
                </p>
                <a
                  href={`/news/${item.slug}`}
                  className="text-green-700 font-semibold hover:text-green-800"
                >
                  Read More →
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No news articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
