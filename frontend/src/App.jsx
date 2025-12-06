import React from "react";
// import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Verify from "./pages/Verify.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> <Home />
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
    path: "/signin",
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
