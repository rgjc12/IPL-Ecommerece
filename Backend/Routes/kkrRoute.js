import express from "express";
import { listkkrproducts, singlekkrproduct, addkkrproduct } from "../Controllers/kkrproducts.js";
import protect from "../Middleware/protect.js";
import adminProtect from "../Middleware/admin-protect.js";
import upload from "../Middleware/multer.js";

const kkrRouter = express.Router();
kkrRouter.post('/addkkr',adminProtect,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addkkrproduct);

kkrRouter.get('/kkr',protect,listkkrproducts);

kkrRouter.get('/kkr/:id',protect,singlekkrproduct);



export default kkrRouter;