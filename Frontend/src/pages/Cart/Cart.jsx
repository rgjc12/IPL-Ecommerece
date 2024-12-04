import React, { useContext, useEffect, useRef, useState } from "react";
import "./Cart.css";
import Lenis from "lenis";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AppContext } from "../../context/AppProvider";


function Cart({e}) {
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



  const {currency,cartItems}=useContext(AppContext);
  const [cartdata,setcartdata] =useState([]);
  
  
  return (
    <>
    </>
  )
}

export default Cart