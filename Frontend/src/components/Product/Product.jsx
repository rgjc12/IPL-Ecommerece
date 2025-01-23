import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css"
function Product({id,name,price,image,num,handleAddToCart,userId,iplTeamNumber}) {
  const currency='$';  
  const backgrounds=["/Images/ChooseTeam/k0.png","/Images/ChooseTeam/r0.png","/Images/ChooseTeam/m0.png"];
  const colors=["#F2C029","#D8BC69","whitesmoke"];
  const textcolor=["#352350","#1d1d1d","#091D50"];
  
  return (
    <>
    
    <div className="card"
          style={{
            backgroundImage: `url(${backgrounds[num]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link to={`/product/${id}`}>
          <div className="wrapper10" style={{border:`2px solid ${colors[num]}`}}>       
          <img src={image}/>
      </div>
          </Link>      
      <div className="cardbot">
        <div className="bottext"><h3 style={{textDecoration: "none !important", color:`${colors[num]}`}}>{name}</h3></div>
        <div className="price"><h3 style={{textDecoration: "none !important", color:`${colors[num]}`}}>{currency}&nbsp;{price}</h3></div>
        <div className="botbut">
          <button className="but1" style={{
            background:`${colors[num]}`,color:`${textcolor[num]}`}} onClick={()=>handleAddToCart(id,1,userId,iplTeamNumber)}>Add to Cart</button>
          <button className="but2"style={{
            background:`${colors[num]}`,color:`${textcolor[num]}`}}>Buy Now</button>
        </div>
        </div>      
    </div>
    
    </>
  )
}

export default Product