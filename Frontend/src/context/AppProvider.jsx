import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppProvider = (props) => {
  const [kkrproducts, setKkrProducts] = useState([]);
  const [rcbproducts, setRcbProducts] = useState([]);
  const [miproducts, setMiProducts] = useState([]);  
  const [loading, setLoading] = useState(false);
  const[token, setToken] = useState("");
  const [num, setNum] = useState(null);
  const [cart, setCart] = useState([]);
  const currency = "Rs.";
  const delivery = 40;
  

  const backendUrl = import.meta.env.VITE_BACKEND||"https://ipl-ecommerece-backend.vercel.app/";  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [kkrResponse, rcbResponse, miResponse] = await Promise.all([
        axios.get(`${backendUrl}/api/kkrproduct/kkr`),
        axios.get(`${backendUrl}/api/rcbproduct/rcb`),
        axios.get(`${backendUrl}/api/miproduct/mi`),
      ]);


      setKkrProducts(kkrResponse.data?.data || []);
      setRcbProducts(rcbResponse.data?.data || []);
      setMiProducts(miResponse.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);

      toast.error("Failed to fetch products. Please check the server.");
    } finally {
      setLoading(false); 
    }
  };
  


  useEffect(() => {
    if (!backendUrl) {
      console.error("Backend URL is not set. Check your .env file.");
      toast.error("Backend URL is not configured. Unable to fetch data.");
      return;
    }

    fetchProducts();
  }, [backendUrl]);

  const value = {
    kkrproducts,
    rcbproducts,
    miproducts,
    currency,
    delivery,
    num,
    setNum,
    loading,
    backendUrl,
    setToken,
    token,
    toast,    
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppProvider;
