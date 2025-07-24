
import { addToCart,removeCartItem,saveShippingInfo } from "../reducers/cartReducer";
import axios from "../base_URL";
// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  console.log( data,data.product.images[0].url);

  dispatch({
    type: addToCart,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  const currentState = getState()
  console.log(currentState) ;
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) =>  (dispatch, getState) => {
  console.log('hhhh');
  dispatch({
    type: removeCartItem,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingINFO = (data) =>  (dispatch) => {
  dispatch({
    type: saveShippingInfo,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
