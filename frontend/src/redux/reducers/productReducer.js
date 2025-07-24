import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from "../base_URL";


export const getProducts= createAsyncThunk("Products",async(arg,{rejectWithValue})=>{
    try {
        let {keyword="",currentPage=1,price=[0,250000000],category,ratings=0}=arg;
         console.log("don");
         console.log(keyword,currentPage,category);
         let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

         if(category){
          link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
         }
      
      
        const data= await axios.get(link);
        return data;

      } catch (error) {
        return rejectWithValue(error.response);
      }
})

// get all product for admin
export const getAdminProduct = createAsyncThunk("Product/admin",async(arg,{rejectWithValue})=> {
  try {
     console.log('he');
    const  data  = await axios.get(`/api/v1/admin/products`);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

 export const productsReducer=createSlice({
    name:"Products",
    initialState:{products:[]},
    reducers:{
      clearErrors:(state,action)=>{
        return {
          ...state,
          error: null,
        };
      }
    },
   extraReducers:(builder)=>{
           builder.addCase(getProducts.pending,(state)=>{
            return {
              loading: true,
              products: [],
            };
           })
           .addCase(getProducts.fulfilled,(state,action)=>{
            return{
              products:action.payload.data.products,
              productsCount:action.payload.data.productsCount,
              resultPerPage:action.payload.data.resultPerPage,
              filteredProductsCount:action.payload.data.filteredProductsCount,
              loading:false
            }
            
           })
           .addCase(getProducts.rejected,(state,action)=>{
            return{
              loading:false,
              error:action.payload.data.message
            }
           })
           builder.addCase(getAdminProduct.pending,(state)=>{
            return {
              loading: true,
              products: [],
            };
           })
           .addCase(getAdminProduct.fulfilled,(state,action)=>{
            return{
              products:action.payload.data.products,
              loading:false
            }
            
           })
           .addCase(getAdminProduct.rejected,(state,action)=>{
            return{
              loading:false,
              error:action.payload.data.message
            }
           })
   }
})







//  Get Products Details

 export const getProductDetails = createAsyncThunk("Product",async(id,{rejectWithValue})=> {
  try {
     console.log(id);
    const  data  = await axios.get(`/api/v1/product/${id}`);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});


const intialState={
  product:{}
}
 export const productDetailsReducer=createSlice({
  name:"Product",
  initialState:{loading:true,Product:{}},
  reducers:{
    clearError:(state,action)=>{
      return {
        ...state,
        error: null,
      };
      // state.error=null;
    },
    clearUp:() => {
      return { ...intialState } 
     }
  },
 extraReducers:(builder)=>{
         builder.addCase( getProductDetails.pending,(state)=>{
          return {
            loading: true,
            ...state,
          };
         })
         .addCase( getProductDetails.fulfilled,(state,action)=>{
          return {
            loading: false,
            Product: action.payload.data.product,
          };
         })
         .addCase( getProductDetails.rejected,(state,action)=>{
          return {
            loading: false,
            error: action.payload.data.message,
          };
         
         })
 }
});




// get all review of a product

export const getAllReviews = createAsyncThunk("Review/All",async(id,{rejectWithValue})=> {
  try {
    const  data  = await axios.get(`/api/v1/reviews?id=${id}`);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const productReviewsReducer=createSlice({
  name:"Productreview",
  initialState:{loading:true,reviews:[]},
  reducers:{
    clearUpError:(state,action)=>{
      return {
        ...state,
        error: null,
      };
      // state.error=null;
    },
  },
 extraReducers:(builder)=>{
         builder.addCase( getAllReviews.pending,(state)=>{
          return {
            loading: true,
            ...state,
          };
         })
         .addCase( getAllReviews.fulfilled,(state,action)=>{
          return {
            loading: false,
            reviews: action.payload.data.reviews,
          };
         })
         .addCase( getAllReviews.rejected,(state,action)=>{
          return {
            ...state,
            loading: false,
            error: action.payload.data.message,
          };
         
         })
 }
});

// new review

export const newReview = createAsyncThunk("Review",async(reviewData,{rejectWithValue})=> {
  try {
     console.log('he');
     const config={
      headers:{"Content-Type":"application/json"},
     }
    const  data  = await axios.put(`/api/v1/review`,reviewData,config);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});




export const newReviewReducer=createSlice({
  name:"Review",
  initialState:{loading:true},
  reducers:{
    clearErr:(state,action)=>{
      return {
        ...state,
        error: null,
      };
      // state.error=null;
    },
    newReviewReset:(state,action)=>{
      return{
      ...state,
      success:false,
    };
  }
  },
 extraReducers:(builder)=>{
         builder.addCase( newReview.pending,(state)=>{
          return {
            loading: true,
            ...state,
          };
         })
         .addCase( newReview.fulfilled,(state,action)=>{
          return {
            loading: false,
            success: action.payload.data.success,
           // Ratings: action.payload.data.ratings,
          };
         // state.Product=action.payload.data;
         // state.loading=false;
         })
         .addCase( newReview.rejected,(state,action)=>{
          return {
            ...state,
            loading: false,
            error: action.payload.data.message,
          };
         // state.loading=false;
         // state.error=action.payload.data.message
         })
 }
});



// delete review of a product

export const deleteReviews = createAsyncThunk("Review/delete",async(arg,{rejectWithValue})=> {
  try {
    const {reviewId,productId}=arg;
    const  data  = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const reviewReducer=createSlice({
  name:"ReviewProduct",
  initialState:{loading:true},
  reducers:{
    clearUpErr:(state,action)=>{
      return {
        ...state,
        error: null,
      };
      // state.error=null;
    },
    deleteReviewReset:(state,action)=>{
      return{
      ...state,
      isDeleted:false,
    };
  }
  },
 extraReducers:(builder)=>{
         builder.addCase( deleteReviews.pending,(state)=>{
          return {
            loading: true,
            ...state,
          };
         })
         .addCase( deleteReviews.fulfilled,(state,action)=>{
          return {
            loading: false,
            isDeleted: action.payload.data.success,
          };
         })
         .addCase( deleteReviews.rejected,(state,action)=>{
          return {
            ...state,
            loading: false,
            error: action.payload.data.message,
          };
         // state.loading=false;
         // state.error=action.payload.data.message
         })
 }
});



// create new product admin


export const createProduct = createAsyncThunk("create/product",async(productData,{rejectWithValue})=> {
  try {
     console.log(productData);
     const config={
      headers:{"Content-Type":"multipart/form-data"},
     }
    const  data  = await axios.post(`/api/v1/admin/products/new`,productData,config);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});


export const newProductReducer=createSlice({
  name:"Create",
  initialState:{product:{}},
  reducers:{
    clearEr:(state,action)=>{
      return {
        ...state,
        error: null,
      };

    },
    newProductReset:(state,action)=>{
      return{
      ...state,
      success:false,
    };
  }
  },
 extraReducers:(builder)=>{
         builder.addCase( createProduct.pending,(state)=>{
          return {
            loading: true,
            ...state,
          };
         })
         .addCase( createProduct.fulfilled,(state,action)=>{
          return {
            loading: false,
            success: action.payload.data.success,
            product: action.payload.data.product,
           
          };

         })
         .addCase( createProduct.rejected,(state,action)=>{
          return {
            ...state,
            loading: false,
            error: action.payload.data.message,
          };
         
         })
 }
});


// delete product admin

export const deleteProduct = createAsyncThunk("Delete/Product",async(id,{rejectWithValue})=> {
  try {
     console.log('he');
    
    const  data  = await axios.delete(`/api/v1/admin/product/${id}`);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});

// update product for admin

export const updateProduct = createAsyncThunk("update/product",async(arg,{rejectWithValue})=> {
  try {
     const {productId, myForm}=arg;
     console.log(productId, myForm);
     const config={
      headers:{"Content-Type":"multipart/form-data"},
     }
    const  data  = await axios.put(`/api/v1/admin/product/${productId}`, myForm,config);
    return data

  } catch (error) {
    return rejectWithValue(error.response);
  }
});


export const productReducer=createSlice({
  name:"Delete",
  initialState:{
    product:{}
  },
  reducers:{
    clearERROR:(state,action)=>{
      return {
        ...state,
        error: null,
      };

    },
    deleteProductReset:(state,action)=>{
      return{
      ...state,
      isDeleted:false,
    };
  },
   updateProductReset:(state,action)=>{
    return{
    ...state,
    isUpdated:false,
  };
},
  


  },
 extraReducers:(builder)=>{
         builder.addCase( deleteProduct.pending,(state)=>{
          return {
            loading: true,
            ...state,
          };
         })
         .addCase( deleteProduct.fulfilled,(state,action)=>{
          return {
            ...state,
            loading: false,
            isDeleted: action.payload.data.success,
           
          };

         })
         .addCase( deleteProduct.rejected,(state,action)=>{
          return {
            ...state,
            loading: false,
            error: action.payload.data.message,
          };
         
         })
         builder.addCase( updateProduct.pending,(state)=>{
          return {
            loading: true,
            ...state,
          };
         })
         .addCase( updateProduct.fulfilled,(state,action)=>{
          return {
            ...state,
            loading: false,
            isUpdated: action.payload.data.success,
           
          };

         })
         .addCase( updateProduct.rejected,(state,action)=>{
          return {
            ...state,
            loading: false,
            error: action.payload.data.message,
          };
         
         })
 }
});

export const { clearErrors } = productsReducer.actions;
export const { clearError,clearUp } = productDetailsReducer.actions;
export const { clearErr,newReviewReset } = newReviewReducer.actions;
export const { clearEr,newProductReset } = newProductReducer.actions;
export const { clearERROR,deleteProductReset,updateProductReset } = productReducer.actions;
export const { clearUpError} = productReviewsReducer.actions;
export const { clearUpErr,deleteReviewReset } = reviewReducer.actions;



