import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearSeller, saveSeller } from "../redux/features/sellerSlice";
import AuthSidebar from "../components/AuthSeller/AuthSidebar";

const SellerLayout = () => {
  const { isSellerExist } = useSelector((state) => state.seller);
  console.log(isSellerExist);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const checkSeller = async () => {
    try {
      await axiosInstance({
        method: "GET",
        url: "/seller/check-seller",
      });
      dispatch(saveSeller());
    } catch (error) {
      dispatch(clearSeller());
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after checking user
    }
  };
  useEffect(() => {
    checkSeller();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg bg-orange-400"></span>
      </div>
    );
  }
  return (
    <div className="flex h-screen">
  {/* Sidebar Section */}
  
  {isSellerExist ?
      <div className="sticky top-0 w-64 bg-white shadow-lg">
           <AuthSidebar />
      </div>
      : ""}

  {/* Main Content Section */}
  <div className="flex-1 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
</div>

  );
};

export default SellerLayout;
