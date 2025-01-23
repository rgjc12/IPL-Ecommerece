import React,{ useState,useEffect,useRef} from 'react';
import './Navbar.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from 'react-redux';
import { setToken } from '../../store/Reducers/tokenReducer';

gsap.registerPlugin(useGSAP);

function Navbar({ num , totalnumberofitems }) {
  const logos = ["/Images/kkr_logo.png", "/Images/rcb-logo.png","/Images/mi_logo.avif"];
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
  const userId=useSelector(state=>state.userId.userId);
  

const navigate = useNavigate();

 const dispatch=useDispatch();
 num=useSelector(state=>state.num.num);
 const handleLogout = async () => {
  try {
   
      dispatch(setToken(""));
      localStorage.removeItem("token");
      localStorage.removeItem("totalNumberOfItems");
      localStorage.removeItem("iplTeamNumber");
      localStorage.removeItem("userId");
      localStorage.removeItem("cart");
      toast.success("Logged Out!");      
      navigate("/login");
    
  } catch(error) {
    console.log(error);
    toast.error("Server Error!");
  }
}








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
        <div id="nr-t">
        <a href="https://www.facebook.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-facebook-circle-fill"></i></a>
        <a href="https://www.instagram.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-instagram-fill"></i></a>
        <a href="https://www.twitter.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-twitter-x-line"></i></a>
        <a href="https://www.youtube.com" style={{ textDecoration: "none", color: "whitesmoke" }} target="_blank" rel="noopener noreferrer"><i className="ri-youtube-fill"></i></a>
        </div>
        <div id="nr-b">
       <NavLink to="/login" onClick={handleLogout} style={{ textDecoration: "none",color:"whitesmoke"}}>
       <div id="navr-l" ref={nrl}><i className="ri-account-circle-fill"></i>&nbsp;Log Out 
        <div className="nunder1" ref={nund1}></div>
        </div>
        </NavLink> 
        <NavLink to={`/cart/${userId}`}style={{ textDecoration: "none",color:"whitesmoke"}}>
        <div id="navr-r" ref={nrr}><div id="nrrtext"><i className="ri-shopping-bag-4-fill"></i>&nbsp;Cart&nbsp;
        <div id="cartcircle" style={{ background: cartbgSrc,color:cacolorSrc,borderRadius:"6px",padding:"1.2px"}}>{totalnumberofitems}</div></div>
        <div className="nunder2" ref={nund2}></div>
        </div>
        </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
