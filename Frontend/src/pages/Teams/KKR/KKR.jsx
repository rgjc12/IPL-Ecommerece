import React, {useEffect, useRef ,useState} from "react";
import "./KKR.css";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import Lenis from "lenis";
import {useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Product from "../../../components/Product/Product";
import Trending from "../../../components/Trending/Trending";
import Footer from "../../../components/Footer/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { asyncgetkkrproduct } from '../../../store/actions/asyncgetkkrproduct';
import { asyncaddToCart,asyncgetCart } from "../../../store/actions/asyncCart";
import { setTotalNumberOfItems } from "../../../store/Reducers/totalNumberOfItems";


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

  useGSAP(()=>{
    gsap.set("#navbar",{
      y:"-6.5vw",
      opacity:0,
    })   
    gsap.set(".item-copy-wrapper p",{
      y:"5vw",
      opacity:0,
    })
    gsap.set(".letter-wrapper",{
      y:"20vw",
      
    })
    gsap.defaults({
      duration:1.15,
      ease:"expo.out",
    })
    const tl = gsap.timeline({pause:true,delay:0.5});
    tl.to(".letter-wrapper",{
      y:0,
      stagger:0.15,
      opacity:1,
    }).to(".header-item-1",{
      left:"16.1vw",
    }).to(".header-item-2",{
      right:"5vw",
    },"<")
    .to(".item-main .item-img img",{
      clipPath:"polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      },"<").to(".item-main .item-img img",{
        scale:1,
      }).to(".item-side .item-img",{
        clipPath:"polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        stagger:0.19,
      },"<").to(".kkrheader",{
        bottom:"-10vw",
        scale:2.1
      },"<").to(".item-copy-wrapper p",{
        y:0,
        opacity:1,
        stagger:0.19,
      },"<").to("#navbar",{
        y:0,
        opacity:1,
      },"<")
    
   
  })

  


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncgetkkrproduct());    
  }, []);
  
  
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
  
  
  


  

  const {kkrproducts} = useSelector(state=>state.kkrproducts);

  return (
    <>
      <Navbar num={0} totalnumberofitems={totalnumberofitems}/>
      <div id="kmain">
        <div id="ktop">
          <div id="container">
            <div id="items">
              <div className="item-col">
                <div id="item" className="item-side">
                  <div className="item-copy">
                    <div className="item-copy-wrapper">
                      <p>19. Ramandeep Singh</p>
                    </div>
                    
                  </div>
                  <div className="item-img">
                    <img src="/Images/KKR/k9.jpg"/>
                  </div>
                </div>
                <div id="item" className="item-side">
                <div className="item-copy">
                    <div className="item-copy-wrapper">
                      <p>74. Sunil Narine</p>
                    </div>
                    
                  </div>
                  <div className="item-img">
                    <img src="/Images/KKR/k6.jpg"/>
                  </div>
                </div>
                
              </div>
              <div className="item-col">
                <div id="item" className="item-main">
                  <div className="item-img">
                    <img src="/Images/KKR/k3.jpg"/>
                  </div>
                </div>
              </div>
              <div className="item-col">
              <div id="item" className="item-side">
              <div className="item-copy">
                    <div className="item-copy-wrapper">
                      <p>12. Andre Russell</p>
                    </div>
                   
                  </div>
                  <div className="item-img">
                    <img src="/Images/KKR/k4.jpg"/>
                  </div>
              </div>
              <div id="item" className="item-side">
              <div className="item-copy">
                    <div className="item-copy-wrapper">
                      <p>56. Mitchell Starc</p>
                    </div>
                   
                  </div>
                  <div className="item-img">
                    <img src="/Images/KKR/k8.jpg"/>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
            <div className="kkrheader">
              <div className="header-item header-item-1">
                <div className="letter"><div className="letter-wrapper">K</div></div>
                <div className="letter"><div className="letter-wrapper">K</div></div>
                <div className="letter"><div className="letter-wrapper">R</div></div>
              </div>
              <div className="header-item header-item-2">
                <div className="letter"><div className="letter-wrapper">S</div></div>
                <div className="letter"><div className="letter-wrapper">T</div></div>
                <div className="letter"><div className="letter-wrapper">O</div></div>
                <div className="letter"><div className="letter-wrapper">R</div></div>
                <div className="letter"><div className="letter-wrapper">E</div></div>
              </div>
            </div>
        <div id="kmid">
        <Trending num={0}/>
        </div>
        <div id="kbot">
          <div className="heading">
            <span>FLAUNT&nbsp;</span><span>YOUR&nbsp;</span><span>FANDOM</span>
          </div>
        <div id="kitems">                    
          {kkrproducts.data && kkrproducts.data.map((item,idx)=>{
            return <Product key={idx} id={item._id} name={item.name} image={item.imageUrl[0]} price={item.price} num={0} handleAddToCart={handleAddToCart} userId={userId} iplTeamNumber={iplTeamNumber} />  
          })}
        </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default KKR;
