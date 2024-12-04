import React,{ useContext,useEffect,useRef } from 'react';
import './RCB.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis'
import { Link, useLocation } from "react-router-dom";
import Navbar from '../../../components/Navbar/Navbar'
import Text from '../../../components/Text/Text';
import { AppContext } from "../../../context/AppProvider";
import Product from "../../../components/Product/Product";
import Trending from '../../../components/Trending/Trending';
import Footer from '../../../components/Footer/Footer';

function RCB() {
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



const rt2=useRef(null);
useGSAP(()=>{
  gsap.from(rt2.current.querySelectorAll('span'),{
    y: "7vw",
    duration: 1.35,
    ease: "expo.out",
    stagger: 0.3,
    delay:1.32
  });
})
const { rcbproducts = [], loading } = useContext(AppContext);

  return (
    <>
    <Navbar num={1}/>
    <div id="rmain">
    <div id="rtop">
      <img src="./Images/RCB/r1.png"/>
      <div id="rttext">
        <div id="rt1"><Text text={"STYLE THAT ROARS,"}/></div>
        <div id="rt2" ref={rt2}><span>#PLAY</span><span>&nbsp;BOLD</span></div>
      </div>
    </div>
    <div id="rmid">
      <Trending num={1}/>
    </div>
    <div id="rbot">
    <div className="heading1">
            <span>FLAUNT&nbsp;</span><span>YOUR&nbsp;</span><span>FANDOM</span>
          </div>
          <div id="ritems">          
          {rcbproducts.map((item,idx)=>{
            return <Product key={idx} id={item._id} name={item.name} image={item.imageUrl[0]} price={item.price} num={1} />  
          })}
        </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default RCB