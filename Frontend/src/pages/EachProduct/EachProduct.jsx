import React, { useEffect, useState,useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './EachProduct.css';
import Lenis from "lenis";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Product from '../../components/Product/Product';
import Footer from '../../components/Footer/Footer';
import { asyncgetkkrproduct } from '../../store/actions/asyncgetkkrproduct';
import { asyncgetrcbproducts } from '../../store/actions/asyncgetrcbproducts';
import { asyncmiproducts } from '../../store/actions/asyncmiproducts';
import { asyncgetReviews } from '../../store/actions/asyncReview';
import { asyncaddToCart,asyncgetCart } from '../../store/actions/asyncCart';
import { setTotalNumberOfItems } from '../../store/Reducers/totalNumberOfItems';
import ReactStars from "react-stars";



function EachProduct() {
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

  const backgrounds = ["/Images/ChooseTeam/k4.webp", "/Images/ChooseTeam/r4.jpg", "/Images/ChooseTeam/m4.jpg"];
  const colors = ["#F2C029", "#D8BC69", "whitesmoke"];
  const textcolor = ["#352350", "#1d1d1d", "#091D50"];
  const { kkrproducts } = useSelector(state => state.kkrproducts);
  const { rcbproducts } = useSelector(state => state.rcbproducts);
  const { miproducts } = useSelector(state => state.miproducts);
  const n = useSelector(state => state.num);
  const {review}=useSelector(state=>state.review);
  const[reviews,setreviews]=useState([]);

  
  const id = useParams(); 
  const dispatch = useDispatch();


  

  useEffect(() => {
    dispatch(asyncgetkkrproduct());
    dispatch(asyncgetrcbproducts());
    dispatch(asyncmiproducts());    
     dispatch(asyncgetReviews(id.id)).then((res)=>{
      setreviews(res);
     });
     
  }, [dispatch,id.id,review]);

  




 

  const [prd, setprd] = useState([]);
  const [matchedObject, setmatchedObject] = useState(null);
    

  
  useEffect(() => {
    

    if (kkrproducts?.data && rcbproducts?.data && miproducts?.data) {
      let selectedProducts = [];
      let selectedObject = null;  
      
      if (n.num === "0"||n.num === 0) {
        selectedProducts = kkrproducts.data;
        selectedObject = kkrproducts.data.find(product => product._id === id.id);

      } else if (n.num === "1"||n.num === 1) {
        selectedProducts = rcbproducts.data;
        selectedObject = rcbproducts.data.find(product => product._id === id.id);


      } else if (n.num === "2"||n.num === 2) {
        selectedProducts = miproducts.data;
        selectedObject = miproducts.data.find(product => product._id === id.id);
      }

  
      // Only update state if the selected products have changed
      if (selectedProducts.length > 0) {
        setprd(selectedProducts);
        setmatchedObject(selectedObject);
      }
    }
  }, [kkrproducts, rcbproducts, miproducts, n.num, id.id]);
  
  

  
 
 
 

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const size = ["S", "M", "L", "XL", "XXL"];
  const [sizeindex, setsizeindex] = useState(0);




  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 5; // Default value if no reviews
    const total = reviews.reduce((acc, review) => acc + (review.ratings || 5), 0);
    return total / reviews.length;
  }, [reviews]);







   const iplTeamNumber=useSelector(state=>state.num.num);
  const token=useSelector(state=>state.token.token);
  const quantity=1;
  const userId=useSelector(state=>state.userId.userId);
    const cart = useSelector(state => state.cart.cart);



    let [totalnumberofitems,settotalnumberofitems]=useState(0);
  useEffect(()=>{
    dispatch(asyncgetCart(userId));    
  },[userId])
  

  useEffect(() => {
    if (Array.isArray(cart)) {
      let total = cart.reduce((acc, item) => acc + item.quantity, 0);
      settotalnumberofitems(total);
      dispatch(setTotalNumberOfItems(total));
      localStorage.setItem('totalNumberOfItems', total);
    }
  }, [cart]);
  



     const handleAddToCart = (productId,quantity,userId,iplTeamNumber) => {
    dispatch(asyncaddToCart(productId,quantity,userId,iplTeamNumber)); 
    dispatch(asyncgetCart(userId));    
    totalnumberofitems+=quantity;
    dispatch(setTotalNumberOfItems(totalnumberofitems));
    localStorage.setItem('totalNumberOfItems',totalnumberofitems);
  }
  const handlebuynow=(productId,quantity,userId,iplTeamNumber)=>{
    dispatch(asyncaddToCart(productId,quantity,userId,iplTeamNumber)); 
    dispatch(asyncgetCart(userId));    
    totalnumberofitems+=quantity;
    dispatch(setTotalNumberOfItems(totalnumberofitems));
    localStorage.setItem('totalNumberOfItems',totalnumberofitems);
    navigate('/placeorder/checkout');
  }
  



  return (
    <>
      <div id='eachproduct'>
        <Navbar num={n.num} totalnumberofitems={totalnumberofitems} />
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
              <div id="productrating">
                <ReactStars
  count={5}
  value={avgRating} 
  className="responsive-stars"
  color2={`${textcolor[n.num]}`}
  edit={false}
   // Use productId
/>
              </div>
              <div id="productprice" style={{ color: textcolor[n.num] }}>Rs. {matchedObject && matchedObject.price}</div>
              
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
                <button className="but" style={{ backgroundColor: textcolor[n.num] }} onClick={()=>handleAddToCart(matchedObject._id,quantity,userId,iplTeamNumber)}>Add to Cart</button>
                <button className="but" style={{ backgroundColor: textcolor[n.num] }} onClick={()=>handlebuynow(matchedObject._id,quantity,userId,iplTeamNumber)}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <div id="allreviews">
          <div id="reviewheading" style={{color:textcolor[n.num]}}>Top Reviews</div>
          
          {reviews.length>0 && reviews.map((review,index)=>(
            <div key={index} id="eachreview">
              <div className="reviewtop">
                <img src="/Images/i1.png"/>
              <div id="reviewer">&nbsp;{review.userName}</div> 
              <div className="verified">Verified Purchase</div>            
              </div>
              <div className="reviewrating">
              <ReactStars
  count={5}
  value={review.ratings||5} 
  className="responsive-stars"
  color2={"#ffd700"}
  edit={false}
/>
              </div>
              
              <div id="reviewtext">{review.text}</div>
            </div>
          ))}

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
              handlebuynow={handlebuynow}
              handleAddToCart={handleAddToCart}
              userId={userId} iplTeamNumber={iplTeamNumber}
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
