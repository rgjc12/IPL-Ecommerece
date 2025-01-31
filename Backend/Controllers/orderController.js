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

const createOrderStripe = async (req, res) => {
    try {
        const { userId, cartItems, addressInfo, totalAmount } = req.body;
        const { origin } = req.headers;       

        // Prepare order data
        const orderData = {
            userId,
            cartItems,
            addressInfo,
            orderStatus: "Order Placed!",
            paymentMethod: "Stripe",
            paymentStatus: "Pending",
            totalAmount: parseFloat((totalAmount / 85).toFixed(2)),
        };

        // Save the order in the database
        const newOrder = new Order(orderData);
        await newOrder.save();

        // Prepare line items for Stripe
        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 1.17), 
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: Math.round(47.05), 
            },
            quantity: 1,
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        // Respond with the session URL
        res.status(200).json({ success: true, message: "Order Placed Successfully!", session_url: session.url });
    } catch (error) {
        console.error("Error creating Stripe order:", error);
        res.status(500).json({ success: false, message: "Error creating order!" });
    }
};
const verifyStripeOrder= async (req, res) => {
    const {orderId,success,userId}=req.body;
    console.log(orderId,success,userId);
    try{
        if(success==="true"){
            await Order.findByIdAndUpdate(orderId,{paymentStatus:"Paid"});  
            console.log("Order Paid Successfully!");     
            res.status(200).json({success:true,message:"Order Paid Successfully!"});
        }else{
            await Order.findByIdAndDelete(orderId);
            console.log("Order Failed!");
            res.status(200).json({success:false,message:"Order Failed!"});
        }

    }catch(error){
        console.error(error);
        console.log("Error Verifying Order!");
        res.status(500).json({success:false,message:"Error Verifying Order!"});
    }

}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this user!" });
        }
        
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


export { createOrder,createOrderStripe,userOrders,updateOrderStatus,allOrders,verifyStripeOrder };
