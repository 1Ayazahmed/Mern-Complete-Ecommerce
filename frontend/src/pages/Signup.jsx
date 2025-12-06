import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    
}

  return (
    <div className=" flex min-h-screen items-center justify-center bg-[#161616]">
      <Card className="signup-card w-full max-w-sm">
        <CardHeader>
          <CardTitle>SignUp to your account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
       
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Ayaz"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Ahmed"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Create a password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    
                  />

                  {showPassword ? (
                    <EyeOff
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"
                    />
                  ) : (
                    <Eye
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"
                    />
                  )}
                </div>
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={submitHandler} type="submit" className="w-full">
            SignUp
          </Button>
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to={"/signin"}
              className="hover:underline cursor-pointer text-gray-900"
            >
              Signin
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
