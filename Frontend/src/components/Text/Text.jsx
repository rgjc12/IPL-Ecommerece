import React, { useEffect,useRef,useState} from 'react';
import "./Text.css"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
function Text({text}) {
    const p2text=useRef(null);
    const main = document.querySelector('#main');

    useGSAP(()=>{
        gsap.from(p2text.current,{
            transform:'rotateX(70deg)',
            opacity:0,
            duration:1.32,            
        });
    })
  return (
    <>
    <div id="p2text">
        <h1 ref={p2text}>{text}</h1>
    </div>
    </>
  )
}

export default Text