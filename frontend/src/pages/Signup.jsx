import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const submitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post(`http://localhost:3000/api/v1/users/register`,formData,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(res.data.success){
            // alert("Registration Successful! Please verify your email.");
            navigate("/verify");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        
        
    }
    finally{
        setLoading(false);
    }
    
}


  return (
   <div className="flex min-h-screen items-center justify-center bg-[#161616]">
  <Card className="w-full max-w-sm bg-[#1f1f1f] border border-gray-700 shadow-xl rounded-xl">
    <CardHeader className="text-center">
      <CardTitle className="text-green-400 text-lg font-semibold">
        Sign Up to Your Account
      </CardTitle>
      <CardDescription className="text-gray-400 text-sm">
        Enter your details to create your account
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Ayaz"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="bg-[#2a2a2a] border border-gray-600 text-gray-200 placeholder-gray-500 focus:border-green-400 focus:ring-green-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Ahmed"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="bg-[#2a2a2a] border border-gray-600 text-gray-200 placeholder-gray-500 focus:border-green-400 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-[#2a2a2a] border border-gray-600 text-gray-200 placeholder-gray-500 focus:border-green-400 focus:ring-green-400"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              placeholder="Create a password"
              required
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              className="bg-[#2a2a2a] border border-gray-600 text-gray-200 placeholder-gray-500 focus:border-green-400 focus:ring-green-400"
            />
            {showPassword ? (
              <EyeOff
                onClick={() => setShowPassword(false)}
                className="w-5 h-5 text-gray-400 absolute right-3 bottom-2 cursor-pointer hover:text-green-400"
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(true)}
                className="w-5 h-5 text-gray-400 absolute right-3 bottom-2 cursor-pointer hover:text-green-400"
              />
            )}
          </div>
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex-col gap-3">
      <Button
        onClick={submitHandler}
        type="submit"
        className="w-full bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg shadow-md transition-all duration-200"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" /> Please Wait
          </>
        ) : (
          "Sign Up"
        )}
      </Button>
      <p className="text-gray-400 text-sm">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="hover:underline cursor-pointer text-green-400"
        >
          Sign In
        </Link>
      </p>
    </CardFooter>
  </Card>
</div>

  );
};

export default Signup;
