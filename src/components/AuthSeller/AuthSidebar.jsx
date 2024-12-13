import React from "react";
import {
  LayoutDashboard,
  List,
  Users,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const AuthSidebar = () => {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/seller/logout",
      });
      toast.success("admin logout");
      console.log("Logout Response:", response);
      navigate("/log-in");
    } catch (error) {
      toast.error("error");
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col sticky top-0">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Zippyzag
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-4 px-4 p-2">
          <Link to={"/"} className="py-2">
            <li className="flex items-center space-x-3 cursor-pointer px-2 hover:bg-gray-700 rounded-md">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to={"/seller/rest-details"} className="p-2">
            <li className="flex items-center space-x-3 cursor-pointer px-2 hover:bg-gray-700 rounded-md">
              <List className="w-5 h-5" />
              <span>Restaurants</span>
            </li>
          </Link>
          <Link to={"/admin/user-list"} className="p-2">
            <li className="flex items-center space-x-3 cursor-pointer px-2 hover:bg-gray-700 rounded-md">
              <Users className="w-5 h-5" />
              <span>Users</span>
            </li>
          </Link>
          <Link to={"/admin/create-restaurant"}>
            <li className="flex items-center space-x-3 cursor-pointer px-2 hover:bg-gray-700 rounded-md">
              <Package className="w-5 h-5" />
              <span>Create restaurant</span>
            </li>
          </Link>

          <li
            onClick={logOut}
            className="flex items-center space-x-3 cursor-pointer px-2 hover:bg-gray-700 rounded-md"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer px-2 hover:bg-gray-700 rounded-md">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AuthSidebar;
