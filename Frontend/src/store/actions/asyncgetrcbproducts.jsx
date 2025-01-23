import axios from "axios";
import { getRcbproducts } from "../Reducers/rcbproductsReducer";

export const asyncgetrcbproducts = () => async (dispatch, getState) => {
  const backendUrl = getState().backendUrl.backendUrl;
  const token = getState().token.token; 
 
  
  try {
    const response = await axios.get(`${backendUrl}/api/rcbproduct/rcb`,
      {
        headers: 
        {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true,
    }
    );
    dispatch(getRcbproducts(response.data));
  } catch (error) {
    console.error("Error fetching RCB products:", error);
  }
};
