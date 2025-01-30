import User from "../Models/usermodel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



const createToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY);  
};
const extractToken = (cookieHeader) => {
    const cookies = cookieHeader.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
    }, {});

   
    return cookies.token;
};
const decodeToken = (token) => {
    try {
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);        
        return decoded.email; // Extract email from the payload
    } catch (error) {
        console.error("Error decoding token:", error.message);
        return null; // Return null if token is invalid or expired
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {       
        let user = await User.findOne({ email });  

        if (!user) {
            return res.status(400).json({ success: false, msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Invalid Credentials" });
        }

        let token = createToken(email);        
        let num = user.iplTeamNumber;  
        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            maxAge: 24*60*60*1000,  
        });
        let userId=user._id.toString();

        res.json({ success: true, msg: "Login successful!", token, num ,userId});

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error! We Can't Login You Now." });
    }
};
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, msg: "Please enter a strong password" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, msg: "User already exists, Please Login!" });
        }

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            iplTeamNumber: Math.floor(Math.random() * 3),
            cart: [],
        });

        let token = createToken(email);
        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });
        
        res.status(200).json({
            success: true,
            msg: "User registered successfully",
            redirectUrl: "/chooseteam",
            token,
            num: user.iplTeamNumber,
            userId: user._id.toString(),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: err.message });
    }
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try{
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){ 
            let token = createToken(email);
            res.cookie("token", token, {
                httpOnly: true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 24*60*60*1000,  
            });
            res.status(200).json({ success: true, msg: "Admin Login successful!", token });
        }
        else{
            res.status(400).json({ success: false, msg: "Invalid Credentials!" });
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({ success: false, msg: err.message });
    }
}

const updateTeam = async (req, res) => {
    try {     
       

       let email = decodeToken(req.headers.authorization.split(" ")[1]);   
       
        const { iplTeamNumber } = req.body;


        if (![0, 1, 2].includes(iplTeamNumber)) {
            return res.status(400).json({ success: false, msg: 'Invalid team number' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }
        user.iplTeamNumber = iplTeamNumber;
        await user.save();

        res.status(200).json({ success: true, iplTeamNumber });
    } catch (error) {
        
        console.error("Error in updateTeam:", error);

        
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, msg: "Invalid token or session expired. Please log in again." });
        }        
        res.status(500).json({ success: false, msg: error.message });
    }
};

const userID = async (req, res) => {
    const {token} = req.body;    
    try{
        const email = decodeToken(token);        
        const user = await User.findOne({ email });     
        console.log(user);
        res.status(200).json({ success: true, userId: user._id.toString() });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, msg: error.message });
    }
}


export { loginUser, registerUser,updateTeam, adminLogin,userID};
