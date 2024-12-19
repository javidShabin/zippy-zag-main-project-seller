import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'

const GetOrderDetails = () => {
    const {orderId} = useParams()

    useEffect(()=>{
        const getTheOrderById = async () => {
            try {
                const response = await axiosInstance.get(`/payment/orders/${orderId}`)
                console.log(response, "===the response")
            } catch (error) {
                
            }
        }
        getTheOrderById()
    },[])
  return (
    <div>
      <h1>The id {orderId}</h1>
    </div>
  )
}

export default GetOrderDetails
