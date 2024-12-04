import React,{ useContext,useEffect,useRef } from 'react';
import './MI.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link, useLocation } from "react-router-dom";
import Navbar from '../../../components/Navbar/Navbar';
import { AppContext } from "../../../context/AppProvider";
import Product from "../../../components/Product/Product";
import Trending from '../../../components/Trending/Trending';
import Footer from '../../../components/Footer/Footer';

function MI() {
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

  const { miproducts = [], loading } = useContext(AppContext);
 





  return (
    <>
      <Navbar num={2} />
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
            <Trending num={2}/>
        </div>
        <div id="mibot">
        <div className="heading2">
            <span>FLAUNT&nbsp;</span><span>YOUR&nbsp;</span><span>FANDOM</span>
          </div>
          <div id="mitems">          
          {miproducts.map((item,idx)=>{
            return <Product key={idx} id={item._id} name={item.name} image={item.imageUrl[0]} price={item.price} num={2} />  
          })}
        </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default MI;
