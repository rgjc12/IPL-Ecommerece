import React from "react";
import "./Cart.css";
import { useEffect,useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import Lenis from "lenis";
import {useLocation,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { asyncgetCart, asyncdeleteCart,asyncupdateCart } from "../../store/actions/asyncCart";
import { asyncgetkkrproduct } from "../../store/actions/asyncgetkkrproduct";
import { asyncgetrcbproducts } from "../../store/actions/asyncgetrcbproducts";
import { asyncmiproducts } from "../../store/actions/asyncmiproducts";
import { setTotalNumberOfItems } from "../../store/Reducers/totalNumberOfItems";


function Cart() {
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





  const userId=useSelector(state=>state.userId.userId);
  const [productsInCart, setProductsInCart] = useState([]);
  const [localCartItems, setLocalCartItems] = useState([]); 

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(asyncgetkkrproduct());
    dispatch(asyncgetrcbproducts());
    dispatch(asyncmiproducts());
    dispatch(asyncgetCart(userId));
  },[])




  const iplTeamNumber=localStorage.getItem('iplTeamNumber');
  const num=useSelector(state=>state.num.num);
  
  let kkrproducts=useSelector(state=>state.kkrproducts.kkrproducts);
  let rcbproducts=useSelector(state=>state.rcbproducts.rcbproducts);
  let miproducts=useSelector(state=>state.miproducts.miproducts); 
  let cartitems=useSelector(state=>state.cart.cart);
  
  
 


  
  useEffect(() => {
    if (Array.isArray(cartitems)) {
      setLocalCartItems(cartitems);
    }
  }, [cartitems]);

  


  useEffect(() => {
    if(Array.isArray(cartitems) && Array.isArray(kkrproducts.data) && Array.isArray(rcbproducts.data) && Array.isArray(miproducts.data)){
   
      const products = [];
      cartitems.forEach(item => {
        if (item.teamNumber === 0) {
          kkrproducts.data.forEach(product => {
            if (product._id === item.productId) {
              products.push(product);
            }
          });
        } else if (item.teamNumber === 1) {
          rcbproducts.data.forEach(product => {
            if (product._id === item.productId) {
              products.push(product);
            }
          });
        } else if (item.teamNumber === 2) {
          miproducts.data.forEach(product => {
            if (product._id === item.productId) {
              products.push(product);
            }
          });
        }
      });
      setProductsInCart(products);
     
    }  
  }, [cartitems, kkrproducts, rcbproducts, miproducts]);




  let [totalnumberofitems,settotalnumberofitems]=useState(0);

  useEffect(() => {
    if (Array.isArray(localCartItems)) {
      let total = localCartItems.reduce((acc, item) => acc + item.quantity, 0);
      settotalnumberofitems(total);
      dispatch(setTotalNumberOfItems(total));
  
      localStorage.setItem('totalNumberOfItems', total);
    }
  }, [localCartItems]);


  const handleDelete = (productId) => {
    dispatch(asyncdeleteCart(userId, productId))
      .then(() => dispatch(asyncgetCart(userId)))
      .then(()=>dispatch(setTotalNumberOfItems(totalnumberofitems)))
      .then(()=>localStorage.setItem('totalNumberOfItems', totalnumberofitems))
      .catch(error => console.error("Error deleting item from cart:", error));

    setLocalCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };
  const handleUpdate = (userId,productId,quantity) => {
    dispatch(asyncupdateCart(userId,productId,quantity))
    .then(()=>dispatch(asyncgetCart(userId)))
    .then(()=>dispatch(setTotalNumberOfItems(totalnumberofitems)))
    .then(()=>localStorage.setItem('totalNumberOfItems', totalnumberofitems))
    .catch(error => console.error("Error updating item in cart:", error));
  }

  

  return <>
  <Navbar num={num} totalnumberofitems={totalnumberofitems}/>
  <div id="cartcontainer">
  <div id="cartleft">
    <div id="ctext">Your Cart</div>
    <div id="cartitems">
      {
        productsInCart.map((product,index)=>{
          return <div className="cartitem" key={index}>
            <div className="cartitemleft">
            <div className="cartitemimage">
            <img src={product.imageUrl[0]} alt={product.name} />
            </div>
            <div className="cartitemtextmain">

              <div className="txt">
            <div className="cartitemtext">{product.name}</div>
            <div className="instock">In stock</div>
            </div>
            <div className="cartitemquantity">
              <div className="cartitemquantity"> 

            <input className="cartitemquantityinput"
                      type="number" min="1"
                      value={localCartItems.find(item => item.productId === product._id)?.quantity || 0}
                      onChange={(e) => {
                        console.log(e.target.value);
                        handleUpdate(userId,product._id,e.target.value);
                      }}
                    />
                      <button className="cartitemdelete" onClick={(e) => {
                    e.preventDefault();
                    handleDelete(product._id);
                  }}><i className="ri-delete-bin-5-fill"></i></button>
                  </div>
              
            </div>
            </div>
            </div>
            <div className="cartitemprice">₹{product.price}</div>
          

          </div>
        })
       
      }
       
    </div>
  </div>
  <div id="cartright">
    <div id="cartrighttext">Cart <span>Total</span></div>
    <div id="cartrighttotal">
      <div className="txt1">Subtotal({totalnumberofitems} items):</div>
      <div className="txt2">₹{productsInCart.reduce((acc, product) => acc + product.price * (localCartItems.find(item => item.productId === product._id)?.quantity || 0), 0)}</div>
    </div>
    <div id="cartrighttotal1">
      <div className="txt1">Shipping Fee</div>
      <div className="txt2">₹40</div>
    </div>
    <div id="cartrighttotal2">
      <div className="txt3">Total</div>
      <div className="txt2">₹{productsInCart.reduce((acc, product) => acc + product.price * (localCartItems.find(item => item.productId === product._id)?.quantity || 0), 0)+40}</div>
    </div>
    <div id="cartrightbutton">
      <button className="cartrightbutton" onClick={()=>navigate('/placeorder/checkout')}>Proceed to Checkout</button>
      <button className="cartrightbutton" onClick={()=>navigate(-1)}>Continue Shopping</button>
    </div>

  </div>
  </div>
  </>
}

export default Cart;
