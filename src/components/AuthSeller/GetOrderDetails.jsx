import React from 'react'
import { useParams } from 'react-router-dom'

const GetOrderDetails = () => {
    const {orderId} = useParams()

    console.log(orderId, "==id")
  return (
    <div>
      <h1>The id {orderId}</h1>
    </div>
  )
}

export default GetOrderDetails
