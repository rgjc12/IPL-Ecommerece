import React,{ useState,useEffect } from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ChooseTeam from './pages/ChooseTeam/ChooseTeam';
import KKR from './pages/Teams/KKR/KKR';
import RCB from './pages/Teams/RCB/RCB';
import MI from './pages/Teams/MI/MI';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Paceorder/Placeorder';
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
        <Route path="/kkr" element={<KKR/>}/>
        <Route path="/rcb" element={<RCB/>}/>
        <Route path="/mi" element={<MI/>}/>        
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/placeorder" element={<Placeorder/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
