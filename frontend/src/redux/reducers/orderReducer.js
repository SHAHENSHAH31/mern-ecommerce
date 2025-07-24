import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import  axios  from "../base_URL";

export const createOrder =  createAsyncThunk("create",async(order,{rejectWithValue})=> {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const data  = await axios.post(`/api/v1/order/new`, order, config);
      return data
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });


export const newOrderReducer=createSlice({
    name:"Create",
    initialState:{},
    reducers:{
      clearErrors:(state,action)=>{
        return {
          ...state,
          error: null,
        };
        // state.error=null;
      }
    },
   extraReducers:(builder)=>{
           builder.addCase(createOrder.pending,(state)=>{
            return {
                ...state,
                loading: true,
              };
           })
           .addCase(createOrder.fulfilled,(state,action)=>{
            return{
                loading: false,
                order: action.payload.data,
            }
           })
           .addCase(createOrder.rejected,(state,action)=>{
            return{
                loading: false,
                error: action.payload.data.message,
            }
           })
   }
})


export const { clearErrors } = newOrderReducer.actions;



// my order

export const myOrders =  createAsyncThunk("order",async(arg,{rejectWithValue})=> {
    try {
      
          const data  = await axios.get(`/api/v1/orders/me`);

      return data
  
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });


export const myOrderReducer=createSlice({
    name:"Order",
    initialState:{loading:true , orders:[]},
    reducers:{
      clearError:(state,action)=>{
        return {
          ...state,
          error: null,
        };
        // state.error=null;
      }
    },
   extraReducers:(builder)=>{
           builder.addCase(myOrders.pending,(state)=>{
            return {
                loading: true,
              };
           })
           .addCase(myOrders.fulfilled,(state,action)=>{
            return{
                loading: false,
                orders: action.payload.data.orders,
            }
           })
           .addCase(myOrders.rejected,(state,action)=>{
            return{
                loading: false,
                error: action.payload.data.message,
            }
           })
   }
})


// get all orders admin

export const getAllOrders =  createAsyncThunk("orders",async(arg,{rejectWithValue})=> {
  try {
    
        const data  = await axios.get(`/api/v1/admin/orders`);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const allOrdersReducer=createSlice({
  name:"ALLOrder",
  initialState:{loading:true , orders:[]},
  reducers:{
    clearEr:(state,action)=>{
      return {
        ...state,
        error: null,
      };
      // state.error=null;
    }
  },
 extraReducers:(builder)=>{
         builder.addCase(getAllOrders.pending,(state)=>{
          return {
              loading: true,
            };
         })
         .addCase(getAllOrders.fulfilled,(state,action)=>{
          return{
              loading: false,
              orders: action.payload.data.orders,
          }
         })
         .addCase(getAllOrders.rejected,(state,action)=>{
          return{
              loading: false,
              error: action.payload.data.message,
          }
         })
 }
})


//update order

export const updateOrder =  createAsyncThunk("update",async(arg,{rejectWithValue})=> {
  try {
    const {params, myForm}=arg;
      const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const data  = await axios.put(`/api/v1/admin/order/${params}`, myForm, config);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

//delete order

export const deleteOrder =  createAsyncThunk("delete",async(id,{rejectWithValue})=> {
  try {
        const data  = await axios.delete(`/api/v1/admin/order/${id}`);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const orderReducer=createSlice({
  name:"updateOrder",
  initialState:{},
  reducers:{
    clearERR:(state,action)=>{
      return {
        ...state,
        error: null,
      };
      // state.error=null;
    },
    updateOrderReset:(state,action)=>{
      return {
        ...state,
        isUpdated:false
      };
      // state.error=null;
    },
    deleteOrderReset:(state,action)=>{
      return {
        ...state,
        isDeleted:false
      };
      // state.error=null;
    }
  },
 extraReducers:(builder)=>{
         builder.addCase(updateOrder.pending,(state)=>{
          return {
            ...state,
              loading: true,
            };
         })
         .addCase(updateOrder.fulfilled,(state,action)=>{
          return{
            ...state,
              loading: false,
              isUpdated: action.payload.data.success,
          }
         })
         .addCase(updateOrder.rejected,(state,action)=>{
          return{
            ...state,
              loading: false,
              error: action.payload.data.message,
          }
         })
         builder.addCase(deleteOrder.pending,(state)=>{
          return {
            ...state,
              loading: true,
            };
         })
         .addCase(deleteOrder.fulfilled,(state,action)=>{
          return{
            ...state,
              loading: false,
              isDeleted: action.payload.data.success,
          }
         })
         .addCase(deleteOrder.rejected,(state,action)=>{
          return{
            ...state,
              loading: false,
              error: action.payload.data.message,
          }
         })
 }
})

export const { clearError } = myOrderReducer.actions;


// get order details
 
export const getOrderDetails =  createAsyncThunk("myorder",async(id,{rejectWithValue})=> {
  try {
    
        const data  = await axios.get(`/api/v1/order/${id}`);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const orderDetailsReducer=createSlice({
  name:"getOrder",
  initialState:{loading:true , order:{}},
  reducers:{
    clearErr:(state,action)=>{
      return {
        ...state,
        error: null,
      };
      // state.error=null;
    }
  },
 extraReducers:(builder)=>{
         builder.addCase(getOrderDetails.pending,(state)=>{
          return {
              loading: true,
            };
         })
         .addCase(getOrderDetails.fulfilled,(state,action)=>{
          return{
              loading: false,
              order: action.payload.data.order,
          }
         })
         .addCase(getOrderDetails.rejected,(state,action)=>{
          return{
              loading: false,
              error: action.payload.data.message,
          }
         })
 }
})




export const { clearErr } = orderDetailsReducer.actions;
export const { clearEr } = allOrdersReducer.actions;
export const { clearERR,deleteOrderReset,updateOrderReset } = orderReducer.actions;