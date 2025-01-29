import React,{useEffect,useRef ,useState} from 'react';
import './RCB.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis'
import { Link, useLocation,useNavigate } from "react-router-dom";
import Navbar from '../../../components/Navbar/Navbar'
import Text from '../../../components/Text/Text';
import Product from "../../../components/Product/Product";
import Trending from '../../../components/Trending/Trending';
import Footer from '../../../components/Footer/Footer';
import { asyncgetrcbproducts } from '../../../store/actions/asyncgetrcbproducts';
import { useDispatch, useSelector } from 'react-redux';
import { asyncaddToCart,asyncgetCart } from "../../../store/actions/asyncCart";
import { setTotalNumberOfItems } from "../../../store/Reducers/totalNumberOfItems";



function RCB() {
  const navigate=useNavigate();
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

  const loaderimages = useRef(null);
  const loader = useRef(null);
  useGSAP(()=>{
    gsap.set(".img",{y:"30vw",});
    gsap.set(loaderimages.current,{x:"22vw"});
    gsap.set("#navbar",{y:"-6.5vw"});   
    gsap.set("h1",{y:"-7vw",opacity:0});
    const tl = gsap.timeline({delay:0.6});

    tl.to(".img",{
      y:0,
      duration:0.4,
      stagger:0.25,
      ease:"expo.out",
    }).to(loaderimages.current,{
      x:0,
      duration:2.5,
      ease:"expo.out",
    },"-=1.1").to(".img:not(#loader-logo)",{
      clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0 0%)",
      duration:1.5,
      stagger:0.19,
      ease:"expo.out",
    },"-=1").to(loader.current,{
      clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0 0%)",
      duration:1.59,
      ease:"expo.out",
    },"-=0.3").to("#navbar",{
      y:0,
      opacity:1,
      duration:0.4,
      ease:"expo.out",
    },"-=0.2")
    .to("h1",{
      y:0,
      opacity:1,
      duration:0.45,
      stagger:0.25,
      ease:"expo.out",
    },"-=0.23").to("#rtopfooter .item",{
      clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration:1.59,
      ease:"expo.out",
    })



    

  },[])












const dispatch = useDispatch();
useEffect(()=>{
  dispatch(asyncgetrcbproducts());
},[]);



const iplTeamNumber=useSelector(state=>state.num.num);
const token=useSelector(state=>state.token.token);
const quantity=1;
const userId=useSelector(state=>state.userId.userId);
  const cart = useSelector(state => state.cart.cart);



  let [totalnumberofitems,settotalnumberofitems]=useState(0);
  useEffect(()=>{
    dispatch(asyncgetCart(userId));    
  },[userId])


  useEffect(() => {
    if (Array.isArray(cart)) {
      let total = cart.reduce((acc, item) => acc + item.quantity, 0);
      settotalnumberofitems(total);
      dispatch(setTotalNumberOfItems(total));
      localStorage.setItem('totalNumberOfItems', total);
    }
  }, [cart]);


  const handleAddToCart = (productId,quantity,userId,iplTeamNumber) => {
    dispatch(asyncaddToCart(productId,quantity,userId,iplTeamNumber)); 
    dispatch(asyncgetCart(userId));    
    totalnumberofitems+=quantity;
    dispatch(setTotalNumberOfItems(totalnumberofitems));
    localStorage.setItem('totalNumberOfItems',totalnumberofitems);
  }




  const handlebuynow=(productId,quantity,userId,iplTeamNumber)=>{
    dispatch(asyncaddToCart(productId,quantity,userId,iplTeamNumber)); 
    dispatch(asyncgetCart(userId));    
    totalnumberofitems+=quantity;
    dispatch(setTotalNumberOfItems(totalnumberofitems));
    localStorage.setItem('totalNumberOfItems',totalnumberofitems);
    navigate('/placeorder/checkout');
  }
  
  

const rcbproducts = useSelector(state=>state.rcbproducts.rcbproducts);

  return (
    <>
    <div id="loader" ref={loader} >
      <div id="loader-images" ref={loaderimages}>
        <div className="img" >
          <img src="./Images/RCB/r2.webp"/>
        </div>
        <div className="img">
        <img src="./Images/RCB/r3.webp"/>
        </div>
        <div className="img" >
        <img src="./Images/RCB/r4.avif"/>
        </div>
        <div className="img" id="loader-logo" >
          <img src="./Images/rcb-logo.png"/>
        </div>
        <div className="img" >
        <img src="./Images/RCB/r5.avif"/>
        </div>
        <div className="img" >
        <img src="./Images/RCB/r6.avif"/>
        </div>
        <div className="img" >
        <img src="./Images/RCB/r7.avif"/>
        </div>
      </div>
    </div>
    <Navbar num={1} totalnumberofitems={totalnumberofitems}/>
    <div id="rmain">
    <div id="rtop">
      <div id="rtophero">
        <div className="h1">
          <h1>WEAR YOU PASSION,</h1>
        </div>
        <div className="h1">
          <h1>GAME ON</h1>
          </div>
        <div className="h1">
          <h1><span>#PLAY BOLD</span></h1>
        </div>
      </div>
      <div id="rtopfooter">
        <div id="rfl">
          01
         <div className="item">
          <img src="/Images/RCB/r1.png"/>
         </div>
        </div>
        <div id="rfr">
          02
         <div className="item">
          <video autoPlay muted loop src="/Video/v1.mp4"/>
         </div>
        </div>
         
      </div>
    </div>
    <div id="rmid">
      <Trending num={1} handlebuynow={handlebuynow}/>
    </div>
    <div id="rbot">
    <div className="heading1">
            <span>FLAUNT&nbsp;</span><span>YOUR&nbsp;</span><span>FANDOM</span>
          </div>
          <div id="ritems">          
          {rcbproducts.data && rcbproducts.data.map((item,idx)=>{
            return <Product key={idx} id={item._id} name={item.name} image={item.imageUrl[0]} price={item.price} num={1} handleAddToCart={handleAddToCart} userId={userId} iplTeamNumber={iplTeamNumber} handlebuynow={handlebuynow} />  
          })}
        </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default RCB