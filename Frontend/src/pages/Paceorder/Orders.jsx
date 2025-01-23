import React from 'react'
import "./Orders.css"


const Orders = () => {
  return (
    <>
    <div className="ordersmain">
      <div className="head">Order History</div>
      <div className="orders">
        <div className="eachorder1">
          <div className="eotop">
            <div className="etleft">
            <div className="etdate">
              <div className="etdhead">Order Placed</div>
              <div className="etdtime">22/01/2025</div>
            </div>
            <div className="ettotal">
              <div className="ed">Total</div>
              <div className="etdtime">$100</div>
            </div>
            <div className="etstatus">              
              <div className="etdtime">Delivered</div>
            </div>
            </div>
            <div className="etright">
              <div className="orderid">Order ID: 1234567890</div>
              <div className="viewbill">View Bill</div>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default Orders