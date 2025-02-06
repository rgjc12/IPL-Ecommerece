import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncgetOrders } from "../../store/actions/asynccreateOrder";
import { asyncaddReview } from "../../store/actions/asyncReview";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId.userId);
  const orders = useSelector((state) => state.order.orders);
  
  const [ratings, setRatings] = useState({});
  const [texts, setTexts] = useState({});

  useEffect(() => {
    if (userId) {
      dispatch(asyncgetOrders(userId));
    }
  }, [dispatch, userId]);

  if (!orders) {
    return (
      <div className="ordersmain">
        <div className="headfornoorders">Order History</div>
        <div className="noorders">No orders found</div>
      </div>
    );
  }

 const handleRatingChange = (orderId, productId, newRating) => {
  setRatings((prev) => ({
    ...prev,
    [`${orderId}-${productId}`]: newRating, // Use unique key combining orderId and productId
  }));
};
const handleSubmitReview = async (userId, orderId, productId) => {
  const key = `${orderId}-${productId}`;
  const rating = ratings[key] || 0;
  const text = texts[key] || "";

  if (rating === 0) {
    toast.error("Please provide a rating before submitting the review!");
    return;
  }

  if (text.trim() === "") {
    toast.error("Please write a review before submitting!");
    return;
  }

  console.log("Submitting Review for:", userId, orderId, productId, rating, text);

  try {
    await dispatch(asyncaddReview(userId, productId, rating, text));
    toast.success("Review submitted successfully!");

    // Reset state after successful submission
    setRatings((prev) => ({ ...prev, [key]: 0 }));
    setTexts((prev) => ({ ...prev, [key]: "" }));
  } catch (error) {
    console.error("Error submitting review:", error);
    toast.error("Error submitting review!");
  }
};

  
  return (
    <div className="ordersmain">
      <div className="head">Order History</div>
      {orders.orders.length === 0 && <div className="noorders">No orders found</div>}
      <div className="orders">
        {orders.orders.length > 0 &&
          orders.orders.map((order, index) => (
            <div className="eachorder1" key={index}>
              <div className="eotop">
                <div className="etleft">
                  <div className="etdate">
                    <div className="etdhead">Order Placed</div>
                    <div className="etdtime">{order.createdAt.slice(0, 10)}</div>
                  </div>
                  <div className="ettotal">
                    <div className="ed">Total</div>
                    <div className="etdtime">
                      Rs.{order.paymentMethod === "COD" ? order.totalAmount : (order.totalAmount * 85).toFixed(0)}
                    </div>
                  </div>
                  <div className="epayment">
                    <div className="etdtime">{order.paymentMethod}</div>
                  </div>
                  <div className="etstatus">
                    <div className="etdtime">{order.orderStatus}</div>
                  </div>
                </div>
                <div className="etright">
                  <div className="orderid">Order ID: {order._id}</div>
                  <div className="viewbill">View Bill</div>
                </div>
              </div>
              <div className="eobottom">
                {order.cartItems.map((item, idx) => (
                  <div className="eobottomitem" key={idx}>
                    <div className="eobottomitemleft">
                      <div className="eobottomitemimg">
                        <img src={item.imageUrl} alt={item.name} />
                      </div>
                      <div className="eobottomitemname">{item.name}</div>
                      <div className="eobottomitemquantity">
                        <div className="q1">Quantity</div> <div className="q2">{item.quantity}</div>
                      </div>
                      <div className="eobottomitemprice">
                        <div className="q1">Price</div> <div className="q2">₹{item.price}</div>
                      </div>
                      <div className="eobottomitemtotal">
                        <div className="q1">Total</div> <div className="q2">₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                    <div className="eobottomitemright">
                      <div className="buyagain">
                        <button className="buyagainbtn" onClick={() => navigate("/chooseteam")}>
                          <i className="ri-shopping-bag-4-line"></i>&nbsp;Buy More
                        </button>
                      </div>
                      <div className="eobottomitemrating">
                        <div className="eobottomitemratinghead">Ratings</div>
                        <div className="eobottomitemratingstars">
                        <ReactStars
  count={5}
  value={ratings[`${order._id}-${item.productId}`] || 0} 
  className="responsive-stars"
  color2={"#ffd700"}
  onChange={(newRating) => handleRatingChange(order._id, item.productId, newRating)} // Use productId
/>
                        </div>
                        <div className="eobottomitemratingreview">
                          <form className="eobottomitemratingreviewform">
                          <textarea
  className="eobottomitemratingreviewtextarea"
  placeholder="Write a review..."
  value={texts[`${order._id}-${item.productId}`] || ""} // Ensure state is properly managed
  onChange={(e) =>
    setTexts((prev) => ({
      ...prev,
      [`${order._id}-${item.productId}`]: e.target.value, // Use unique key
    })) // Use productId
  }
/>
                            <button
                              type="button"
                              className="eobottomitemratingreviewbtn"
                              onClick={() => handleSubmitReview(userId, order._id, item.productId)}>
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
