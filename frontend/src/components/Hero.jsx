import React from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Gamepad2,
  Tablet,
  ShoppingBag,
  Laptop,
  Watch,
  Headphones,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-[#161616] text-white h-[780px] flex items-center justify-center px-6 mb-0">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Don't miss out on exclusive deals!
          </h1>
          <p className="text-gray-400 text-base">
            Unlock even more exclusive member deals when you become a MernEcommerce Plus or Diamond member.
          </p>
          <div className="flex gap-4">
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-500 text-white font-medium px-6 py-2 rounded-lg transition-all"
            >
              Shop Now
            </Link>
            <Link
              to="/learn-more"
              className="border border-gray-600 text-gray-300 hover:text-green-400 px-6 py-2 rounded-lg transition-all"
            >
              Learn more →
            </Link>
          </div>
        </div>

        {/* Right Section: stacked cards */}
        <div className="flex flex-col gap-6">
          {/* Top Categories */}
          <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-5 shadow-lg">
            <h3 className="text-green-400 font-semibold text-lg">Top categories</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="flex items-center gap-2"><Monitor size={18} /> Computers</div>
              <div className="flex items-center gap-2"><Tablet size={18} /> Tablets</div>
              <div className="flex items-center gap-2"><Gamepad2 size={18} /> Gaming</div>
              <div className="flex items-center gap-2"><ShoppingBag size={18} /> Fashion</div>
            </div>
            <Link to="/categories" className="mt-4 text-green-400 text-sm hover:underline">
              Shop now →
            </Link>
          </div>

          {/* Consumer Electronics */}
          <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-5 shadow-lg">
            <h3 className="text-green-400 font-semibold text-lg">Shop consumer electronics</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="flex items-center gap-2"><Laptop size={18} /> Laptops</div>
              <div className="flex items-center gap-2"><Tablet size={18} /> Tablets</div>
              <div className="flex items-center gap-2"><Watch size={18} /> Watches</div>
              <div className="flex items-center gap-2"><Headphones size={18} /> Accessories</div>
            </div>
            <Link to="/electronics" className="mt-4 text-green-400 text-sm hover:underline">
              Shop now →
            </Link>
          </div>
        </div>
      </div>
{/* 
      Brand Logos
      <div className="absolute bottom-6 left-0 right-0 flex flex-wrap justify-center gap-6 text-gray-500 text-sm border-t border-gray-700 pt-4">
        <span>Disney</span>
        <span>Samsung</span>
        <span>Nike</span>
        <span>Apple</span>
        <span>LG</span>
        <span>Sony</span>
        <span>Tesla</span>
        <span>Coca-Cola</span>
      </div> */}
    </section>
  );
};

export default Hero;
