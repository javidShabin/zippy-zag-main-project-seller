import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const response = await axiosInstance.get("/seller/profile");
        setRestaurantId(response.data.restaurant);
        console.log("Restaurant ID fetched:", response.data.restaurant);
      } catch (error) {
        console.error("Error fetching restaurant ID:", error);
      }
    };

    fetchRestaurantId();
  }, []);

  useEffect(() => {
    const fetchOrderList = async () => {
      if (!restaurantId) return; // Ensure restaurantId is available
      try {
        const response = await axiosInstance.get(
          `/payment/orderBy-restaurant/${restaurantId}`
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };

    fetchOrderList();
  }, [restaurantId]);

  return (
    <div className="order-list flex justify-center flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Order List</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="border border-gray-300 px-6 py-3">Order ID</th>
              <th className="border border-gray-300 px-6 py-3">
                Customer Name
              </th>
              <th className="border border-gray-300 px-6 py-3">Total Amount</th>
              <th className="border border-gray-300 px-6 py-3">Status</th>
              <th className="border border-gray-300 px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">{order.address?.name || "N/A"}</td>
                  <td className="px-6 py-4">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        order.orderStatus === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/seller/order-details/${order._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 focus:outline-none py-2 px-4 border border-blue-500 rounded-md transition-colors">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 text-gray-500">
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
