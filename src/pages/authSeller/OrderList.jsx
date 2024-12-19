import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

const OrderList = () => {
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/seller/profile');
        setRestaurantId(response.data.restaurant);
        console.log(response, '==der');
      } catch (err) {
        console.error('Error fetching restaurant ID:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getOrderList = async () => {
      if (!restaurantId) return; // Wait until restaurantId is available
      try {
        const response = await axiosInstance.get(`/payment/orderBy-restaurant/${restaurantId}`);
        console.log(response, '==details');
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    };
    getOrderList();
  }, [restaurantId]); // Added restaurantId as a dependency

  return <div></div>;
};

export default OrderList;
