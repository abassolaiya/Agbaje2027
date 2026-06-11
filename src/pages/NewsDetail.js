import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import {
  useBackgroundImages,
  BackgroundOverlay,
} from "../hooks/useBackgroundImages";

const categoryNames = {
  news: "News",
  "press-release": "Press Release",
  statement: "Statement",
  event: "Event",
  speech: "Speech",
};

const fallbackImage =
  "https://via.placeholder.com/800x400/008753/ffffff?text=Akeem+Agbaje";

const NewsDetail = () => {
  const { slug } = useParams();
  const { currentImages, fadeIn } = useBackgroundImages();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/news/${slug}`);
      if (response.data.success) {
        setArticle(response.data.data);
      } else {
        setError("Article not found");
      }
    } catch (err) {
      console.error("Error fetching article:", err);
      setError(err.response?.data?.message || "Failed to load article");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <>
        <BackgroundOverlay currentImages={currentImages} fadeIn={fadeIn} />
        <div className="relative pt-24 pb-20 min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {error || "Article Not Found"}
            </h1>
            <Link
              to="/news"
              className="text-green-700 font-semibold hover:text-green-800 inline-flex items-center gap-1"
            >
              ← Back to News
            </Link>
          </div>
        </div>
      </>
    );
  }

  const imageUrl = article.imageUrl || fallbackImage;
  const displayDate = article.publishedAt || article.createdAt;
  const formattedDate = displayDate
    ? format(new Date(displayDate), "MMMM dd, yyyy")
    : "Recently";

  return (
    <>
      <BackgroundOverlay currentImages={currentImages} fadeIn={fadeIn} />
      <div className="relative pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-green-700 hover:text-green-800 mb-6"
          >
            ← Back to News
          </Link>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {categoryNames[article.category] || article.category}
              </span>
              <span className="text-gray-500 text-sm">{formattedDate}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {article.title}
            </h1>
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src={imageUrl}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover"
                onError={(e) => (e.target.src = fallbackImage)}
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-green-700"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
