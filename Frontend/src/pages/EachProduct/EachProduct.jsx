import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EachProduct.css';
import Lenis from "lenis";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Product from '../../components/Product/Product';
import Footer from '../../components/Footer/Footer';
import { asyncgetkkrproduct } from '../../store/actions/asyncgetkkrproduct';
import { asyncgetrcbproducts } from '../../store/actions/asyncgetrcbproducts';
import { asyncmiproducts } from '../../store/actions/asyncmiproducts';

function EachProduct() {
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

  const backgrounds = ["/Images/ChooseTeam/k4.webp", "/Images/ChooseTeam/r4.jpg", "/Images/ChooseTeam/m4.jpg"];
  const colors = ["#F2C029", "#D8BC69", "whitesmoke"];
  const textcolor = ["#352350", "#1d1d1d", "#091D50"];

  const n = useSelector(state => state.num);
  const id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncgetkkrproduct());
  }, []);

  useEffect(() => {
    dispatch(asyncgetrcbproducts());
  }, []);

  useEffect(() => {
    dispatch(asyncmiproducts());
  }, []);

  const { kkrproducts } = useSelector(state => state.kkrproducts);
  const { rcbproducts } = useSelector(state => state.rcbproducts);
  const { miproducts } = useSelector(state => state.miproducts);


 

  const [prd, setprd] = useState([]);
  const [matchedObject, setmatchedObject] = useState(null);

  
  useEffect(() => {
   
    if(Array.isArray(kkrproducts.data) && Array.isArray(rcbproducts.data) && Array.isArray(miproducts.data)){
      
      if(n.num==="0"){
        setprd(kkrproducts.data);
        setmatchedObject(kkrproducts.data.find(product => product._id === id.id));  
      }
      else if(n.num==="1"){
        setprd(rcbproducts.data);
        setmatchedObject(rcbproducts.data.find(product => product._id === id.id));
      }
      else if(n.num==="2"){
        setprd(miproducts.data);
        setmatchedObject(miproducts.data.find(product => product._id === id.id));
      }
      
      
    }
   
  }, [kkrproducts.data, rcbproducts.data, miproducts.data,n.num,id.id]);
  
  
 console.log(prd);
  
 
 
 

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const size = ["S", "M", "L", "XL", "XXL"];
  const [sizeindex, setsizeindex] = useState(0);

  return (
    <>
      <div id='eachproduct'>
        <Navbar num={n.num} />
        <div id="eachpro" style={{ backgroundImage: `url(${backgrounds[n.num]})` }}>
          <div id="allpics">
            {matchedObject && matchedObject.imageUrl.map((image, index) =>
              image && (
                <div key={index} onClick={() => handleImageClick(index)} id="eachpic" style={{ border: `2.5px solid ${colors[n.num]}`, borderRadius: "5px" }}>
                  <img src={image} alt={matchedObject.name} />
                </div>
              )
            )}
          </div>
          <div id="productsegment" style={{ backgroundColor: colors[n.num] }}>
            <div id="mainimg">
              <img src={matchedObject && matchedObject.imageUrl[currentImageIndex]} alt="Main Product" />
            </div>
            <div id="productdetails">
              <div id="productname" style={{ color: textcolor[n.num] }}>{matchedObject && matchedObject.name}</div>
              <div id="productdescription" style={{ color: textcolor[n.num] }}>{matchedObject && matchedObject.description}</div>
              <div id="productprice" style={{ color: textcolor[n.num] }}>$. {matchedObject && matchedObject.price}</div>
              <div id="sizes">
                {size.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setsizeindex(index)}
                    className="sizebutton"
                    style={{ border: index === sizeindex ? `2px solid ${textcolor[n.num]}` : 'none' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div id="eachbottom">
                <button className="but" style={{ backgroundColor: textcolor[n.num] }}>Add to Cart</button>
                <button className="but" style={{ backgroundColor: textcolor[n.num] }}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <div id="similar-products">
  <div className="similar-products-heading" style={{color:textcolor[n.num]}}>Similar Products</div>
  <div className="similar-products-container">
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay, Pagination]}
      className="swiper-container1"
    >
      {prd &&
        prd.map((product, index) => (
          <SwiperSlide key={index} className="swiper-slide1">
            <Product
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.imageUrl[0]}
              num={n.num}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  </div>
</div>

        <Footer />
      </div>
    </>
  );
}

export default EachProduct;
