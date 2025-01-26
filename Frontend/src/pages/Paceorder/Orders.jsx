import React, { useState, useEffect } from 'react';
import "./Orders.css"
import { useDispatch, useSelector } from 'react-redux';
import { asyncgetOrders } from '../../store/actions/asynccreateOrder';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state => state.userId.userId);  
  const orders = useSelector(state => state.order.orders);





   useEffect(() => {
    if (userId) {
      dispatch(asyncgetOrders(userId)); 
    }
  }, [dispatch, userId]);

  
  if (!orders) {    
    return (
      <div className="ordersmain">
        <div className="head">Order History</div>
        <div className="noorders">No orders found</div>
      </div>
    );
  }

  return (
    <>
    <div className="ordersmain">
      <div className="head">Order History</div>
      {orders.orders.length===0 && <div className="noorders">No orders found</div>}
      <div className="orders">
        {orders.orders.length>0 && orders.orders.map((order,index)=>(
        <div className="eachorder1" key={index}>
          <div className="eotop">
            <div className="etleft">
            <div className="etdate">
              <div className="etdhead">Order Placed</div>
              <div className="etdtime">{order.createdAt.slice(0,10)}</div>
            </div>
            <div className="ettotal">
              <div className="ed">Total</div>
              <div className="etdtime">Rs.{order.totalAmount}</div>
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
           {order.cartItems.map((item,idx)=>(
            <div className="eobottomitem" key={idx}>
              <div className="eobottomitemleft">
              <div className="eobottomitemimg"><img src={item.imageUrl} alt={item.name} /></div>
              <div className="eobottomitemname">{item.name}</div>
              <div className="eobottomitemquantity"><div className="q1">Quantity</div> <div className="q2">{item.quantity}</div></div>
              <div className="eobottomitemprice"><div className="q1">Price</div> <div className="q2">₹{item.price}</div></div>
              <div className="eobottomitemtotal"><div className="q1">Total</div> <div className="q2">₹{item.price*item.quantity}</div></div>
              </div>
              <div className="eobottomitemright">
                <div className="buyagain"><button className="buyagainbtn" onClick={()=>navigate("/chooseteam")}><i className="ri-shopping-bag-4-line"></i>&nbsp;Buy More</button></div>
              <div className="eobottomitemrating">
                <div className="eobottomitemratinghead">Ratings</div>
                <div className="eobottomitemratingstars">
                  <div className="eobottomitemratingstar"><i className="ri-star-fill"></i></div>
                  <div className="eobottomitemratingstar"><i className="ri-star-fill"></i></div>
                  <div className="eobottomitemratingstar"><i className="ri-star-fill"></i></div>
                  <div className="eobottomitemratingstar"><i className="ri-star-fill"></i></div>
                  <div className="eobottomitemratingstar"><i className="ri-star-fill"></i></div>
                </div>
                <div className="eobottomitemratingreview">
                  <form className="eobottomitemratingreviewform">
                    <textarea className="eobottomitemratingreviewtextarea" placeholder="Write a review" />
                    <button className="eobottomitemratingreviewbtn">Submit</button>
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
    </>
  )
}

export default Orders