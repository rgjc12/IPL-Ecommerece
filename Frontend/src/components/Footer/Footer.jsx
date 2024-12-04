import React, { useState,useRef,useEffect} from "react";
import "./Footer.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link, useLocation } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

function Footer() {
    const p12Ref = useRef(null);
    const fbot=useRef(null);
    const [xval,setx]=useState(0);
    const [yval,sety]=useState(0);


    useEffect(()=>{
        document.addEventListener('mousemove',(e)=>{
         setx(e.clientX-p12Ref.current.getBoundingClientRect().x-p12Ref.current.getBoundingClientRect().width/2);
         sety(e.clientY-p12Ref.current.getBoundingClientRect().y-p12Ref.current.getBoundingClientRect().height/2);
        });
      })
      
      useGSAP(()=>{
        gsap.to(p12Ref.current, {
          transform:`rotateX(${yval/20}deg) rotateY(${xval/15}deg)`,
          ease: "power4.out",
          duration:1.99
        });
      },[xval,yval]);
      const main = document.querySelector('#main');

      useGSAP(()=>{
        gsap.from(p12Ref.current.querySelectorAll('span'), {
            y:"22vw",
            opacity:0,
            stagger:0.25,
            scrollTrigger:{
                trigger:p12Ref.current,
                scroller:main,
                start:"top 70%",
                end:"top 50%",
                scrub: 15,                                
            }

        })
        

       

        
      })

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