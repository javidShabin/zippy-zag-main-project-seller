import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const OrderList = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/seller/profile");
        setRestaurantId(response.data.restaurant);
        console.log(response, "==der");
      } catch (err) {
        console.error("Error fetching restaurant ID:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getOrderList = async () => {
      if (!restaurantId) return; // Wait until restaurantId is available
      try {
        const response = await axiosInstance.get(
          `/payment/orderBy-restaurant/${restaurantId}`
        );
        setOrder(response.data.orders);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    getOrderList();
  }, [restaurantId]); // Added restaurantId as a dependency

  return (
    <div className="order-list flex justify-center flex-col items-center p-6 bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl font-bold mb-6 text-gray-700">Order List</h2>
  <div className="w-full overflow-x-auto">
    <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="border border-gray-300 px-6 py-3">Order ID</th>
          <th className="border border-gray-300 px-6 py-3">Customer Name</th>
          <th className="border border-gray-300 px-6 py-3">Total Amount</th>
          <th className="border border-gray-300 px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {order.length > 0 ? (
          order.map((o) => (
            <tr
              key={o._id}
              className="border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <td className="px-6 py-4">{o._id}</td>
              <td className="px-6 py-4">{o.address.name}</td>
              <td className="px-6 py-4">${o.totalAmount}</td>
              <td className="px-6 py-4">
                <span
                  className={`py-1 px-3 rounded-full text-xs ${
                    o.orderStatus === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {o.orderStatus}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="text-center px-6 py-4 text-gray-500"
            >
              No orders found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default OrderList;
