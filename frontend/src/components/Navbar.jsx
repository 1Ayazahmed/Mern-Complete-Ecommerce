import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  //   const user = true; // Replace with actual auth logic
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log("User Data", user);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="bg-[#1f1f1f] fixed w-full z-20 border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* logo section */}
        <div className="cursor-pointer">
          <Link to="/">
          <img 
            src="/mernecommerce-logo.png"
            alt="mern-ecommerce Logo"
            className="w-[100px]"
          />
          </Link>
        </div>

        {/* nav section */}
        <nav className="flex gap-10 justify-between items-center">
          <ul className="flex gap-7 items-center text-lg font-medium text-gray-300">
            <Link to="/" className="hover:text-green-400 transition-colors">
              <li>Home</li>
            </Link>
            <Link
              to="/product"
              className="hover:text-green-400 transition-colors"
            >
              <li>Products</li>
            </Link>
            {user && (
              <Link
                to={`/profile/${user._id}`}
                className="hover:text-green-400 transition-colors"
              >
                <li>Hello {user.firstName}</li>
              </Link>
            )}
          </ul>

          <Link
            to="/cart"
            className="relative text-gray-300 hover:text-green-400 transition-colors"
          >
            <ShoppingCart />
            <span className="bg-green-600 rounded-full absolute text-white -top-3 -right-5 px-2 text-sm">
              0
            </span>
          </Link>

          {user ? (
            <Button
              onClick={logoutHandler}
              className="bg-red-600 hover:bg-red-500 text-white cursor-pointer rounded-lg shadow-md transition-all"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate("/login");
              }}
              className="bg-gradient-to-tr from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 text-white cursor-pointer rounded-lg shadow-md transition-all"
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
