import React from 'react'
import './AddKKR.css'
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
function AddKKR({token}) {
  const backendUrl=import.meta.env.VITE_BACKEND;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isTrending, setisTrending] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const onSubmit = async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('name', name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("isTrending",isTrending);
      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      const response = await axios.post(`${backendUrl}/api/kkrproduct/addkkr`,formData,{
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
      if(response.data.success)
      {
        toast.success('KKR Product Added Successfully!');
      }
      else 
      {
        toast.error(response.data.msg);
      }
       

    }
    catch(err)
    {
      console.log(err);
      const errorMessage = err.response?.data?.message || err.message;   
      toast.error(errorMessage);      
    }
  }

  return (
    <>
     <div id="addkkrmain">
      <form id="addkkrform" encType="multipart/form-data">
        <div id="uploadimages">
          <p>Upload Images:</p>
          <div id="uploadimagesdiv">
            <label htmlFor="image1">
              <img src={!image1 ?`upload.png`:URL.createObjectURL(image1)} alt="upload"/>
              <input onChange={(e)=>{
                setImage1(e.target.files[0])
              }} type="file" id="image1" name="image1" hidden/>
            </label>
            <label htmlFor="image2">
              <img src={!image2 ?`upload.png`:URL.createObjectURL(image2)} alt="upload"/>
              <input onChange={(e)=>{
                setImage2(e.target.files[0])
              }} type="file" id="image2" name="image2" hidden/>
            </label>
            <label htmlFor="image3">
              <img src={!image3 ?`upload.png`:URL.createObjectURL(image3)} alt="upload"/>
              <input onChange={(e)=>{
                setImage3(e.target.files[0])
              }} type="file" id="image3" name="image3" hidden/>
            </label>
            <label htmlFor="image4" >
              <img src={!image4 ?`upload.png`:URL.createObjectURL(image4)} alt="upload"/>
              <input onChange={(e)=>{
                setImage4(e.target.files[0])
              }} type="file" id="image4" name="image4" hidden/>
            </label>
          </div>
        </div>
        <div id="productdetails">
          <p>Product Name:</p>
          <input onChange={(e)=>{
            setName(e.target.value)}} value={name} id="productname" type="text" name="productname" placeholder="Product Name" required/>
          <p>Product Description:</p>
          <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} id="productdescription" type="text" name="productdescription" placeholder="Product Description..." required/>
          <p>Product Price:</p>
          <input onChange={(e)=>{setPrice(e.target.value)}} value={price} id="productprice" type="number" min="0" name="productprice" placeholder="Product Price in $" required />
          <p>Trending:</p>
          <input onChange={(e)=>{setisTrending(e.target.checked)}} value={isTrending} id="trending" type="checkbox" name="trending" placeholder="Trending" required/>      
         
        </div>
        <button id="addkkrbutton" type="submit" onClick={onSubmit}>Add </button>
        

      </form>
     </div>
    </>
  )
}

export default AddKKR