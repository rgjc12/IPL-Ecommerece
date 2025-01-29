import React,{ useState,useEffect } from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ChooseTeam from './pages/ChooseTeam/ChooseTeam';
import KKR from './pages/Teams/KKR/KKR';
import MI from './pages/Teams/MI/MI';
import RCB from './pages/Teams/RCB/RCB';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Paceorder/Placeorder';
import Verify from './pages/Paceorder/Verify';
import Contact from './pages/Contact/Contact';
import EachProduct from './pages/EachProduct/EachProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    
    <>   <ToastContainer /> 
    <div id="main">
      <Routes>
        <Route path='/' element={<Register/>}/>  
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/chooseteam' element={<ChooseTeam/>}/>
        <Route path='/rcb' element={<RCB/>}/>
        <Route path='/kkr' element={<KKR/>}/>
        <Route path='/mi' element={<MI/>}/>        
        <Route path="/product/:id" element={<EachProduct/>}/>       
        <Route path="/cart/:id" element={<Cart/>}/>
        <Route path="/placeorder/*" element={<Placeorder />} />s
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/verify" element={<Verify/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
