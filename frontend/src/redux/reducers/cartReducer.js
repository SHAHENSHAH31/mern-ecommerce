import { createSlice} from "@reduxjs/toolkit";
//import axios from "axios";

let initialState={
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
};
console.log(initialState);

export const cartReducer=createSlice({
    name:"cart",
    initialState,
    reducers:{
      addToCart:(state,action)=>{
        const item = action.payload;

        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
      },
      removeCartItem:(state,action)=>{
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
         
          };
      },
      saveShippingInfo:(state,action)=>{
        return {
          ...state,
          shippingInfo: action.payload,
        };
      }
    },
   
  
  });


  export const { addToCart,removeCartItem,saveShippingInfo }=cartReducer.actions;