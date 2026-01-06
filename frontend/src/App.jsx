import React from "react";
// import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Verify from "./pages/Verify.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Footer from "./components/Footer.jsx";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import AdminSales from "./pages/admin/AdminSales.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminProduct from "./pages/admin/AdminProduct.jsx";
import ShowUserOrder from "./pages/admin/ShowUserOrder.jsx";
import UserInfo from "./pages/admin/UserInfo.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import SingleProduct from "./pages/SingleProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> <Home /> <Footer />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Signin />
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <Verify />
      </>
    ),
  },
  {
    path: "/verify/:token",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <>
        <ProtectedRoute>
          <Navbar />
          <Profile />
          <Footer />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/product",
    element: (
      <>
        <Navbar />
        <Product />
        <Footer />
      </>
    ),
  },
    {
    path: "/products/:id",
    element: (
      <>
        <Navbar />
        <SingleProduct />
        <Footer />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <ProtectedRoute>

        <Navbar />
        <Cart />
        <Footer />
        </ProtectedRoute>

      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ProtectedRoute adminOnly={true}>
          <Navbar /> 
          <Dashboard />
           <Footer />
        </ProtectedRoute>
      </>
    ),
    children: [
      {
        path: "users/orders/:userId",
        element: <AdminSales />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "user/:Id",
        element: <UserInfo />,
      },
      {
        path: "users/order/:Id",
        element: <ShowUserOrder />,
      },
      {
        path: "admin-product",
        element: <AdminProduct />,
      },
      {
        path: "admin-orders",
        element: <AdminOrders />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      {/* <div>App</div> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
