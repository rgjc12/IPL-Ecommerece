import express from "express";
import { createReview, getReviews } from "../Controllers/reviewControllers.js";
import protect from "../Middleware/protect.js";

const reviewRouter=express.Router();

reviewRouter.post('/addreview',protect,createReview);
reviewRouter.get('/getreview/:productId',getReviews);

export default reviewRouter;

