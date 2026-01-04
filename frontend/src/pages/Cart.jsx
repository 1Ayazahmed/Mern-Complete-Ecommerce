import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import userLogo from "../../public/user-dummy-profile.png";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";

const Cart = () => {
  const { cart } = useSelector((store) => store.products);

  const subtotal = cart?.items?.reduce(
    (acc, item) => acc + item.productId.productPrice * item.quantity,
    0
  );
  const shipping = 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const API = "http://localhost:3000/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
          data: { productId },

      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-20 bg-[#161616] min-h-screen text-white flex justify-center">
      <div className="w-full max-w-7xl px-4">
        {cart?.items?.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold mb-7">Shopping Cart</h1>
            <div className="flex flex-col lg:flex-row gap-7">
              {/* Cart Items */}
              <div className="flex flex-col gap-5 flex-1">
                {cart.items.map((product, index) => (
                  <Card
                    key={index}
                    className="bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg p-5"
                  >
                    <div className="flex justify-between items-center">
                      {/* Product Info */}
                      <div className="flex items-center gap-4 w-[360px]">
                        <img
                          src={
                            product?.productId?.productImg?.[0]?.url || userLogo
                          }
                          alt={product?.productId?.productName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="w-[280px]">
                          <h2 className="font-semibold truncate">
                            {product?.productId?.productName}
                          </h2>
                          <p className="text-green-400 font-bold mt-1">
                            RS {product?.productId?.productPrice} ×{" "}
                            {product?.quantity}
                          </p>
                          <p onClick={() => handleRemove(product?.productId?._id)} className="flex text-red-500 items-center gap-1 cursor-pointer mt-1 text-sm">
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex gap-4 items-center">
                        <Button
                          variant="outline"
                          className="text-white border-gray-600 cursor-pointer"
                          onClick={() =>
                            handleUpdateQuantity(
                              product.productId._id,
                              "decrease"
                            )
                          }
                        >
                          -
                        </Button>
                        <span>{product?.quantity}</span>
                        <Button
                          variant="outline"
                          className="text-white border-gray-600 cursor-pointer"
                          onClick={() =>
                            handleUpdateQuantity(
                              product.productId._id,
                              "increase"
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="w-full max-w-md">
                <Card className="bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-gray-300 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart.items.length} items)</span>
                      <span>RS {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>RS {shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (5%)</span>
                      <span>RS {tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-white border-t border-gray-700 pt-2">
                      <span>Total</span>
                      <span>RS {total.toFixed(2)}</span>
                    </div>

                    {/* Promo Code */}
                    <div className="mt-4">
                      <label className="block mb-2 text-gray-400 text-sm">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          className="flex-1 bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-md"
                        />
                        <Button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">
                          Apply
                        </Button>
                      </div>
                    </div>

                    {/* Place Order */}
                    <Button className="w-full mt-6  bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-medium cursor-pointer">
                      PLACE ORDER
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full mt-6 bg-[#414141] hover:bg-[#2f2f2f] text-white py-2 rounded-lg font-medium cursor-pointer"
                    >
                      <Link to={"/product"}> Continue Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          // If items are not in cart
          <div className="bg-[#161616] min-h-screen flex flex-col items-center justify-center text-white px-4">
            {/* Icon */}
            <div className="bg-green-600 rounded-full p-8 mb-8">
              <ShoppingCart className="w-16 h-16 text-white" />
            </div>

            {/* Message */}
            <h2 className="text-3xl font-semibold mb-3">Your Cart is Empty</h2>
            <p className="text-gray-400 text-base mb-8 text-center max-w-lg">
              Looks like you haven't added anything to your cart yet
            </p>

            {/* CTA Button */}
            <Button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg text-base font-medium cursor-pointer">
              <Link to="/product">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
