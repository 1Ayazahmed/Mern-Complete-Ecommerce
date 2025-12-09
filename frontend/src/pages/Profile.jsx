import React from "react";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="pt-20 bg-[#161616] min-h-screen text-white">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <TabsList className="flex gap-4 border-b border-gray-700/60 pb-2">
          <TabsTrigger
            value="profile"
            className="px-4 py-2 text-sm font-medium text-gray-300 data-[state=active]:text-green-400 data-[state=active]:border-b-2 data-[state=active]:border-green-400"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="px-4 py-2 text-sm font-medium text-gray-300 data-[state=active]:text-green-400 data-[state=active]:border-b-2 data-[state=active]:border-green-400"
          >
            Orders
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
       <TabsContent value="profile" className="mt-6">
  <Card className="bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-md">
    <CardHeader>
      <CardTitle className="text-white">Update Profile</CardTitle>
      <CardDescription className="text-gray-400">
        Manage your account details and profile picture.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src="/Rohit2.png"
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
          />
          <Label className="mt-4 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
            Change Picture
            <input type="file" accept="image/*" className="hidden" />
          </Label>
        </div>

        {/* Profile Form */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-3">
            <Label htmlFor="first-name" className="text-gray-300">First Name</Label>
            <Input id="first-name" defaultValue="John" className="bg-[#2a2a2a] border border-gray-600 text-white" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="last-name" className="text-gray-300">Last Name</Label>
            <Input id="last-name" defaultValue="Doe" className="bg-[#2a2a2a] border border-gray-600 text-white" />
          </div>
          <div className="grid gap-3 md:col-span-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input id="email" defaultValue="john.doe@example.com" className="bg-[#2a2a2a] border border-gray-600 text-white" />
          </div>
          <div className="grid gap-3 md:col-span-2">
            <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
            <Input id="phone" placeholder="Enter your Contact No" className="bg-[#2a2a2a] border border-gray-600 text-white" />
          </div>
          <div className="grid gap-3 md:col-span-2">
            <Label htmlFor="address" className="text-gray-300">Address</Label>
            <Input id="address" placeholder="Enter your Address" className="bg-[#2a2a2a] border border-gray-600 text-white" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="city" className="text-gray-300">City</Label>
            <Input id="city" placeholder="Enter your City" className="bg-[#2a2a2a] border border-gray-600 text-white" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="zip" className="text-gray-300">Zip Code</Label>
            <Input id="zip" placeholder="Enter your ZipCode" className="bg-[#2a2a2a] border border-gray-600 text-white" />
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="bg-green-600 hover:bg-green-500 text-white">Update Profile</Button>
    </CardFooter>
  </Card>
</TabsContent>


        {/* Orders Tab */}
        <TabsContent value="orders" className="mt-6">
          <Card className="bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Your Orders</CardTitle>
              <CardDescription className="text-gray-400">
                View your recent purchases and delivery status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs uppercase bg-[#2a2a2a] text-gray-300">
                    <tr>
                      <th scope="col" className="px-4 py-3">Order ID</th>
                      <th scope="col" className="px-4 py-3">Date</th>
                      <th scope="col" className="px-4 py-3">Status</th>
                      <th scope="col" className="px-4 py-3">Total</th>
                      <th scope="col" className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-3">#12345</td>
                      <td className="px-4 py-3">Dec 5, 2025</td>
                      <td className="px-4 py-3 text-green-400">Delivered</td>
                      <td className="px-4 py-3">$129.99</td>
                      <td className="px-4 py-3">
                        <Link to="/orders/12345" className="text-green-400 hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-3">#12346</td>
                      <td className="px-4 py-3">Dec 7, 2025</td>
                      <td className="px-4 py-3 text-yellow-400">Processing</td>
                      <td className="px-4 py-3">$89.50</td>
                      <td className="px-4 py-3">
                        <Link to="/orders/12346" className="text-green-400 hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
