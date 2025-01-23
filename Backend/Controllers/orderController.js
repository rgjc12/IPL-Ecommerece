import Order from "../Models/order.js";



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

        const requestBody = {
            intent: "sale",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalAmount.toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: totalAmount.toFixed(2),
                            },
                        },
                    },
                    items: cartItems.map((item) => ({
                        name: item.name,
                        unit_amount: {
                            currency_code: "USD",
                            value: item.price.toFixed(2),
                        },
                        quantity: item.quantity.toString(),
                        sku: item.productId,
                    })),
                },
            ],
            application_context: {
                return_url: `${process.env.CLIENT_URL}/payment/paypal-return`,
                cancel_url: `${process.env.CLIENT_URL}/payment/paypal-cancel`,
            },
        };

        const request = new PayPal.orders.OrdersCreateRequest();
        request.requestBody(requestBody);

        const response = await PayPal.client().execute(request);

        const newlyCreatedOrder = new Order({
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
        });

        await newlyCreatedOrder.save();

        const approvalLink = response.result.links.find((link) => link.rel === "approve");

        if (!approvalLink) {
            return res.status(500).json({ success: false, message: "Approval URL not found!" });
        }

        res.status(200).json({
            success: true,
            approvalURL: approvalLink.href,
            orderId: newlyCreatedOrder._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Payment Unsuccessful!" });
    }
};

const userOrders = async (req, res) => {
    try {
       
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



export { createOrder,createOrderStripe,userOrders,updateOrderStatus };
