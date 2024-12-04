import React,{ useState,useEffect,useRef,useContext} from 'react';
import './Navbar.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from '../../context/AppProvider';
gsap.registerPlugin(useGSAP);

function Navbar({ num }) {
  const logos = ["./Images/kkr_logo.png", "./Images/rcb-logo.png","./Images/mi_logo.avif"];
  const backgrounds = [
    "linear-gradient(90deg, rgba(58,34,93,1) 51%, rgba(242,191,38,1) 100%)",
    "linear-gradient(90deg,  rgba(29,29,29,1) 16%, rgba(214,12,20,1) 89%)",
    "linear-gradient(90deg, rgba(9,29,80,1) 16%, rgba(12,55,119,1) 55%, rgba(78,149,206,1) 76%, rgba(121,174,217,1) 86%, rgba(135,182,220,1) 100%, rgba(248,248,248,1) 100%)"
  ];
  const cartbg=["#3A225D","#1d1d1d","#091D50"];
  const cacolor=["#F1BE27","#D60C14","whitesmoke"];
  const backgroundStyle = num >= 0 && num < backgrounds.length ? backgrounds[num] : "whitesmoke";
  const logoSrc = num >= 0 && num < logos.length ? logos[num] : null;
  const cartbgSrc=num >= 0 && num < logos.length ? cartbg[num] : null;
  const cacolorSrc=num >= 0 && num < logos.length? cacolor[num] : null;



  

  const navltext=useRef(null);
  const nrl=useRef(null);
  const nrr=useRef(null);
  const nund1=useRef(null);
  const nund2=useRef(null);
  useGSAP(()=>{
    navltext.current.addEventListener("mousemove",()=>{
      gsap.to(navltext.current.querySelectorAll(".navltext1"),{
        y:"-1.9vw",
        ease:"expo.out",
        duration:0.4
      });
    });
    navltext.current.addEventListener("mouseleave",()=>{
      gsap.to(navltext.current.querySelectorAll(".navltext1"),{
        y:"0",
        ease:"expo.out",
        duration:0.4
      });
    });
    nrl.current.addEventListener("mousemove",()=>{
      gsap.to(nund1.current,{
        width:"100%",
        duration:1,
        ease:"expo.out"
      })
    });
    nrl.current.addEventListener("mouseleave",()=>{
      gsap.to(nund1.current,{
        width:"0%",
        duration:1,
        ease:"expo.out"
      })
    });
    nrr.current.addEventListener("mousemove",()=>{
      gsap.to(nund2.current,{
        width:"100%",
        duration:1,
        ease:"expo.out"
      })
    });
    nrr.current.addEventListener("mouseleave",()=>{
      gsap.to(nund2.current,{
        width:"0%",
        duration:1,
        ease:"expo.out"
      })
    });
  })




  const { token,setToken } = useContext(AppContext);
  const handleLogout = () => {
    setToken("");
    toast.success("Logged Out!"); 
    navigate("/login"); 
  };


  return (
    <div id="navbar" style={{ background: backgroundStyle }}>
      <div id="nav-l">
        {logoSrc && <img src={logoSrc} alt="Team Logo" className="logo" />}
        <NavLink to="/chooseteam" style={{ textDecoration: "none" }}>
        <div id="navltext" ref={navltext}>
            <div className="navltext1">CHANGE TEAM <i className="ri-arrow-right-line"></i></div>
            <div className="navltext1">CHANGE TEAM <i className="ri-arrow-right-line"></i></div>
        </div>
        </NavLink>
      </div>
      <div id="nav-r">
       <NavLink to="/login" style={{ textDecoration: "none",color:"whitesmoke"}}>
       <div id="navr-l" ref={nrl} onClick={handleLogout}>Log Out 
        <div className="nunder1" ref={nund1}></div>
        </div>
        </NavLink> 
        <NavLink to="/cart"style={{ textDecoration: "none",color:"whitesmoke"}}>
        <div id="navr-r" ref={nrr}><div id="nrrtext"><i className="ri-shopping-bag-4-fill"></i> Cart&nbsp;
        <div id="cartcircle" style={{ background: cartbgSrc,color:cacolorSrc,borderRadius:"6px",padding:"1.2px"}}>10</div></div>
        <div className="nunder2" ref={nund2}></div>
        </div>
        </NavLink>
        
      </div>
    </div>
  );
}

export default Navbar;
