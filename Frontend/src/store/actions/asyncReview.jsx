import axios from "axios";
import { addReview,getReviews } from "../Reducers/reviewReducer";

export const asyncaddReview = (userId, productId, ratings, text) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;

    try {
        const response=await axios.post(`${backendUrl}/api/review/addreview`,{
            userId:userId,
            productId:productId,
            ratings:ratings,
            text:text
            
        },{
            headers:{
                Authorization:`Bearer ${token}`
            },
            withCredentials:true
        })       
        dispatch(addReview(response.data));
    } 
    catch (error) {
        console.log("error in adding review",error);         
    }
}


export const asyncgetReviews = (productId) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;

    try {
        const response=await axios.post(`${backendUrl}/api/review/getreviews`,{
            productId:productId
        },{
            headers:{
                Authorization:`Bearer ${token}`
            },
            withCredentials:true
        })
        dispatch(getReviews(response.data));
    }
    catch (error) {
        console.log("error in getting reviews!",error);
    }
}

