import React,{ useEffect,useRef,useState } from 'react';
import './MI.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link, useLocation,useNavigate } from "react-router-dom";
import Navbar from '../../../components/Navbar/Navbar';
import Product from "../../../components/Product/Product";
import Trending from '../../../components/Trending/Trending';
import Footer from '../../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { asyncmiproducts } from '../../../store/actions/asyncmiproducts';
import { asyncaddToCart,asyncgetCart } from "../../../store/actions/asyncCart";
import { setTotalNumberOfItems } from "../../../store/Reducers/totalNumberOfItems";

function MI() {
  const lenis = new Lenis();
  const location = useLocation();
  const navigate=useNavigate();
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

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(asyncmiproducts());
  },[]);
  const miproducts = useSelector(state=>state.miproducts.miproducts);
  


  const iplTeamNumber=useSelector(state=>state.num.num);
  const token=useSelector(state=>state.token.token);
  const quantity=1;
  const userId=useSelector(state=>state.userId.userId);
  const cart = useSelector(state => state.cart.cart);
  let [totalnumberofitems,settotalnumberofitems]=useState(0);


  
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


 



  return (
    <>
      <Navbar num={2} totalnumberofitems={totalnumberofitems}/>
      <div id="mimain">
        <div id="mitop">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="./Images/MI/mi1.avif" alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./Images/MI/mi2.avif" alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./Images/MI/mi3.avif" alt="Slide 3" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div id="mimid">
        <Trending num={2} handlebuynow={handlebuynow}/>
        </div>
        <div id="mibot">
        <div className="heading2">
            <span>FLAUNT&nbsp;</span><span>YOUR&nbsp;</span><span>FANDOM</span>
          </div>
          <div id="mitems">          
          {miproducts.data && miproducts.data.map((item,idx)=>{
            return <Product key={idx} id={item._id} name={item.name} image={item.imageUrl[0]} price={item.price} num={2} handleAddToCart={handleAddToCart} userId={userId} iplTeamNumber={iplTeamNumber} handlebuynow={handlebuynow} />  
          })}
        </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default MI;
