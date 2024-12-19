import React, { useEffect } from 'react'
import { axiosInstance } from '../../config/axiosInstance'

const OrderList = () => {
    useEffect(()=>{
       const getOrderList = async () => {
        try {
            const response = await axiosInstance.get("/payment/session-status")
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
