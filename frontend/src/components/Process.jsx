import React from "react";
import { Truck, ShieldCheck, Headphones } from "lucide-react";

const Process = () => {
  return (
    <section className="bg-[#161616] text-white py-12 px-6 border-t border-b border-gray-700/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Free Shipping */}
        <div className="bg-[#1f1f1f] rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
          <Truck className="mx-auto text-blue-400" size={32} />
          <h3 className="mt-4 text-lg font-semibold">Free Shipping</h3>
          <p className="text-gray-400 text-sm">On orders over $50</p>
        </div>

        {/* Secure Payment */}
        <div className="bg-[#1f1f1f] rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
          <ShieldCheck className="mx-auto text-green-400" size={32} />
          <h3 className="mt-4 text-lg font-semibold">Secure Payment</h3>
          <p className="text-gray-400 text-sm">100% secure transactions</p>
        </div>

        {/* 24/7 Support */}
        <div className="bg-[#1f1f1f] rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
          <Headphones className="mx-auto text-purple-400" size={32} />
          <h3 className="mt-4 text-lg font-semibold">24/7 Support</h3>
          <p className="text-gray-400 text-sm">Always here to help</p>
        </div>
      </div>
    </section>
  );
};

export default Process;
