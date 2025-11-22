
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";


export const isAuthenticated = async (req, res, next) => {
  try {
    console.log('[auth] middleware invoked for', req.method, req.path);
    const authHeader = req.headers.authorization;
    console.log('[auth] Authorization header:', authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
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
        return res.status(401).json({
          success: false,
          message: "The Token Has Expired",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Access Token Is Missing or Invalid",
      });
    }
    const user = await User.findById(decode.id);
    console.log('[auth] decoded token:', decode);
    console.log('[auth] user fetched from DB:', user ? user._id : null);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
    req.user = user;
    // keep req.user as the full mongoose document
    console.log('[auth] req.user.role set to:', user.role);
    
    req.id = user._id;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Admin Authorized 

export const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access Denied: Only Admins Allowed",
    });
  }
};
