import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "../../utils/api"



export const fetchuserdata =createAsyncThunk('user/fetchuser',async()=>{
    const res= await api.get('/auth');
    return res.data
})

const userslice =createSlice({
    name:'user',
     initialState:{
        userdetails:{},
        error:null,
        isLoggin:null,
        isguest:null
     },

     reducers:{
        logout:(state)=>{

state.userdetails=null;
state.isLoggin=false
state.isguest=true
localStorage.removeItem('token');
        },
        returnuser:(state)=>{
         return state
        },
        updateallpost:(state,action)=>{
         state.userdetails.allpost.push(action.payload);
      return state  
      },
      removepost:(state,action)=>{

         state.userdetails.allpost=state.userdetails.allpost.filter(fl=>fl._id!==action.payload)
      } 



     },
     extraReducers:(builder)=>{
        builder
        .addCase(fetchuserdata.fulfilled,(state,action)=>{
            state.userdetails=action.payload
  state.isLoggin=true
  state.isguest=false
  return state    
        })
        .addCase(fetchuserdata.rejected,(state,action)=>{
         console.log(action.error.code==='ERR_BAD_REQUEST');
            state.error='ERR_BAD_REQUEST';
            state.isLoggin=false
            state.isguest=true
            localStorage.removeItem('token')
      
         })
    
        .addDefaultCase(state=>state)
     }
})

 export  const {logout,returnuser,updateallpost,removepost}=userslice.actions

//export const users = state=>state.user.userdetails
export default userslice.reducer


