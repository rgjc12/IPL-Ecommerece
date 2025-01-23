import KKRProduct from "../Models/kkrProduct.js";
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
dotenv.config();

const addkkrproduct = async (req, res) => {
    try {
      const {name,description,price,isTrending}=req.body;
      console.log(req.body);
      console.log(req.files);
     const image1=req.files.image1 ? req.files.image1[0] : null;
      const image2=req.files.image2 ? req.files.image2[0] : null;
      const image3=req.files.image3 ? req.files.image3[0] : null;
      const image4=req.files.image4 ? req.files.image4[0] : null;
     const images=[image1,image2,image3,image4].filter((image)=>image!==null);
     const imageUrl=await Promise.all(images.map(async(image)=>{
       const result=await cloudinary.uploader.upload(image.path,{resource_type:"image"});
      if(result.secure_url)return result.secure_url
      else return "null";
     })
    )

   const newProduct=new KKRProduct({name,
     description,
    price:Number(price),
      isTrending:isTrending==="true"?true:false||Math.random()<0.5,
     imageUrl});
    await newProduct.save();
     res.status(201).json({success:true,msg:"KKR Product added successfully",product:newProduct});  



    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };
  
  


  const listkkrproducts = async (req, res) => {
    try {
      const products = await KKRProduct.find(); 
      res.json({
        success: true,
        data: products,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        msg: "Failed to fetch KKR products",
      });
    }
  };





  

const singlekkrproduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await KKRProduct.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({      
      success: false,
      msg: "Failed to fetch product details",
    });
  }
};
export{listkkrproducts,singlekkrproduct,addkkrproduct}