import express from "express";
import {createOrder,createOrderStripe,userOrders,updateOrderStatus} from "../Controllers/orderController.js";
const orderRouter = express.Router();


orderRouter.post("/create-order",createOrder);

orderRouter.post("/create-order-stripe",createOrderStripe);

orderRouter.get("/user-orders/:orderId",userOrders);

orderRouter.put("/update-order-status",updateOrderStatus);
export default orderRouter;
