import express from "express";
import {createOrder,createOrderStripe,userOrders,updateOrderStatus,allOrders} from "../Controllers/orderController.js";
const orderRouter = express.Router();


orderRouter.post("/create-order",createOrder);

orderRouter.post("/create-order-stripe",createOrderStripe);

orderRouter.get("/userorders/:userId",userOrders);

orderRouter.put("/update-order-status",updateOrderStatus);

orderRouter.get("/allorders",allOrders);
export default orderRouter;
