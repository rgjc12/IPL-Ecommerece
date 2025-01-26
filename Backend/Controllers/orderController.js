import Order from "../Models/order.js";
import Stripe from "stripe";


const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);



const createOrder= async (req, res) => {
    try {
        const { userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount } = req.body;
        const orderData={
            userId,
            cartItems,
            addressInfo,
            orderStatus:"Order Placed!",
            paymentMethod:"COD",
            paymentStatus:"Pending",
            totalAmount
        }
        const order= new Order(orderData);
        await order.save();
        res.status(200).json({ success: true,message:"Order Placed Successfully!", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating order!" });
    }
};

const createOrderStripe= async (req, res) => {
    try {
        const { userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount } = req.body;
        const {originalUrl}= req.headers;
        const orderData={
            userId,
            cartItems,
            addressInfo,
            orderStatus:"Order Placed!",
            paymentMethod:"Stripe",
            paymentStatus:"Pending",
            totalAmount
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating order!" });
    }
        
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this user!" });
        }
        console.log(orders);
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching orders!" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { orderStatus: status });
        res.status(200).json({ success: true, message: "Order status updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating order status!" });
    }
};
const allOrders= async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching orders!" });
    }
};


export { createOrder,createOrderStripe,userOrders,updateOrderStatus,allOrders };
