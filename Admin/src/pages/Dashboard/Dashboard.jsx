import React from 'react'
import './Dashboard.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidemenu from '../../components/Sidemenu/Sidemenu'
import Footer from '../../components/Footer/Footer'
import {Routes,Route} from 'react-router-dom'
import Orders from '../Orders/Orders'
import AddKKR from '../AddKKR/AddKKR'
import AddRCB from '../AddRCB/AddRCB'
import AddMI from '../AddMI/AddMI'
import Lenis from 'lenis';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard({setToken,token}) {
  const lenis = new Lenis();  const location = useLocation();
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

  return (
    <>
    <Navbar setToken={setToken} token={token}/>
    <div className='dashboard'>
    <Sidemenu/>    
    <Routes>
        <Route path="/orders" element={<Orders token={token}/>}/>
        <Route path="/addkkr" element={<AddKKR token={token}/>}/>
        <Route path="/addrcb" element={<AddRCB token={token}/>}/>
        <Route path="/addmi" element={<AddMI token={token}/>}/>
    </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard