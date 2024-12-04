import express from "express";
import { listmiproducts,singlemiproduct,addmiproduct} from "../Controllers/miproducts.js";


const miRouter = express.Router();
miRouter.post('/addmi',addmiproduct);

miRouter.get('/mi',listmiproducts);

miRouter.get('/mi/:id',singlemiproduct);

export default miRouter;