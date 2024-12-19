import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const GetOrderDetails = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const getTheOrderById = async () => {
            try {
                const response = await axiosInstance.get(`/payment/orders/${orderId}`, {
                    signal: controller.signal,
                });
                setOrderDetails(response.data);
            } catch (err) {
                if (err.name === 'CanceledError') {
                    console.log('Request canceled');
                } else {
                    setError('Failed to fetch order details');
                }
            } finally {
                setLoading(false);
            }
        };
        getTheOrderById();

        // Cleanup
        return () => controller.abort();
    }, [orderId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Order Details</h1>
            <p>Order ID: {orderId}</p>
            <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
        </div>
    );
};

export default GetOrderDetails;

