import React, { useState, useRef } from 'react';
import "./Sidemenu.css";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { NavLink } from 'react-router-dom';



function Sidemenu() {
  const [activeMenu, setActiveMenu] = useState(localStorage.getItem('activeMenu')||null);
  
  const smenu1 = useRef(null);
  const smenu2 = useRef(null);
  const smenu3 = useRef(null);
  const smenu4 = useRef(null);
  const i1 = useRef(null);
  const i2 = useRef(null);
  const i3 = useRef(null);
  const i4 = useRef(null);

  useGSAP(() => {
    smenu1.current.addEventListener('mouseenter', () => {
      gsap.to(i1.current, {scale: 1.05, duration: 0.3, ease:"expo.out"});
    });
    smenu1.current.addEventListener('mouseleave', () => {
      gsap.to(i1.current, {scale: 1, duration: 0.3, ease:"expo.out"});
    });
    smenu2.current.addEventListener('mouseenter', () => {
      gsap.to(i2.current, {scale: 1.07, duration: 0.3, ease:"expo.out"});
    });
    smenu2.current.addEventListener('mouseleave', () => {
      gsap.to(i2.current, {scale: 1, duration: 0.3, ease:"expo.out"});
    });
    smenu3.current.addEventListener('mouseenter', () => {
        gsap.to(i3.current, {scale: 1.07, duration: 0.3, ease:"expo.out"});
    });
    smenu3.current.addEventListener('mouseleave', () => {
        gsap.to(i3.current, {scale: 1, duration: 0.3, ease:"expo.out"});
    }); 
    smenu4.current.addEventListener('mouseenter', () => {
        gsap.to(i4.current, {scale: 1.07, duration: 0.3, ease:"expo.out"});
    });
    smenu4.current.addEventListener('mouseleave', () => {
        gsap.to(i4.current, {scale: 1, duration: 0.3, ease:"expo.out"});
    });
  })
  



  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem('activeMenu',menu);
  };

  return (
    <div id="sidemenu">
      <NavLink to="/orders">
      <div
        id="smenu1" ref={smenu1} 
        className={`menu-item1 ${activeMenu === "smenu1" ? "active" : ""}`}
        onClick={() => handleMenuClick("smenu1")}
      >
        <img ref={i1}src="/order.png" alt="Orders" /><h3>Orders</h3> 
      </div>
      </NavLink>
      <NavLink to="/addkkr">
      <div
        id="smenu2" ref={smenu2}
        className={`menu-item2 ${activeMenu === "smenu2" ? "active" : ""}`}
        onClick={() => handleMenuClick("smenu2")}
      >
        <img ref={i2} src="/k1.webp" alt="Add KKR Product" /> Add KKR Product
      </div>
      </NavLink>
      <NavLink to="/addrcb">
      <div
        id="smenu3" ref={smenu3}
        className={`menu-item3 ${activeMenu === "smenu3" ? "active" : ""}`}
        onClick={() => handleMenuClick("smenu3")}
      >
        <img ref={i3} src="/r1.webp" alt="Add RCB Product" /> Add RCB Product
      </div>
      </NavLink>
      <NavLink to="/addmi">
      <div
        id="smenu4" ref={smenu4}
        className={`menu-item4 ${activeMenu === "smenu4" ? "active" : ""}`}
        onClick={() => handleMenuClick("smenu4")}
      >
        <img ref={i4} src="/m1.webp" alt="Add MI Product" /> Add MI Product
      </div>
      </NavLink>
    </div>
  );
}

export default Sidemenu;
