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
const cors = require('cors');
app.use(cors());


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
