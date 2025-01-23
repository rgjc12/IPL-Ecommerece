import React, { useState,useRef,useEffect} from "react";
import "./Footer.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

function Footer() {
    const p12Ref = useRef(null);
    const fbot=useRef(null);
    const [xval,setx]=useState(0);
    const [yval,sety]=useState(0);


    useEffect(() => {
      const handleMouseMove = (e) => {
          if (p12Ref.current) {
              const rect = p12Ref.current.getBoundingClientRect();
              setx(e.clientX - rect.x - rect.width / 2);
              sety(e.clientY - rect.y - rect.height / 2);
          }
      };
  
      document.addEventListener('mousemove', handleMouseMove);
  
      
      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
      };
  }, []);
  
      
      useGSAP(()=>{
        gsap.to(p12Ref.current, {
          transform:`rotateX(${yval/20}deg) rotateY(${xval/15}deg)`,
          ease: "power4.out",
          duration:1.99
        });
      },[xval,yval]);  
      
  return (
    <>
    <div id="footer">
        <div id="fmain" ref={p12Ref} >
        <span>I</span><span>P</span><span>L</span><span>Z</span><span>O</span><span>N</span><span>E</span>
        </div>
        <div id="fbot" ref={fbot}>
        <i className="ri-facebook-circle-fill"></i>
        <i className="ri-instagram-fill"></i>
        <i className="ri-linkedin-box-fill"></i>
        <i className="ri-twitter-x-line"></i>
        </div>
    </div>
    </>
  )
}

export default Footer