import axios from 'axios';
import { getKkrproducts } from '../Reducers/kkrproductsReducer';


export const asyncgetkkrproduct = () => async (dispatch,getState) => {
    const backendUrl = getState().backendUrl.backendUrl;
    const token = getState().token.token;
    
    try {
        const response = await axios.get(`${backendUrl}/api/kkrproduct/kkr`,
            {
                headers: 
                {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            }
        );
          dispatch(getKkrproducts(response.data));
          
          
    } catch (error) {
        console.error(error);   
    }
}
