import axios from 'axios';
import { getMiproducts } from '../Reducers/miproductsReducer';

export const asyncmiproducts = () => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token; 
    

    try {
        const response = await axios.get(`${backendUrl}/api/miproduct/mi`,{
            headers: 
            {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        });
          dispatch(getMiproducts(response.data));   
    } catch (error) {
        console.error(error);
    }
}
