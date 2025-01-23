import axios from 'axios';
import {setApprovalURL,setIsLoading,setOrderId} from '../Reducers/orderReducer';

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
