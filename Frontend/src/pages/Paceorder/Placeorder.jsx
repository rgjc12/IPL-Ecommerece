import React, { useEffect } from 'react';
import "./Placeorder.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Orders from './Orders';
import Checkout from './Checkout';
import { Routes, Route, NavLink,Navigate } from 'react-router-dom';
import Lenis from "lenis";
import {useLocation } from "react-router-dom";

function Placeorder() {
  const lenis = new Lenis();
  const location = useLocation();
  useEffect(() => {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [lenis]);
  useEffect(() => {
    lenis.stop();
    window.scrollTo(0, 0);
    lenis.start();
  }, [location]);





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
