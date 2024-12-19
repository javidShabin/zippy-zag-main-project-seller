import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams } from "react-router-dom";

const Menus = ({ restaurantId }) => {
  const [menus, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the menus for the restaurant
  const getMenuForRestaurant = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/menu/menu/${restaurantId}`,
      });
      console.log(response)
      setMenu(response.data.menus);
    } catch (error) {
      console.error("Error fetching menus", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenuForRestaurant();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg bg-orange-400"></span>
      </div>
    );
  }

  return (
    <section className="py-16 w-[100%]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Explore Our Delicious Menus
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              {menu.image && (
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-56 object-cover rounded-lg mb-6"
                />
              )}
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {menu.name}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{menu.description}</p>
                <p className="text-xl font-bold text-orange-600 mb-4">
                  {`Rs:${menu.price.toFixed(2)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menus;
