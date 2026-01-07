import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users,
} from "lucide-react";
import { FaRegEdit } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="hidden md:block fixed h-screen w-[280px] bg-[#1f1f1f] border-r border-gray-700 p-6 pt-12">
      <div className="space-y-4 pt-10">
        {/* Dashboard */}
        <NavLink
          to="/dashboard/sales"
          className={({ isActive }) =>
            `flex items-center gap-3 text-sm font-semibold px-4 py-3 rounded-xl transition-all ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        {/* Add Product */}
        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) =>
            `flex items-center gap-3 text-sm font-semibold px-4 py-3 rounded-xl transition-all ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
            }`
          }
        >
          <PackagePlus className="w-5 h-5" />
          <span>Add Product</span>
        </NavLink>

        {/* Products */}
        <NavLink
          to="/dashboard/admin-product"
          className={({ isActive }) =>
            `flex items-center gap-3 text-sm font-semibold px-4 py-3 rounded-xl transition-all ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
            }`
          }
        >
          <PackageSearch className="w-5 h-5" />
          <span>Products</span>
        </NavLink>

        {/* Users */}
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `flex items-center gap-3 text-sm font-semibold px-4 py-3 rounded-xl transition-all ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span>Users</span>
        </NavLink>

        {/* Edit Profile */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 text-sm font-semibold px-4 py-3 rounded-xl transition-all ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
            }`
          }
        >
          <FaRegEdit className="w-5 h-5" />
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
