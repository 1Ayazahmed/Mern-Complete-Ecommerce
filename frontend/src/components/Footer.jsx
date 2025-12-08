import React from "react";
import { Facebook, Instagram, Twitter, Youtube, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#161616] text-gray-400 border-t border-gray-700/60 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">MernEcommerce</h2>
          <p className="text-sm">
            Your one-stop shop for tech, fashion, and lifestyle. Trusted by thousands of happy customers.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-white">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link to="/deals" className="hover:text-white">Deals</Link></li>
            <li><Link to="/signup" className="hover:text-white">Join Now</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/returns" className="hover:text-white">Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Trust & Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Why Shop With Us</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Truck size={16} /> Free Shipping</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} /> Secure Checkout</div>
          </div>
          <div className="flex gap-4 mt-6 text-gray-400">
            <a href="#"><Facebook size={20} className="hover:text-white" /></a>
            <a href="#"><Instagram size={20} className="hover:text-white" /></a>
            <a href="#"><Twitter size={20} className="hover:text-white" /></a>
            <a href="#"><Youtube size={20} className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 text-center text-xs text-gray-600 border-t border-gray-700/40 pt-4">
        © {new Date().getFullYear()} MernEcommerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
