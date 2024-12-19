import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react"; // Import the Trash icon
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const MenuList = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch seller's restaurant ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/seller/profile");
        setRestaurantId(response.data.restaurant);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch menu list when restaurantId is available
  useEffect(() => {
    if (!restaurantId) return;

    const getMenuList = async () => {
      try {
        const response = await axiosInstance.get(`/menu/menu/${restaurantId}`);
        setMenu(response.data.menus);
      } catch (error) {
        setError(error);
      }
    };
    getMenuList();
  }, [restaurantId]);

  // Handle menu removal
  const handleRemoveMenu = async ({ menuId }) => {
    try {
      await axiosInstance.delete(`/menu/remove-menu/${menuId}`);
      setMenu((prevMenus) => prevMenus.filter((menu) => menu._id !== menuId));
      toast.success("Menu removed successfully.");
    } catch (error) {
      setError(error);
      toast.error("Failed to remove the menu.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading menus...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Menu List</h1>
        <button
          onClick={() => navigate("/seller/create-menu")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Menu
        </button>
      </div>
      {menus.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {menu.name}
                </h2>
                <p className="text-gray-600 mb-2">{menu.description}</p>
                <p className="text-lg font-bold text-green-600">₹{menu.price}</p>
              </div>
              <button
                onClick={() => handleRemoveMenu({ menuId: menu._id })}
                className="flex items-center text-red-600 hover:text-red-800 mt-4"
              >
                <Trash className="w-5 h-5 mr-1" />
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No menus available.</p>
      )}
    </div>
  );
};

export default MenuList;
