import express from "express";
import { listrcbproducts, singlercbproduct, addrcbproduct } from "../Controllers/rcbproducts.js";

const rcbRouter = express.Router();

rcbRouter.post('/addrcb', addrcbproduct);
rcbRouter.get('/rcb', listrcbproducts);
rcbRouter.get('/rcb/:id', singlercbproduct);

export default rcbRouter;
