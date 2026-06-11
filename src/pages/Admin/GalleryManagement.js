import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "campaign",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/gallery", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(response.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", selectedFile);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("category", formData.category);

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("/gallery", uploadData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type
        },
      });
      toast.success("Image uploaded successfully");
      setFormData({ title: "", description: "", category: "campaign" });
      setSelectedFile(null);
      fetchImages();
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/gallery/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Image deleted successfully");
        fetchImages();
      } catch (error) {
        toast.error("Failed to delete image");
      }
    }
  };

  const handleSetFeatured = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/gallery/${id}/featured`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Featured image updated");
      fetchImages();
    } catch (error) {
      toast.error("Failed to set featured image");
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Gallery Management
      </h1>

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload New Image</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image File *
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="campaign">Campaign</option>
              <option value="events">Events</option>
              <option value="meetings">Meetings</option>
              <option value="community">Community</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image._id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 truncate">
                {image.title || "Untitled"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{image.category}</p>
              <div className="flex justify-between mt-3">
                {!image.featured && (
                  <button
                    onClick={() => handleSetFeatured(image._id)}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Set Featured
                  </button>
                )}
                {image.featured && (
                  <span className="text-sm text-yellow-600">Featured</span>
                )}
                <button
                  onClick={() => handleDelete(image._id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManagement;
