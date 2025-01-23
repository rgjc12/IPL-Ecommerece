import axios from 'axios';
import { addToCart,getCart,updateCart,deleteCart,deleteCartAll } from '../Reducers/cartReducer';


export const asyncaddToCart = (productId,quantity,userId,iplTeamNumber) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;

    console.log("productID=",productId," quantity=",quantity," userId=",userId," iplTeamNumber=",iplTeamNumber);
    try{
        const response=await axios.post(`${backendUrl}/api/cart/addtocart`,{productId,quantity,userId,iplTeamNumber},
        {
            headers:{
                Authorization: `Bearer ${token}`
            },
            withCredentials:true,
        });
        console.log(response.data);
        dispatch(addToCart(response.data));
    }
catch(error){
    console.error(error);
}
}

export const asyncgetCart = (userId) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;
   
    try{
    const response=await axios.get(`${backendUrl}/api/cart/getcart/${userId}`,{
        headers:{Authorization: `Bearer ${token}`},withCredentials:true});
        
    dispatch(getCart(response.data.cart.items));
    localStorage.setItem("cart",response.data.cart.items);   
}
catch(error){
    console.error(error);
}
}

export const asyncdeleteCart = (userId,productId) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;
    console.log("userId=",userId," productId=",productId);
    try{
        const response=await axios.delete(`${backendUrl}/api/cart/deletecart/${userId}/${productId}`,{
            headers:{Authorization: `Bearer ${token}`},withCredentials:true});
        dispatch(deleteCart(response.data.cart));
        dispatch(asyncgetCart(userId));
        console.log(response.data.cart);
        localStorage.setItem("cart",response.data.cart);
    }
    catch(error){
        console.error(error);
    }
}
export const asyncupdateCart = (userId,productId,quantity) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;
    console.log("userId=",userId," productId=",productId," quantity=",quantity);
    try{
        const response=await axios.put(`${backendUrl}/api/cart/updatecart`,{userId,productId,quantity},
        {headers:{Authorization: `Bearer ${token}`},withCredentials:true});
        dispatch(updateCart(response.data.cart));
        dispatch(asyncgetCart(userId));
        console.log(response.data.cart);
    }
    catch(error){
        console.error(error);
    }
}

export const asyncdeleteCartAll = (userId) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;
    try{
        const response=await axios.delete(`${backendUrl}/api/cart/deletecartall/${userId}`,{headers:{Authorization: `Bearer ${token}`},withCredentials:true});
        dispatch(deleteCartAll(response.data.cart));
    }
    catch(error){
        console.error(error);
    }
}


