import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/mongodb.js';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userRoute.js';
import kkrRouter from './Routes/kkrRoute.js';
import miRouter from './Routes/miRoute.js';
import rcbRouter from './Routes/rcbRoute.js';
import cartRouter from './Routes/cartRoute.js';
import addressRouter from './Routes/addressRoute.js';
import cloudinaryConfig from './Config/cloudinary.js';
import orderRouter from './Routes/orderRoutes.js';
const app = express();
const port = process.env.PORT || 8000;

connectDB();
dotenv.config();
cloudinaryConfig();
app.use(cookieParser()); 



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = [
    "https://ipl-ecommerece-frontend.vercel.app", 
      "https://ipl-ecommerece-admin.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174"
];

app.use(cors({
    withCredentials: true,
    origin: function(origin, callback){
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));


  
  


app.get("/", (req, res) => {
    res.send("Welcome!");
});

app.use('/api/users', userRouter);
app.use('/api/kkrproduct',kkrRouter);
app.use('/api/miproduct',miRouter);
app.use('/api/rcbproduct',rcbRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
