import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Login
export const login=createAsyncThunk("Users/login",async(arg,{rejectWithValue})=>{
  
    try{
      let {loginEmail ,loginPassword}=arg;
      
      let email=loginEmail;
      let password=loginPassword;
      const config={ headers : { "Content-Type" : "application/json" } };
      const data= await axios.post(
        `/api/v1/login`,
        {email,password},
        config
      );

      return data;
    }
    catch(error){
        return rejectWithValue(error.response);
    }
});

//register

export const register=createAsyncThunk("Users/register",async(myForm,{rejectWithValue})=>{
  
  try{
    console.log(myForm);
    const config={ headers : { "Content-Type" : "multipart/form-data" } };
    const data= await axios.post(
      `/api/v1/register`,
      myForm,
      config
    );

    return data;
  }
  catch(error){
      return rejectWithValue(error.response);
  }
});

// Load User
export const loadUser = createAsyncThunk("Users/loaduser",async(arg,{rejectWithValue}) => {
  try {

    const data  = await axios.get(`/api/v1/me`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

// Logout User
export const logout = createAsyncThunk("Users/logout",async(arg,{rejectWithValue}) => {
  try {

     await axios.get(`/api/v1/logout`);
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

// update password

export const updatePassword=createAsyncThunk("Users/Password",async(passwords,{rejectWithValue})=>{
  
  try{
    console.log('passwords');
    console.log(passwords);
    const config={ headers : { "Content-Type" : "application/json" } };
    const data= await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    return data;
  }
  catch(error){
      return rejectWithValue(error.response);
  }
})

// get all users
export const getAllUsers = createAsyncThunk("Users/all",async(arg,{rejectWithValue}) => {
  try {

    const data  = await axios.get(`/api/v1/admin/users`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});


// get  user details
export const getUserDetails = createAsyncThunk("Users/details",async(id,{rejectWithValue}) => {
  try {

    const data  = await axios.get(`/api/v1/admin/user/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});



// update user

export const updateUser=createAsyncThunk("Users/update",async(arg,{rejectWithValue})=>{
  
  try{
    const {id,myForm}=arg;
   // console.log('passwords');
   // console.log(passwords);
    const config={ headers : { "Content-Type" : "application/json" } };
    const data= await axios.put(
      `/api/v1/admin/user/${id}`,
      myForm,
      config
    );

    return data;
  }
  catch(error){
      return rejectWithValue(error.response);
  }
})


// delete user

export const deleteUser=createAsyncThunk("Users/delete",async(id,{rejectWithValue})=>{
  
  try{
    
    const data= await axios.delete(
      `/api/v1/admin/user/${id}`
    );

    return data;
  }
  catch(error){
      return rejectWithValue(error.response);
  }
})




export const userReducerLogin=createSlice({
    name:"Login",
    initialState:{user:{}},
    reducers:{
      clearErrors:(state,action)=>{
        return {
          ...state,
          error: null,
        };
      }
    },
   extraReducers:(builder)=>{
           builder.addCase(login.pending,(state)=>{
            return {
              loading: true,
              isAuthenticated:false,
            };
           }).addCase(login.fulfilled,(state,action)=>{
            return{
              ...state,
              loading:false,
              isAuthenticated:true,
              user:action.payload.data.user,
            }
           }).addCase(login.rejected,(state,action)=>{
            return{
                ...state,
              loading:false,
              isAuthenticated:false,
              user:null,
              error:action.payload.data.message
            }
           })
           builder.addCase(register.pending,(state)=>{
            return {
              loading: true,
              isAuthenticated:false,
            };
           }).addCase(register.fulfilled,(state,action)=>{
            return{
              ...state,
              loading:false,
              isAuthenticated:true,
              user:action.payload.data.user,
            }
           }).addCase(register.rejected,(state,action)=>{
            return{
                ...state,
              loading:false,
              isAuthenticated:false,
              user:null,
              error:action.payload.data.message
            }
           })
           builder.addCase(loadUser.pending,(state)=>{
            return {
              loading: true,
              isAuthenticated:false,
            };
           }).addCase(loadUser.fulfilled,(state,action)=>{
            return{
              ...state,
              loading:false,
              isAuthenticated:true,
              user:action.payload.data.user,
            }
           }).addCase(loadUser.rejected,(state,action)=>{
            return{
              loading:false,
              isAuthenticated:false,
              user:null,
              error:action.payload.data.message
            }
           })
           builder.addCase(logout.fulfilled,(state,action)=>{
            return{
              loading:false,
              isAuthenticated:false,
              user:null,
            }
           }).addCase(logout.rejected,(state,action)=>{
            return{
              ...state,
              loading:false,
              error:action.payload.data.message
            }
           })
   }
})

export const { clearErrors } = userReducerLogin.actions;

// for update profile ----


export const updateProfile=createAsyncThunk("Users/Profile",async(userData,{rejectWithValue})=>{
  
  try{
    const config={ headers : { "Content-Type" : "multipart/form-data" } };
    const data= await axios.put(
      `/api/v1/me/update`,
      userData,
      config
    );

    return data;
  }
  catch(error){
      return rejectWithValue(error.response);
  }
})

export const profileReducer=createSlice({
  name:"Profile",
  initialState:{},
  reducers:{
    clearError:(state,action)=>{
      return {
        ...state,
        error: null,
      };
    },
    updateProfileReset:(state,action)=>{
      return {
        ...state,
        isUpdated: false,
      };
    },
    updatePasswordReset:(state,action)=>{
      return {
        ...state,
        isUpdated: false,
      };
    },
    updateUserReset:(state,action)=>{
      return {
        ...state,
        isUpdated: false,
      };
    },
    deleteUserReset:(state,action)=>{
      return {
        ...state,
        isDeleted: false,
      };
    }
  },
 extraReducers:(builder)=>{
         builder.addCase(updateProfile.pending,(state)=>{
          return {
            ...state,
            loading: true,
            };
         })
         .addCase(updateProfile.fulfilled,(state,action)=>{
          return{
            ...state,
            loading:false,
            isUpdated:action.payload.data.success,
          }
         })
         .addCase(updateProfile.rejected,(state,action)=>{
          return{
              ...state,
            loading:false,
            error:action.payload.data.message
          }
         })
         builder.addCase(updatePassword.pending,(state)=>{
          return {
            ...state,
            loading: true,
            };
         })
         .addCase(updatePassword.fulfilled,(state,action)=>{
          return{
            ...state,
            loading:false,
            isUpdated:action.payload.data.success,
          }
         })
         .addCase(updatePassword.rejected,(state,action)=>{
          return{
              ...state,
            loading:false,
            error:action.payload.data.message
          }
         })
         builder.addCase(updateUser.pending,(state)=>{
          return {
            ...state,
            loading: true,
            };
         })
         .addCase(updateUser.fulfilled,(state,action)=>{
          return{
            ...state,
            loading:false,
            isUpdated:action.payload.data.success,
          }
         })
         .addCase(updateUser.rejected,(state,action)=>{
          return{
              ...state,
            loading:false,
            error:action.payload.data.message
          }
         })
         builder.addCase(deleteUser.pending,(state)=>{
          return {
            ...state,
            loading: true,
            };
         })
         .addCase(deleteUser.fulfilled,(state,action)=>{
          return{
            ...state,
            loading:false,
            isDeleted:action.payload.data.success,
            message:action.payload.data.message
          }
         })
         .addCase(deleteUser.rejected,(state,action)=>{
          return{
              ...state,
            loading:false,
            error:action.payload.data.message
          }
         })
 }
})


//forgot password

export const forgotPassword = createAsyncThunk("Users/forgotpassword",async(email,{rejectWithValue})=> {
  try {
     console.log(email);
    const config = { headers: { "Content-Type": "application/json" } };

    const  data  = await axios.post(`/api/v1/password/forgot`, email, config);

    return data
  } catch (error) {

    return rejectWithValue(error.response);
  }
});

// reset password
export const resetPassword = createAsyncThunk("Users/resetpassword",async(arg,{rejectWithValue})=> {
  try {
    const {token,myForm}=arg;
     console.log(token,myForm);
    const config = { headers: { "Content-Type": "application/json" } };

    const  data  = await axios.put(`/api/v1/password/reset/${token}`, myForm, config);

    return data
  } catch (error) {

    return rejectWithValue(error.response);
  }
});

export const forgotPasswordReducer=createSlice({
  name:"Profile",
  initialState:{},
  reducers:{
    clearErr:(state,action)=>{
      return {
        ...state,
        error: null,
      };
    },
  },
 extraReducers:(builder)=>{
         builder.addCase(forgotPassword.pending,(state)=>{
          return {
            ...state,
            loading: true,
            error:null
            };
         })
         .addCase(forgotPassword.fulfilled,(state,action)=>{
          return{
            ...state,
            loading:false,
            message:action.payload.data.message,
          }
         })
         .addCase(forgotPassword.rejected,(state,action)=>{
          return{
              ...state,
            loading:false,
            error:action.payload.data.message
          }
         })
         builder.addCase(resetPassword.pending,(state)=>{
          return {
            ...state,
            loading: true,
            error:null
            };
         })
         .addCase(resetPassword.fulfilled,(state,action)=>{
          return{
            ...state,
            loading:false,
            success:action.payload.data.success,
          }
         })
         .addCase(resetPassword.rejected,(state,action)=>{
          return{
              ...state,
            loading:false,
            error:action.payload.data.message
          }
         })
 }
})


// all user admin

export const allUsersReducer=createSlice({
  name:"allProfile",
  initialState:{users:[]},
  reducers:{
    clearEr:(state,action)=>{
      return {
        ...state,
        error: null,
      };
    },
  },
 extraReducers:(builder)=>{
         builder.addCase(getAllUsers.pending,(state)=>{
          return {
            ...state,
            loading: true,
            };
         })
         .addCase(getAllUsers.fulfilled,(state,action)=>{
          return{
            ...state,
            loading:false,
            users:action.payload.data.users,
          }
         })
         .addCase(getAllUsers.rejected,(state,action)=>{
          return{
              ...state,
            loading:false,
            error:action.payload.data.message
          }
         })
        
 }
})



// user details admin

export const userDetailsReducer=createSlice({
  name:"userProfile",
  initialState:{user:{}},
  reducers:{
    clearERR:(state,action)=>{
      return {
        ...state,
        error: null,
      };
    },
  },
 extraReducers:(builder)=>{
         builder.addCase(getUserDetails.pending,(state)=>{
          return {
            ...state,
            loading: true,
            };
         })
         .addCase(getUserDetails.fulfilled,(state,action)=>{
          return{
            ...state,
            loading:false,
            user:action.payload.data.user,
          }
         })
         .addCase(getUserDetails.rejected,(state,action)=>{
          return{
              ...state,
            loading:false,
            error:action.payload.data.message
          }
         })
        
 }
})



export const { clearError,updateProfileReset,updatePasswordReset,updateUserReset,deleteUserReset } = profileReducer.actions;
export const { clearErr }=forgotPasswordReducer.actions;
export const { clearEr }=allUsersReducer.actions;
export const { clearERR }=userDetailsReducer.actions;




