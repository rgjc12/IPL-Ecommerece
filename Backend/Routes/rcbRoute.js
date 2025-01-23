import express from "express";
import { listrcbproducts, singlercbproduct, addrcbproduct } from "../Controllers/rcbproducts.js";
import protect from "../Middleware/protect.js";
import upload from "../Middleware/multer.js";
import adminProtect from "../Middleware/admin-protect.js";
const rcbRouter = express.Router();

rcbRouter.post('/addrcb',adminProtect,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addrcbproduct);
rcbRouter.get('/rcb',protect,listrcbproducts);
rcbRouter.get('/rcb/:id',protect,singlercbproduct);

export default rcbRouter;
