import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => { 
  try {
    // Get the token from the header
    let token = req.headers.authorization;
    console.log(req.headers);

    // Check if token is present and starts with Bearer
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, No token found"
      });
    }

    // Extract token
    token = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.userId).select("-password");
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}