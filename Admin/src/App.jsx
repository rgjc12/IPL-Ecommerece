import React from 'react' 
import './App.css'
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
function App() {

const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):"");
  return (
    <>
    <ToastContainer />   
    {token ==="" ?<Login setToken={setToken}/>:<Dashboard setToken={setToken} token={token}/>}    
    </>   
     
    
  )
}

export default App
