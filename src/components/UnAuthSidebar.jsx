import React from "react";
import { LayoutDashboard, List, Users, Package, Check } from "lucide-react"; // Updated icon imports
import { Link } from "react-router-dom";

const UnAuthSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">Zippyzag</div>
      <nav className="flex-1">
        <ul className="space-y-4 px-4">
          {" "}
          <Link to={"/"}>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </li>
          </Link>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <List className="w-5 h-5" />
            <span>Restaurants</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <Users className="w-5 h-5" />
            <span>Users</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <Package className="w-5 h-5" />
            <span>Orders</span>
          </li>
          <Link to="/sign-up">
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
              <Check className="w-5 h-5" />
              <span>Signup</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default UnAuthSidebar;
