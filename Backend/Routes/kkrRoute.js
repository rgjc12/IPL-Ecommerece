import express from "express";
import { listkkrproducts, singlekkrproduct, addkkrproduct } from "../Controllers/kkrproducts.js";


const kkrRouter = express.Router();
kkrRouter.post('/addkkr',addkkrproduct);

kkrRouter.get('/kkr',listkkrproducts);

kkrRouter.get('/kkr/:id',singlekkrproduct);



export default kkrRouter;