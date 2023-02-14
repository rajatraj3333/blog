
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice'
import postSlice from './reducers/postSlice'
import alertSlice from './reducers/alertSlice'
const store = configureStore({
    reducer:{
user:userSlice,
post:postSlice,
alert:alertSlice
    }
})
export default store
