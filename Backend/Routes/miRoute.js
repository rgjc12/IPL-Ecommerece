import express from "express";
import { listmiproducts,singlemiproduct,addmiproduct} from "../Controllers/miproducts.js";
import protect from "../Middleware/protect.js"; 
import upload from "../Middleware/multer.js";
import adminProtect from "../Middleware/admin-protect.js";

const miRouter = express.Router();
miRouter.post('/addmi',adminProtect,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addmiproduct);

miRouter.get('/mi',protect,listmiproducts);

miRouter.get('/mi/:id',protect,singlemiproduct);

export default miRouter;