import axios from "axios";
import { setUserId } from "../Reducers/userIdReducer";


export const asyncsetId = () => async (dispatch, getState) => {
    const backendUrl=getState().backendUrl.backendUrl;
    const token=getState().token.token;
    try{
        const response=await axios.post(`${backendUrl}/api/users/userid`,{
            token
        });
        console.log(response.data.userId);
        dispatch(setUserId(response.data.userId));
    }
    catch(error){
        console.error("Error fetching user ID:", error);
    }
}
