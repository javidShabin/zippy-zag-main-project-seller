import React, { useEffect } from 'react'
import { axiosInstance } from '../../config/axiosInstance'

const OrderList = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/seller/profile");
        setRestaurantId(response.data.restaurant);
        console.log(response, "==der")
      } catch (err) {
        console.error("Error fetching restaurant ID:", err);
        
      }
    };
    fetchData();
  }, []);

    useEffect(()=>{
       const getOrderList = async () => {
        try {
            const response = await axiosInstance.get(`/payment/orderBy-restaurant/${restaurantId}`)
            console.log(response, "==details")
        } catch (error) {
            
        }
       }
       getOrderList()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default OrderList
