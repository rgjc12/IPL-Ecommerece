import axios from 'axios';
import {setApprovalURL,setIsLoading,setOrderId,getOrders} from '../Reducers/orderReducer';

export const asyncCreateOrder = (orderData) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;    
    console.log(orderData);  
    try{
      const response =await axios.post(`${backendUrl}/api/order/create-order`,orderData);
      console.log(response.data);    
      dispatch(setOrderId(response.data.orderId));
      dispatch(setIsLoading(false));
      dispatch(setApprovalURL(response.data.approvalURL));
      return response.data;
    }
    catch(error){
        console.log(error);
        dispatch(setIsLoading(false));
    }
}

export const asyncgetOrders = (userId) => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    console.log("userId",userId);
    console.log("backendUrl",backendUrl);
    try{
    const response = await axios.get(`${backendUrl}/api/order/userorders/${userId}`);
    console.log("orders Response",response.data);
    dispatch(getOrders(response.data));
    return response.data;
}
catch(error){
    console.log("orders Error",error);
}
}

