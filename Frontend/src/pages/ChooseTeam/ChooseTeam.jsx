import React, { useState, useEffect, useRef, useContext } from 'react';
import './ChooseTeam.css';
import { Link, useLocation } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { AppContext } from '../../context/AppProvider';
import { toast } from "react-toastify";
import axios from 'axios';
import Footer from '../../components/Footer/Footer';

function ChooseTeam() {
  const lenis = new Lenis();
  const location = useLocation();
  const { setNum, token } = useContext(AppContext); 
  
  const [loading, setLoading] = useState(false);

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

  const t1i = useRef(null);
  const t2i = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(t1i.current.querySelectorAll('span'), {
      y: "8vw",
      duration: 1.35,
      ease: "expo.out",
      stagger: 0.2,
    }).from(t2i.current.querySelectorAll('span'), {
      y: "8vw",
      duration: 1.35,
      ease: "expo.out",
      stagger: 0.2,
    });
  });

  const handleTeamChoice = async (teamNumber) => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:8000/api/users/updateteam',
        { iplTeamNumber: teamNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
    


  
      setNum(teamNumber); 
      if(teamNumber==0)
      toast.success('KKR selected successfully!');
      else if(teamNumber==1)
      toast.success('RCB selected successfully!');
      else if(teamNumber==2)
      toast.success('MI selected successfully!');
    } catch (error) {
      toast.error('Error updating team selection');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div id="choosemain">
        <div id="choosetop">
          <img src="./Images/ipl.svg"/>
          <div id="chtopover">
            <div id="chtext">
              <div id="t1i" ref={t1i}><span>SELECT</span><span>&nbsp;YOUR</span></div>
              <div id="t2i" ref={t2i}><span>FAVOURITE</span><span>&nbsp;TEAM</span></div>
            </div>
            <div id="chcards">
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper5"
              >
                <SwiperSlide> 
                  <div id="card1">
                    <div id="wrapper1">
                      <img src="./Images/ChooseTeam/k1.webp"/>
                    </div>
                    <div id="title1">
                      KOLKATA KNIGHT RIDERS
                    </div>
                    <div id="c1">
                      <img src="./Images/ChooseTeam/k2.png"/>
                    </div>      
                  </div>
                 <Link to="/kkr"><div id="but1" style={{textDecoration: "none!important"}} onClick={() => handleTeamChoice(0)}>CHOOSE</div></Link> 
                </SwiperSlide>
                <SwiperSlide>
                  <div id="card2">
                    <div id="wrapper2">
                      <img src="./Images/ChooseTeam/r1.png"/>
                    </div>
                    <div id="title2">
                      <span>ROYAL CHALLENGERS </span><span>BANGALORE</span>
                    </div>
                    <div id="c2">
                      <img src="./Images/ChooseTeam/r2.png"/>
                    </div>      
                  </div>
                <Link to="/rcb"><div id="but2" style={{textDecoration: "none!important"}} onClick={() => handleTeamChoice(1)}>CHOOSE</div></Link>   
                </SwiperSlide>
                <SwiperSlide>
                  <div id="card3">
                    <div id="wrapper3">
                      <img src="./Images/ChooseTeam/m1.webp"/>
                    </div>
                    <div id="title3">
                      MUMBAI INDIANS
                    </div>
                    <div id="c3">
                      <img src="./Images/ChooseTeam/m2.png"/>
                    </div>      
                  </div>
                  <Link to="/mi"><div id="but3" style={{textDecoration: "none!important"}} onClick={() => handleTeamChoice(2)}>CHOOSE</div></Link>
                </SwiperSlide>       
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ChooseTeam;
