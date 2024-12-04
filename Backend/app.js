import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './Config/mongodb.js';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userRoute.js';
import kkrRouter from './Routes/kkrRoute.js';
import miRouter from './Routes/miRoute.js';
import rcbRouter from './Routes/rcbRoute.js';

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173', // The frontend URL
    credentials: true,  // Allow credentials
    methods: 'GET,POST,PUT,DELETE', // Define allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Define allowed headers
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get("/", (req, res) => {
    res.send("Welcome!");
});

app.use('/api/users', userRouter);
app.use('/api/kkrproduct', kkrRouter);
app.use('/api/miproduct', miRouter);
app.use('/api/rcbproduct', rcbRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
