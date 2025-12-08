import React from "react";
import { Link } from "react-router-dom";
import { Star, ShieldCheck, Truck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-[#161616] text-white min-h-[780px] flex items-center px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Upgrade your lifestyle with{" "}
            <span className="text-green-500">exclusive deals</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md">
            Shop the latest electronics, fashion, and more — trusted by thousands of happy customers worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg"
            >
              Start Shopping
            </Link>
            <Link
              to="/deals"
              className="border border-gray-600 text-gray-300 hover:text-green-400 px-8 py-3 rounded-lg transition-all"
            >
              View Deals →
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex gap-8 mt-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-blue-400" /> Free Shipping
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-400" /> Secure Checkout
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-yellow-400" /> 4.8/5 Reviews
            </div>
          </div>
        </div>

        {/* Right Section: Product Showcase */}
        <div className="relative">
          <div className="bg-[#1f1f1f] rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <img
              src="/hero-right.png"
              alt="Featured Product"
              className="w-64 h-64 object-contain mb-6 rounded-lg"
            />
            <h3 className="text-xl font-semibold">Featured Gadget</h3>
            <p className="text-gray-400 text-sm mt-2">Latest tech at unbeatable prices</p>
            <Link
              to="/products/featured"
              className="mt-4 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition-all"
            >
              Shop Now →
            </Link>
          </div>

          {/* Decorative gradient glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-600/30 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Brand Logos Row */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-wrap justify-center gap-6 text-gray-500 text-sm border-t border-gray-700 pt-4">
        <span>Apple</span>
        <span>Samsung</span>
        <span>Nike</span>
        <span>Sony</span>
        <span>Tesla</span>
        <span>LG</span>
      </div>
    </section>
  );
};

export default Hero;
