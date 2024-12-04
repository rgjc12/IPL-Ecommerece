import React, { useContext, useEffect, useRef } from "react";
import "./KKR.css";
import gsap from "gsap";
import Lenis from "lenis";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { AppContext } from "../../../context/AppProvider";
import Product from "../../../components/Product/Product";
import Trending from "../../../components/Trending/Trending";
import Footer from "../../../components/Footer/Footer";

function KKR() {
  const lenis = new Lenis();
  const location = useLocation();
  const kt1 = useRef(null);
  const kt2 = useRef(null);
  const kt3 = useRef(null);
  const kt2i = useRef(null);

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

  const { kkrproducts = [], loading } = useContext(AppContext);
  

  useEffect(() => {
    if (kt1.current && kt2.current && kt3.current && kt2i.current) {
      const tl = gsap.timeline();
      tl.from(kt1.current.querySelectorAll("span"), {
        y: "10vw",
        duration: 1.35,
        ease: "expo.out",
        stagger: 0.3,
      })
        .from(kt2.current.querySelectorAll("span"), {
          y: "10vw",
          duration: 0.89,
          ease: "expo.out",
          stagger: 0.1,
        })
        .from(kt3.current.querySelectorAll("span"), {
          y: "10vw",
          duration: 0.89,
          ease: "expo.out",
          stagger: 0.1,
        })
        .to(kt2i.current, {
          width: "5vw",
          marginRight: "2vw",
          duration: 1.35,
          ease: "elastic.out(1,0.45)",
        });
    }
  }, []); 

  

  return (
    <>
      <Navbar num={0} />
      <div id="kmain">
        <div id="ktop">
          <img src="./Images/KKR/k1.webp" alt="KKR Banner" />
          <div id="ktopl">
            <div id="ktop1" ref={kt1}>
              <span>WELCOME</span>
              <span>&nbsp;TO</span>
            </div>
            <div id="ktop2" ref={kt2}>
              <span>
                <div id="k2img">
                  <img ref={kt2i} src="./Images/KKR/k2.png" alt="KKR Logo" />
                </div>
                KKR
              </span>
            </div>
            <div id="ktop3" ref={kt3}>
              <span>STORE !</span>
            </div>
          </div>
        </div>
        <div id="kmid">
        <Trending num={0} />
        </div>
        <div id="kbot">
          <div className="heading">
            <span>FLAUNT&nbsp;</span><span>YOUR&nbsp;</span><span>FANDOM</span>
          </div>
        <div id="kitems">          
          {kkrproducts.map((item,idx)=>{
            return <Product key={idx} id={item._id} name={item.name} image={item.imageUrl[0]} price={item.price} num={0} />  
          })}
        </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default KKR;
