import Cart from "../Models/cart.js";
import User from "../Models/usermodel.js";
import KKRProduct from "../Models/kkrProduct.js";
import RCBProduct from "../Models/rcbProduct.js";
import MIProduct from "../Models/miProduct.js";




const addToCart = async (req, res) => {
    try{
        const {quantity,productId,userId,iplTeamNumber}=req.body;
        console.log(productId,quantity,userId,iplTeamNumber);
        if(!userId || !productId || quantity<=0 ) return res.status(400).json({success:false,message:"Invalid request"});


        if(iplTeamNumber===0){
            const product=await KKRProduct.findById(productId);
            if(!product) return res.status(404).json({success:false,message:"Product not found"});
        }
        else if(iplTeamNumber===1){
            const product=await RCBProduct.findById(productId);
            if(!product) return res.status(404).json({success:false,message:"Product not found"});
        }
        else if(iplTeamNumber===2){
            const product=await MIProduct.findById(productId);
            if(!product) return res.status(404).json({success:false,message:"Product not found"});
        }
        let cart=await Cart.findOne({userId});
        if(!cart){
            cart=new Cart({userId,items:[],teamNumber:iplTeamNumber});
        }
        const findindex=cart.items.findIndex(item=>item.productId.toString()===productId.toString());
        if(findindex===-1){
            cart.items.push({productId,quantity,teamNumber:iplTeamNumber});
        }
        else{
            cart.items[findindex].quantity+=quantity;
        }
        await cart.save();
        res.status(200).json({success:true,message:"Product added to cart",cart});


    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}


const getCart = async (req, res) => {
    try{
        const {userId}=req.params;
        if(!userId) return res.status(400).json({success:false,message:"Please login to view cart!"});
        const cart=await Cart.findOne({userId});
        if(!cart) return res.status(404).json({success:false,message:"Please add items to cart!"});
        res.status(200).json({success:true,message:"Cart fetched successfully",cart});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

const updateCart = async (req, res) => {
    try{
        const {userId,productId,quantity}=req.body;
        if(!userId || !productId || quantity<=0 ) return res.status(400).json({success:false,message:"Invalid request"});

        const cart=await Cart.findOne({userId});
        if(!cart) return res.status(404).json({success:false,message:"Cart not found"});
        const findindex=cart.items.findIndex(item=>item.productId.toString()===productId.toString());
        if(findindex===-1) return res.status(404).json({success:false,message:"Product not found in cart"});
        cart.items[findindex].quantity=quantity;
        await cart.save();
        res.status(200).json({success:true,message:"Cart updated successfully",cart});

    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}


const deleteCart = async (req, res) => {
    try{
        const {userId,productId}=req.params;
        if(!userId || !productId) return res.status(400).json({success:false,message:"Invalid request"});
        const cart=await Cart.findOne({userId});
        if(!cart) return res.status(404).json({success:false,message:"Cart not found"});
        cart.items=cart.items.filter(item=>item.productId.toString()!==productId.toString());
        await cart.save();
        res.status(200).json({success:true,message:"Product deleted from cart",cart});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

const deleteCartAll = async (req, res) => { 
    try{
        const {userId}=req.params;
        if(!userId) return res.status(400).json({success:false,message:"Invalid request"});
        await Cart.deleteMany({userId});
        res.status(200).json({success:true,message:"Cart deleted successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

export {addToCart,getCart,updateCart,deleteCart,deleteCartAll};
