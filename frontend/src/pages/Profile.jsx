import React, { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loader2 } from "lucide-react";

// Use public asset by URL. Vite recommends referencing public files by absolute path or using ?url import.
const dummyProfilePic = "/user-dummy-profile.png";

const Profile = () => {
  const params = useParams();
  // support both :userId and :id route params and fall back to logged in user id
    const [loading, setLoading] = useState(false);
  const routeId = params.userId || params.id;
  const userId = routeId || user?._id;
  const { user } = useSelector((store) => store.user);

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || user?.phoneNumber || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    // read profile URL from either backend `profilePic` or frontend `profilePicture`
    profilePicture: user?.profilePicture || user?.profilePic || "",
    role: user?.role || "",
  });

  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  // Keep local form state synced when the authenticated user changes (e.g., after login)
  useEffect(() => {
    if (user) {
      setUpdateUser((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phoneNo: user.phoneNo || user.phoneNumber || prev.phoneNo,
        address: user.address || prev.address,
        city: user.city || prev.city,
        zipCode: user.zipCode || prev.zipCode,
        profilePicture: user.profilePicture || user.profilePic || prev.profilePicture,
        role: user.role || prev.role,
      }));
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setUpdateUser((prev) => ({
      ...prev,
      profilePicture: URL.createObjectURL(selectedFile),
    })); // preview only
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(updateUser);
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (!userId) {
        toast.error("User id not found. Please login or open your profile from your account.");
        return;
      }
      // using formData() for text + file
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("role", updateUser.role);
      
      if(file){
        formData.append("file", file); //image file for backend multer
      }
      // backend route is /update-profile/:id
      setLoading(true);

      const res = await axios.put(`http://localhost:3000/api/v1/users/update-profile/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
        console.log(error);
        const serverMessage = error?.response?.data?.message || error.message || "Profile update failed. Please try again.";
        toast.error(serverMessage);
      
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="pt-20 bg-[#161616] min-h-screen text-white">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto">
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
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser?.profilePicture || dummyProfilePic}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
                  />
                  <Label className="mt-4 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                    Change Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="first-name" className="text-gray-300">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      name="firstName"
                      value={updateUser.firstName || ""}
                      onChange={handleChange}
                      className="bg-[#2a2a2a] border border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="last-name" className="text-gray-300">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      name="lastName"
                      value={updateUser.lastName || ""}
                      onChange={handleChange}
                      className="bg-[#2a2a2a] border border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid gap-3 md:col-span-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={updateUser.email || ""}
                      onChange={handleChange}
                      className="bg-[#2a2a2a] border border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid gap-3 md:col-span-2">
                    <Label htmlFor="phone" className="text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phoneNo"
                      value={updateUser.phoneNo || ""}
                      onChange={handleChange}
                      className="bg-[#2a2a2a] border border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid gap-3 md:col-span-2">
                    <Label htmlFor="address" className="text-gray-300">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={updateUser.address || ""}
                      onChange={handleChange}
                      className="bg-[#2a2a2a] border border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="city" className="text-gray-300">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={updateUser.city || ""}
                      onChange={handleChange}
                      className="bg-[#2a2a2a] border border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="zip" className="text-gray-300">
                      Zip Code
                    </Label>
                    <Input
                      id="zip"
                      name="zipCode"
                      value={updateUser.zipCode || ""}
                      onChange={handleChange}
                      className="bg-[#2a2a2a] border border-gray-600 text-white"
                    />
                  </div>
                </form>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-500 text-white"
              >
                {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Please Wait
              </>
            ) : (
              "Update Profile"
            )}
                {/* Update Profile */}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Orders Tab stays unchanged */}
        <TabsContent value="orders" className="mt-6">
          {/* ... your orders table ... */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
