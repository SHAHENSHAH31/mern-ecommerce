import { applyMiddleware } from "redux";

import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";


import { configureStore } from "@reduxjs/toolkit";
import {productsReducer,productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer} from "./reducers/productReducer";
import {forgotPasswordReducer, profileReducer, userReducerLogin, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrderReducer, newOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from "./reducers/orderReducer";

//const reducer=combineReducers({});

 const middleware=[thunk];
const store=configureStore({
    reducer:{
      productReducer:productsReducer.reducer,
      productDetailsReducer:productDetailsReducer.reducer,
      userReducerLogin:userReducerLogin.reducer,
      profile:profileReducer.reducer,
      forgotPassword:forgotPasswordReducer.reducer,
      cart:cartReducer.reducer,
      newOrder:newOrderReducer.reducer,
      myOrders:myOrderReducer.reducer,
      orderDetails:orderDetailsReducer.reducer,
      newReview:newReviewReducer.reducer,
      newProduct:newProductReducer.reducer,
      product:productReducer.reducer,
      allOrders: allOrdersReducer.reducer,
      order: orderReducer.reducer,
      allUsers: allUsersReducer.reducer,
      userDetails: userDetailsReducer.reducer,
      productReviews: productReviewsReducer.reducer,
      review: reviewReducer.reducer,
    },
  },composeWithDevTools(applyMiddleware(...middleware)));


export default store;