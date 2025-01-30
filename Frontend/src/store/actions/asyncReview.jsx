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
        const response=await axios.get(`${backendUrl}/api/review/getreview/${productId}`) 
        console.log(response.data.reviews);
        dispatch(getReviews(response.data.reviews));
        return response.data.reviews;              
    }
    catch (error) {
        console.log("error in getting reviews!",error);
    }
}

