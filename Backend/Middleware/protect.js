import jwt from "jsonwebtoken";
import User from "../Models/usermodel.js";
import dotenv from 'dotenv';
dotenv.config();


const protect = async (req, res, next) => {    
   
    let token = req.cookies.token;   


    if (!token) {
        console.warn("No auth token provided");
        return res.status(401).json({ success: false, msg: "Please log in to access this resource." });
    }

    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded?.email) {
            return res.status(400).json({ success: false, msg: "Malformed token. Please log in!" });
        }

        const user = await User.findOne({ email: decoded.email }).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found." });
        }
        
        next();
    } 
    catch (err) {
        console.error("Error verifying token:", err);

        if (err.name === "TokenExpiredError") {
            return res.status(403).json({ success: false, msg: "Session expired. Please log in again." });
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(403).json({ success: false, msg: "Invalid token or session expired. Please log in again." });
        }

        res.status(500).json({ success: false, msg: "An error occurred. Please try again later." });
    }
};

export default protect;
