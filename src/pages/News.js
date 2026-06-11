import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";
import {
  useBackgroundImages,
  BackgroundOverlay,
} from "../hooks/useBackgroundImages";

// Category display names
const categoryNames = {
  news: "News",
  "press-release": "Press Release",
  statement: "Statement",
  event: "Event",
  speech: "Speech",
};

// Fallback images per category (in case backend image is missing)
const fallbackImages = {
  default:
    "https://via.placeholder.com/800x400/008753/ffffff?text=Akeem+Agbaje+News",
  news: "https://via.placeholder.com/800x400/2563eb/ffffff?text=Campaign+News",
  "press-release":
    "https://via.placeholder.com/800x400/dc2626/ffffff?text=Press+Release",
  statement:
    "https://via.placeholder.com/800x400/f59e0b/ffffff?text=Official+Statement",
  event:
    "https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Campaign+Event",
  speech: "https://via.placeholder.com/800x400/ec4899/ffffff?text=Speech",
};

const News = () => {
  const { currentImages, fadeIn } = useBackgroundImages();
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
      // Fetch only published news articles
      const response = await axios.get("/news?published=true");
      if (response.data.success && response.data.data) {
        setNews(response.data.data);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get the image URL from the article
  const getArticleImage = (article) => {
    if (article.imageUrl) return article.imageUrl;
    // Fallback based on category
    return fallbackImages[article.category] || fallbackImages.default;
  };

  // Helper to get the display date
  const getDisplayDate = (article) => {
    const date = article.publishedAt || article.createdAt;
    return date ? format(new Date(date), "MMM dd, yyyy") : "Recently";
  };

  // Filter news by selected category
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
    <>
      <BackgroundOverlay currentImages={currentImages} fadeIn={fadeIn} />

      <div className="relative pt-24 pb-20 min-h-screen">
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
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item, index) => (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={getArticleImage(item)}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src =
                        fallbackImages[item.category] || fallbackImages.default;
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-green-700 font-semibold">
                        {categoryNames[item.category] || item.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getDisplayDate(item)}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt ||
                        (item.content && item.content.substring(0, 150)) ||
                        "Click to read more about this update."}
                    </p>
                    <a
                      href={`/news/${item.slug}`}
                      className="text-green-700 font-semibold hover:text-green-800 inline-flex items-center gap-1"
                    >
                      Read More
                      <span className="text-lg">→</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
