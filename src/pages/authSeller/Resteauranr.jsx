import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const Restaurant = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [restDetails, setRestDetails] = useState({});

  // Fetch seller's restaurant ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/seller/profile");
        setRestaurantId(response.data.restaurant);
      } catch (err) {
        console.error("Error fetching restaurant ID:", err);
      }
    };
    fetchData();
  }, []);

  // Fetch restaurant details once restaurantId is available
  useEffect(() => {
    if (!restaurantId) return;

    const getRestaurant = async () => {
      try {
        const response = await axiosInstance.get(
          `/restaurant/rest-details/${restaurantId}`
        );
        setRestDetails(response.data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };
    getRestaurant();
  }, [restaurantId]);

  // Handle toggle button for isOpen
  const toggleIsOpen = async () => {
    try {
      const updatedStatus = !restDetails.isOpen; // Toggle the current state
      await axiosInstance.patch(`/restaurant/rest-details/${restaurantId}`, {
        isOpen: updatedStatus,
      });
      setRestDetails((prevDetails) => ({
        ...prevDetails,
        isOpen: updatedStatus,
      }));
      console.log(`Restaurant is now ${updatedStatus ? "Open" : "Closed"}`);
    } catch (err) {
      console.error("Error updating isOpen status:", err);
    }
  };

  // Placeholder for edit button functionality
  const handleEdit = () => {
    console.log("Edit button clicked");
    // Add navigation or modal logic for editing
  };

  return (
    <main className="flex flex-col items-center w-full mt-8 px-4 py-6">
      {/* Top Image Section */}
      <div className="w-full max-w-5xl">
        {restDetails.image && (
          <img
            className="w-full h-[300px] object-cover rounded-t-xl shadow-md"
            src={restDetails.image}
            alt="Restaurant"
          />
        )}
      </div>

      {/* Details Section */}
      <div className="w-full max-w-5xl bg-white rounded-b-xl shadow-md px-6 py-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {restDetails.name || "Loading..."}
            </h1>
            <h2 className="text-lg text-gray-600">{restDetails.location || ""}</h2>
            <p className="text-gray-500">{restDetails.cuisine || ""}</p>
          </div>
          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>
        </div>

        
      </div>
    </main>
  );
};

export default Restaurant;
