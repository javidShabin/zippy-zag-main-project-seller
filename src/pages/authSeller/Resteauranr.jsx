import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const Restaurant = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [restDetails, setRestDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch seller's restaurant ID
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/seller/profile");
        setRestaurantId(response.data.restaurant);
      } catch (err) {
        console.error("Error fetching restaurant ID:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch restaurant details once restaurantId is available
  useEffect(() => {
    if (!restaurantId) return;

    const getRestaurant = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/restaurant/rest-details/${restaurantId}`
        );
        setRestDetails(response.data);
      } catch (err) {
        console.error("Error fetching restaurant details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getRestaurant();
  }, [restaurantId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {loading ? (
        <p className="text-center text-xl text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-500">Error: {error.message}</p>
      ) : (
        <div className=" w-full flex flex-col md:flex-row justify-between items-center space-x-6">
          {/* Restaurant Image on the left */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <img
              src={restDetails.image}
              alt={restDetails.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Restaurant Details on the right */}
          <div className=" space-y-4">
            <h1 className="text-3xl font-semibold text-gray-800">{restDetails.name}</h1>
            <p className="text-lg text-gray-600">{restDetails.location}</p>
            <p className="text-md text-gray-600">{restDetails.cuisine}</p>

            <div className="text-lg">
              <p
                className={`font-semibold ${restDetails.isOpen ? "text-green-500" : "text-red-500"}`}
              >
                {restDetails.isOpen ? "Open Now" : "Closed"}
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Created At: {new Date(restDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
      <div>
      <button>Open Now</button>
      <button>Close Now</button>
      </div>
    </div>
  );
};

export default Restaurant;
