import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const user = false; // Replace with actual auth logic

  return (
    <header className="bg-[#1f1f1f] fixed w-full z-20 border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* logo section */}
        <div>
          <img src="/mernecommerce-logo.png" alt="mern-ecommerce Logo" className="w-[100px]" />
        </div>

        {/* nav section */}
        <nav className="flex gap-10 justify-between items-center">
          <ul className="flex gap-7 items-center text-lg font-medium text-gray-300">
            <Link to="/" className="hover:text-green-400 transition-colors"><li>Home</li></Link>
            <Link to="/products" className="hover:text-green-400 transition-colors"><li>Products</li></Link>
            {user && (
              <Link to="/profile" className="hover:text-green-400 transition-colors">
                <li>Hello User</li>
              </Link>
            )}
          </ul>

          <Link to="/cart" className="relative text-gray-300 hover:text-green-400 transition-colors">
            <ShoppingCart />
            <span className="bg-green-600 rounded-full absolute text-white -top-3 -right-5 px-2 text-sm">
              0
            </span>
          </Link>

          {user ? (
            <Button className="bg-red-600 hover:bg-red-500 text-white cursor-pointer rounded-lg shadow-md transition-all">
              Logout
            </Button>
          ) : (
            <Button className="bg-gradient-to-tr from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 text-white cursor-pointer rounded-lg shadow-md transition-all">
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
