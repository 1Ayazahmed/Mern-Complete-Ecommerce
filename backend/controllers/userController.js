import { User } from "../model/userModel.js";
import  bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await User.create({ firstName, lastName, email, password:hashedPassword });
    await newUser.save();
    console.log("---------------------------------------------------------");

    console.log("\nNew user document created in MongoDB:");
    console.log(JSON.stringify(newUser.toObject(), null, 2));
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

// Note: The registerUser function is already exported using export const above
