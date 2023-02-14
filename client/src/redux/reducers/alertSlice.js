import { createSlice } from "@reduxjs/toolkit";







const alertSlice = createSlice({
    name:'alert',
    initialState:{
        message:null,
        type:null
    },
    reducers:{
        setalert:(state,action)=>{
            console.log('action invoked');
          state.message=action.payload.message
          state.type=action.payload.type
        },
        removealert:(state)=>{
state.message=null
state.type=null
        }
        
    }
    
})

export const {setalert,removealert}=alertSlice.actions

export default alertSlice.reducer

