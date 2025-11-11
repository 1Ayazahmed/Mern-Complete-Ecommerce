import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerification/verifyEmail.js";
import { sendOTPMail } from "../emailVerification/sendOTPMail.js";
import {Session} from "../model/sessionModel.js"

import dotenv from "dotenv";
dotenv.config();

// register Controller
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
    const hashedPassword = await bcrypt.hash(password, 10); //hashing the password

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    verifyEmail(token, email);

    newUser.token = token;
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

// Verify Token
export const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400).json({
        success: false,
        message: "Authorization Token Is Invalid or Missing",
      });
    }

    const token = authHeader.split(" ")[1]; // [Bearer, fcggd334hdnb3bgc34]
    let decode;

    try {
      decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration Token Has Expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token Verification Failed",
      });
    }

    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    user.token = null;
    user.isVerified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Again Or Resend Email
export const reVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User Not Found",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    verifyEmail(token, email);
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Verification Email Sent Again Successfully",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill All The Fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Exist",
      });
}
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      if(existingUser.isVerified === false){
        return res.status.json({
            success:false,
            message:"Verify Your Account Then Login"
        })
      }

    // Generate Token
      const accessToken =  jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });
      const refreshToken =  jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });


      existingUser.isLoggedIn = true;
      await existingUser.save();

    //   check for existing Session & deleting it.
      const existingSession = await Session.findOne({userId:existingUser._id})
        if(existingSession){
            await Session.deleteOne({_id: existingSession._id});
        }


        //if the session is not exist.
      await Session.create({userId:existingUser._id})  
      return res.status(200).json({
        success:true,
        message:`Welcome Back ${existingUser.firstName}`,
        user:existingUser,
        accessToken,
        refreshToken
      })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Here is Error From Catch ${error.message}`,
    });
  }
};

// Logout Controller

export const logout = async (req,res)=>{
    try {
        const userID =  req.id;
        // const user = await User.findById(userID);
        await Session.deleteMany({userId:userID})
        await User.findByIdAndUpdate(userID,{isLoggedIn:false})
        return res.status(200).json({
            success:true,
            message:"Logged Out Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

// Forgot Password With OTP Controller 

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        console.log(otp); 
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        await sendOTPMail(otp, email); // Function to send OTP email

        return res.status(200).json({
            success: true,
            message: "OTP Sent to Email Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
} 

// Verify OTP Controller

export const verifyOTP = async (req, res) => {
    try {
        const {otp } = req.body;
        const email = req.params.email;
        if (!otp) {
            return res.status(400).json({ 
                success: false,
                message: "OTP Is Required",
             });
        }

        const user = await User.findOne({ email });

            if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "User Not Found",
             }); 
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid or Expired OTP or OTP Is Not Generated or Already Verified",
             }); 
        }
        if(user.otpExpiry < new Date()){
            return res.status(400).json({ 
                success: false,
                message: "OTP has Expired",
             }); 
        }
        if(otp !== user.otp){
            return res.status(400).json({ 
                success: false,
                message: "Invalid OTP",
             }); 
        } 
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"OTP Verified Successfully"
        })



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })  
    }

}


export const changePassword = async (req,res)=>{
    try {
        const {newPassword,confirmPassword} = req.body;
        const email = req.params.email;

        if(!newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"All Fields Are Required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Password Changed Successfully"
        })
    } catch (error) {
            return res.status(500).json({
            success:false,
            message:error.message
        })  
    }


}