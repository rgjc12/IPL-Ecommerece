import {createSlice} from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:"order",
    initialState:{
        approvalURL:null,
        isLoading:false,
        orderId:null
    },
    reducers:{  
        setApprovalURL:(state,action)=>{
            state.approvalURL = action.payload;
        },
        setIsLoading:(state,action)=>{
            state.isLoading = action.payload;
        },
        setOrderId:(state,action)=>{
            state.orderId = action.payload;
        }
    },
   
    
})

export default orderSlice.reducer;
export const {setApprovalURL,setIsLoading,setOrderId} = orderSlice.actions;