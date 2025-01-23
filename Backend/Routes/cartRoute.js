import express from 'express';
import {addToCart,getCart,updateCart,deleteCart,deleteCartAll} from '../Controllers/cartControllers.js';
import protect from '../Middleware/protect.js';

const cartRouter=express.Router();

cartRouter.post('/addtocart',protect,addToCart);
cartRouter.get('/getcart/:userId',protect,getCart);
cartRouter.put('/updatecart',protect,updateCart);
cartRouter.delete('/deletecart/:userId/:productId',protect,deleteCart);
cartRouter.delete('/deletecartall/:userId',protect,deleteCartAll);
export default cartRouter;

