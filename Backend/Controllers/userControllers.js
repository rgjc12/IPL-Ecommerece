import User from "../Models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });  
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });        

        if (!user) {
            return res.status(400).json({ success: false, msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Invalid credentials" });
        }

        const token = createToken(user.email);        
        const Number = user.iplTeamNumber;  
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict",
            maxAge: 24*60*60*1000,  
        });

        res.json({ success: true, msg: "Login successful!", token, Number });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error!" });
    }
};
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, msg: "Password is required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, msg: "Please enter a strong password" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ success: false, msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            iplTeamNumber: (Math.floor(Math.random() * 3)),
            cart:[]
        });

        const savedUser = await newUser.save();

        const token = createToken(savedUser.email);
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            msg: "User registered successfully",
            redirectUrl: "/chooseteam",
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: err.message });
    }
};
const updateTeam = async (req, res) => {
    try {
      const email = req.user.email; 
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
  
      res.status(200).json({ success: true, msg: 'Team updated successfully', iplTeamNumber });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  };
  

export { loginUser, registerUser, updateTeam};
