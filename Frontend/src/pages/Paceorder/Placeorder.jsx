import React from 'react';
import "./Placeorder.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Orders from './Orders';
import Checkout from './Checkout';
import { Routes, Route, NavLink,Navigate } from 'react-router-dom';

function Placeorder() {

  return (
    <>
      <Navbar num={0} totalnumberofitems={0} />

      <div id="placeorderbuttons">
        <NavLink to="/placeorder/orders">
          <button className='buttonp'>Orders</button>
        </NavLink>
        <NavLink to="/placeorder/checkout">
          <button className='buttonp'>Checkout</button>
        </NavLink>
      </div>

      <div id="placeordercontent">
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default Placeorder;
