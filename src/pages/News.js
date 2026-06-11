import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";
import {
  useBackgroundImages,
  BackgroundOverlay,
} from "../hooks/useBackgroundImages";

// Placeholder images for different news categories
const placeholderImages = {
  default:
    "https://via.placeholder.com/800x400/008753/ffffff?text=Akeem+Agbaje+News",
  news: "https://via.placeholder.com/800x400/2563eb/ffffff?text=Campaign+News",
  pressRelease:
    "https://via.placeholder.com/800x400/dc2626/ffffff?text=Press+Release",
  statement:
    "https://via.placeholder.com/800x400/f59e0b/ffffff?text=Official+Statement",
  event:
    "https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Campaign+Event",
  speech: "https://via.placeholder.com/800x400/ec4899/ffffff?text=Speech",
  rally: "https://via.placeholder.com/800x400/06b6d4/ffffff?text=Rally",
  community:
    "https://via.placeholder.com/800x400/10b981/ffffff?text=Community+Outreach",
  announcement:
    "https://via.placeholder.com/800x400/6366f1/ffffff?text=Announcement",
};

// Placeholder news data
const placeholderNews = [
  {
    _id: "1",
    title:
      "Barr. Akeem Agbaje Declares Interest in Oyo State Governorship Race",
    excerpt:
      "In a historic declaration, Barr. Akeem Agbaje has officially announced his intention to run for the office of Governor of Oyo State under the platform of the All Progressives Congress (APC)...",
    content: "Full content here...",
    category: "news",
    publishedAt: new Date(2024, 0, 15),
    slug: "akeem-agbaje-declares-governorship-interest",
    featuredImage: placeholderImages.announcement,
  },
  {
    _id: "2",
    title: "APC Leaders Endorse Agbaje as Preferred Candidate for 2027",
    excerpt:
      "Prominent leaders of the All Progressives Congress in Oyo State have thrown their weight behind Barr. Akeem Agbaje, citing his track record of service and commitment to party ideals...",
    content: "Full content here...",
    category: "news",
    publishedAt: new Date(2024, 0, 20),
    slug: "apc-leaders-endorse-agbaje",
    featuredImage: placeholderImages.news,
  },
  {
    _id: "3",
    title: "Agbaje Unveils 5-Point Agenda for Oyo State Development",
    excerpt:
      "The governorship aspirant has presented a comprehensive blueprint focusing on education, healthcare, infrastructure, agriculture, and youth empowerment...",
    content: "Full content here...",
    category: "press-release",
    publishedAt: new Date(2024, 0, 25),
    slug: "agbaje-unveils-5-point-agenda",
    featuredImage: placeholderImages.pressRelease,
  },
  {
    _id: "4",
    title: "Grand Rally in Ibadan Draws Thousands of Supporters",
    excerpt:
      "A massive crowd gathered at the Lekan Salami Stadium as Barr. Akeem Agbaje addressed supporters, outlining his vision for a greater Oyo State...",
    content: "Full content here...",
    category: "event",
    publishedAt: new Date(2024, 1, 1),
    slug: "grand-rally-ibadan-draws-thousands",
    featuredImage: placeholderImages.rally,
  },
  {
    _id: "5",
    title: "Official Statement on Current State of Oyo Politics",
    excerpt:
      "Barr. Akeem Agbaje releases an official statement addressing the political landscape and his commitment to democratic values...",
    content: "Full content here...",
    category: "statement",
    publishedAt: new Date(2024, 1, 5),
    slug: "official-statement-oyo-politics",
    featuredImage: placeholderImages.statement,
  },
  {
    _id: "6",
    title:
      "Agbaje Visits Rural Communities, Pledges Infrastructure Development",
    excerpt:
      "The governorship aspirant toured several rural communities across Oyo State, promising to prioritize road construction and access to clean water...",
    content: "Full content here...",
    category: "news",
    publishedAt: new Date(2024, 1, 10),
    slug: "agbaje-visits-rural-communities",
    featuredImage: placeholderImages.community,
  },
  {
    _id: "7",
    title: "Youth Summit: Empowering the Next Generation of Leaders",
    excerpt:
      "Over 2,000 youths attended the Agbaje Youth Summit, where the aspirant shared his plans for job creation and youth entrepreneurship...",
    content: "Full content here...",
    category: "event",
    publishedAt: new Date(2024, 1, 12),
    slug: "youth-summit-empowering-leaders",
    featuredImage: placeholderImages.event,
  },
  {
    _id: "8",
    title: "Keynote Address at the Oyo State Economic Summit",
    excerpt:
      "Barr. Akeem Agbaje delivered a powerful speech on economic diversification and attracting investments to Oyo State...",
    content: "Full content here...",
    category: "speech",
    publishedAt: new Date(2024, 1, 15),
    slug: "keynote-address-economic-summit",
    featuredImage: placeholderImages.speech,
  },
  {
    _id: "9",
    title: "Women Leaders Rally Support for Agbaje's Governorship Bid",
    excerpt:
      "Women across Oyo State have formed a coalition to support Barr. Akeem Agbaje, citing his commitment to gender equality and women empowerment...",
    content: "Full content here...",
    category: "news",
    publishedAt: new Date(2024, 1, 18),
    slug: "women-leaders-rally-support",
    featuredImage: placeholderImages.community,
  },
];

const News = () => {
  const { currentImages, fadeIn } = useBackgroundImages();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [usePlaceholderData, setUsePlaceholderData] = useState(false);

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
      if (response.data.data && response.data.data.length > 0) {
        setNews(response.data.data);
        setUsePlaceholderData(false);
      } else {
        // Use placeholder data if no real data exists
        setNews(placeholderNews);
        setUsePlaceholderData(true);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      // Use placeholder data on error
      setNews(placeholderNews);
      setUsePlaceholderData(true);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryImage = (category) => {
    switch (category) {
      case "news":
        return placeholderImages.news;
      case "press-release":
        return placeholderImages.pressRelease;
      case "statement":
        return placeholderImages.statement;
      case "event":
        return placeholderImages.event;
      case "speech":
        return placeholderImages.speech;
      default:
        return placeholderImages.default;
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
            {/* {usePlaceholderData && (
              <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm">
                ℹ️ Showing placeholder content. Connect to backend for live
                updates.
              </div>
            )} */}
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
                <img
                  src={
                    item.featuredImage ||
                    getCategoryImage(item.category) ||
                    placeholderImages.default
                  }
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = placeholderImages.default;
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-green-700 font-semibold">
                      {categories.find((c) => c.id === item.category)?.name ||
                        item.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(
                        new Date(
                          item.publishedAt || item.createdAt || Date.now(),
                        ),
                        "MMM dd, yyyy",
                      )}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt ||
                      (item.content && item.content.substring(0, 150)) ||
                      "Read more about this exciting development in Barr. Akeem Agbaje's campaign for a greater Oyo State..."}
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

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles found.</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredNews.length >= 6 && (
            <div className="text-center mt-12">
              <button className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors">
                Load More News
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
