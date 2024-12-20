import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const GetOrderDetails = () => {
  const { orderId } = useParams();
  console.log(orderId, "===id")
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getTheOrderById = async () => {
      try {
        const response = await axiosInstance.get(`/payment/orders/${orderId}`, {
          signal: controller.signal, // Pass abort signal
        });
        setOrderDetails(response.data);
        console.log(response, "===response")
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Request canceled");
        } else {
          setError("Failed to fetch order details");
        }
      } finally {
        setLoading(false);
      }
    };
    getTheOrderById();

    // Cleanup
    return () => controller.abort();
  }, [orderId]);

  if (loading)
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-xl font-semibold text-red-500">
        {error}
      </div>
    );

  // Extract order details
  const order = orderDetails?.order || {};
  const address = order?.address || {};
  const orderStatuses = orderDetails?.order || {};
  const products = order?.products || [];

  // Destructuring address fields
  const {
    name = "Name not available",
    email = "Email not available",
    phone = "Phone not available",
    city = "City not available",
    street = "Street not available",
    postalCode = "Pincode not available",
    country = "Country not available",
  } = address;

  // Destructuring order status fields
  const {
    paymentStatus = "Payment status not available",
    orderStatus = "Order status not available",
  } = orderStatuses;

  return (
    <div className="container mx-auto p-8 bg-gray-50 rounded-xl shadow-xl max-w-6xl">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Order Details
      </h2>

      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Customer Information
          </h3>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <p>
                <strong className="font-medium text-gray-700">Name:</strong>{" "}
                {name}
              </p>
              <p>
                <strong className="font-medium text-gray-700">Email:</strong>{" "}
                {email}
              </p>
            </div>
            <div className="flex space-x-4">
              <p>
                <strong className="font-medium text-gray-700">Phone:</strong>{" "}
                {phone}
              </p>
              <p>
                <strong className="font-medium text-gray-700">City:</strong>{" "}
                {city}
              </p>
            </div>
            <div className="flex space-x-4">
              <p>
                <strong className="font-medium text-gray-700">Street:</strong>{" "}
                {street}
              </p>
              <p>
                <strong className="font-medium text-gray-700">Pincode:</strong>{" "}
                {postalCode}
              </p>
            </div>
            <p>
              <strong className="font-medium text-gray-700">Country:</strong>{" "}
              {country}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p>
            <strong className="font-medium text-gray-700">
              Payment Status:
            </strong>{" "}
            {paymentStatus}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Order Status:</strong>{" "}
            {orderStatus}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">Products:</h3>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.ItemName}
                    className="w-[100px] object-cover rounded-md mb-4"
                  />
                  <h4 className="text-lg font-medium text-gray-800">
                    {product.ItemName}
                  </h4>
                  <p>
                    <strong className="font-medium text-gray-700">
                      Price:
                    </strong>{" "}
                    ₹{product.price}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-700">
                      Quantity:
                    </strong>{" "}
                    {product.quantity}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No products available</p>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Shipped
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Delivered
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetOrderDetails;
