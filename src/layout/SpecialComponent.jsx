import React from "react";
import { useSelector } from "react-redux";
import Dashbord from "../pages/Dashbord";
import WelcomPage from "../components/WelcomPage";


const SpecialComponent = () => {
  const { isSellerExist } = useSelector((state) => state.seller);
  return <>{isSellerExist ?<Dashbord /> : <WelcomPage />  }</>;
};

export default SpecialComponent;
