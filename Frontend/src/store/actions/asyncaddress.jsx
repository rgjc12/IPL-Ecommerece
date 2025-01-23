import axios from "axios";
import { setAddress, getAddress, deleteAddress } from "../Reducers/addressReducer";



export const asyncaddAddress=(formData)=>async(dispatch,getState)=>{
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;
    try{       
        const response=await axios.post(`${backendUrl}/api/address/addAddress`,formData,
            {
                headers: 
                {
                    Authorization: `Bearer ${token}`
                },
                withCredentials:true
            }
        ); 
        dispatch(setAddress(response.data));
        return response.data;   
        console.log(response.data); 
        localStorage.setItem("address",response.data);
       
    }catch(error){
        console.log(error);
    }
}
export const asyncgetAddress=(userId)=>async(dispatch,getState)=>{
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;    

    try{
        const response=await axios.get(`${backendUrl}/api/address/getAddress/${userId}`,
            {
                headers: 
                {
                    Authorization: `Bearer ${token}`
                },
                withCredentials:true
            }
        );
        dispatch(getAddress(response.data));
        localStorage.setItem("address",response.data);
        return response.data;
        console.log(response.data);
    }catch(error){
        console.log(error);
    }
}
export const asyncdeleteAddress=(userId)=>async(dispatch,getState)=>{
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;   
    try{
        const response=await axios.delete(`${backendUrl}/api/address/deleteAddress/${userId}`,
            {
                headers: 
                {
                    Authorization: `Bearer ${token}`
                },
                withCredentials:true
            }
            );
        dispatch(deleteAddress(response.data));
        return response.data;
            console.log(response.data);
    }catch(error){
        console.log(error);
    }
}


