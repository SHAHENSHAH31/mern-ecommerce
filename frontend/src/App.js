import React from 'react';
import { useEffect, useState } from "react";
import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router,Route,Routes,} from 'react-router-dom';
import webfont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from './redux/store'
import { loadUser } from './redux/reducers/userReducer';
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";

//import Payment from "./component/Cart/Payment.js";
//import { Elements } from "@stripe/react-stripe-js";
//import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import Stripe from "./component/Cart/Stripe.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import axios from './redux/base_URL.js';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.userReducerLogin);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try{
      const { data } = await axios.get(`/api/v1/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
   console.log(data.stripeApiKey);

    }catch(error){
      console.log(error);
    }
   //setStripeApiKey(data.stripeApiKey);
    //console.log(data.stripeApiKey);
    
  }
useEffect(()=>{
webfont.load({
  google:{
    families:["Roboto","Droid Sans","Chilanka"],
  },
});
 store.dispatch(loadUser());
 
 getStripeApiKey();
 
},[]);



  return (
  <Router >
    <Header />

    {isAuthenticated && <UserOptions user={user} />}
   
    

    <Routes>

    {stripeApiKey && (
      
      <Route  path="/process/payment" 
   element={
   <ProtectedRoute>
     
     <Stripe stripeApiKey={stripeApiKey} />
    
    
   </ProtectedRoute>
   }
   />

   )}
    
    <Route index element={<Home user={user}/>} />
    <Route path='/product/:id' element={<ProductDetails />} />
    <Route path='/products' element={<Products />} />
    <Route path="/search" element={<Search />} />
    <Route path="/products/:keyword" element={<Products />} />
    <Route path="/login" element={<LoginSignUp />} />
    <Route path="/account" 
    element={
    <ProtectedRoute>
     <Profile />
    </ProtectedRoute>
    }
    />
     <Route path="/me/update" 
    element={
    <ProtectedRoute>
     <UpdateProfile />
    </ProtectedRoute>
    }
    />
     <Route path="/password/update" 
    element={
    <ProtectedRoute>
     <UpdatePassword />
    </ProtectedRoute>
    }
    />
    <Route  path="/password/forgot" element={<ForgotPassword />} />
    <Route  path="/password/reset/:token" element={<ResetPassword />} />
    <Route  path="/cart" element={<Cart />} />
    <Route path="/shipping" 
    element={
    <ProtectedRoute>
     <Shipping />
    </ProtectedRoute>
    }
    />
    <Route path="/order/confirm" 
    element={
    <ProtectedRoute>
     <ConfirmOrder />
    </ProtectedRoute>
    }
    />

<Route path="/success" 
    element={
    <ProtectedRoute>
     <OrderSuccess />
    </ProtectedRoute>
    }
    />
<Route path="/orders" 
    element={
    <ProtectedRoute>
     <MyOrders />
    </ProtectedRoute>
    }
    />
     <Route path="/order/:id" 
    element={
    <ProtectedRoute>
     <OrderDetails />
    </ProtectedRoute>
    }
    />
          <Route path="/admin/dashboard" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < Dashboard />
    </ProtectedRoute>
    }
    />
         <Route path="/admin/products" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < ProductList />
    </ProtectedRoute>
    }
    />
     <Route path="/admin/product" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < NewProduct />
    </ProtectedRoute>
    }
    />
    <Route path="/admin/product/:id" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < UpdateProduct />
    </ProtectedRoute>
    }
    />
     <Route path="/admin/orders" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < OrderList />
    </ProtectedRoute>
    }
    />
     <Route path="/admin/order/:id" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < ProcessOrder />
    </ProtectedRoute>
    }
    />
    <Route path="/admin/users" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < UsersList />
    </ProtectedRoute>
    }
    />
    <Route path="/admin/user/:id" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < UpdateUser />
    </ProtectedRoute>
    }
    />
     <Route path="/admin/reviews" 
    element={
    <ProtectedRoute  isAdmin={true} >
     < ProductReviews />
    </ProtectedRoute>
    }
    />
       
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
