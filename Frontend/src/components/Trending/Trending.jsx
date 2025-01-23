import React, { useContext, useEffect, useState } from "react";
import "./Trending.css";
import { useDispatch, useSelector } from 'react-redux';
import { asyncgetkkrproduct } from '../../store/actions/asyncgetkkrproduct';
import { asyncgetrcbproducts } from '../../store/actions/asyncgetrcbproducts';
import { asyncmiproducts } from '../../store/actions/asyncmiproducts';

function Trending({ num }) {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(asyncgetkkrproduct());
    dispatch(asyncgetrcbproducts());
    dispatch(asyncmiproducts());
  },[]);
  const kkrproducts = useSelector(state=>state.kkrproducts.kkrproducts);
  const rcbproducts = useSelector(state=>state.rcbproducts.rcbproducts);
  const miproducts = useSelector(state=>state.miproducts.miproducts);

  const backgrounds = ["./Images/ChooseTeam/k4.webp", "./Images/ChooseTeam/r4.jpg", "./Images/ChooseTeam/m4.jpg"];
  const colors = ["#F2C029", "#D8BC69", "whitesmoke"];
  const textcolor = ["#352350", "#1d1d1d", "#091D50"];
  
  const prod = num === 0 ? kkrproducts : num === 1 ? rcbproducts : miproducts;

   
  
  useEffect(() => {   
    if(prod.data){
    const bestProduct = prod.data.filter((item) => item.isTrending);
    setTrendingProducts(bestProduct.slice(0, 2));
    if (bestProduct.length > 0) {
      setSelectedProduct(bestProduct[0]);
    }  
  }
  }, [prod]);
  

  const handleProductClick = (id) => {
    const product = trendingProducts.find((item) => item._id === id);
    setSelectedProduct(product);
  };

  return (
    <>
      
       
        <div className="tr"
          style={{
            height: "40vw",
            width: "100vw",
            backgroundImage: `url(${backgrounds[num]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
          }}
        >
          <div className="trtext" style={{ color: `${colors[num]}` }}>
            <h1>#TRENDING</h1>
          </div>

          <div
            className="trwrapl"
            style={{
              height: "36vw",
              width: "60vw",
              marginLeft: "2vw",
              backgroundColor: `${colors[num]}`,            
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",                        
            }}
          >
            {selectedProduct ? (
                <div className="selected">
              <div className="desbox">
                <div className="dboxt"  style={{color:`${textcolor[num]}`}}>
                    <h1>{selectedProduct.name}</h1>
                </div>
                <div className="dboxm">
                    <h3>{selectedProduct.description}</h3>
                </div>
                <div className="dboxb">
                    <div className="bl">Rs.{selectedProduct.price}</div>
                    <div className="br"><button className="but10"style={{backgroundColor:`${textcolor[num]}`,color:`${colors[num]}`}}>BUY NOW</button></div>
                </div>
              </div>
                <div className="desimg">
                    <img src={selectedProduct.imageUrl[0]} alt={selectedProduct.name} style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }} />
  
                </div>
              </div>
            ) : (
              <p>Select a product to see details</p>
            )}
          </div>

         
          <div className="trwrapr">
            {trendingProducts.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="imgdiv"
                  style={{
                    height: "16vw",
                    width: "12vw",
                    borderRadius: "10px",
                    border: `2px solid ${colors[num]}`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleProductClick(item._id)}
                >
                  <img
                    src={item.imageUrl[0]}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      
    </>
  );
}

export default Trending;
