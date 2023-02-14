import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";


export const createpost = createAsyncThunk('/post/createpost',async(data)=>{



    const res= await api.post('/createpost',data);

    return res.data

})


export const initialpost = createAsyncThunk('/post/startingpost',async(data)=>{
  const res = await api.get('/post/startingpost')
   
  return res.data
})




const postreducer=createSlice({
    name:'post'
    ,initialState:{
        post:null,
        error:null,
        allpost:null

    },

    reducers:{
   addpost:(state,action)=>{
    state.allpost=action.payload;
   },
   createpostcomment:(state,action)=>{
 
const index=  state.allpost.findIndex(fin=>fin._id===action.payload._id)


 state.allpost[index].allcomment.push(action.payload.data)
},

deletecomment:(state,action)=>{
 
  const postindex=  state.allpost.findIndex(fin=>fin._id===action.payload.postid)
 
 state.allpost[postindex].allcomment=state.allpost[postindex].allcomment.filter(fin=>fin._id!==action.payload.commentid)

},

addliketopost:(state,action)=>{

  const postidnex = state.allpost.findIndex(fin=>fin._id===action.payload.postid)


  state.allpost[postidnex].allcomment[action.payload.i].likes.push(action.payload.userid)

},




removelikefromcomment:(state,action)=>{
  const postidnex = state.allpost.findIndex(fin=>fin._id===action.payload.postid)

  const commentindex=state.allpost[postidnex].allcomment.findIndex(fin=>fin._id===action.payload.commentid)


  state.allpost[postidnex].allcomment[commentindex].likes=state.allpost[postidnex].allcomment[commentindex].likes.filter(fid=>fid!==action.payload.userid)


},
updatecommentfrompost:(state,action)=>{
  const postidindex = state.allpost.findIndex(fin=>fin._id===action.payload.postid)
    
 const oldcomment= state.allpost[postidindex].allcomment[action.payload.commentindex]
 oldcomment['comment']=action.payload.comment

console.log(oldcomment)
},
updatepageview:(state,action)=>{
  console.log(action.payload.postid )
const postindex = state.allpost.findIndex(fi=>fi._id===action.payload.postid)

state.allpost[postindex].pageview+=1

},

postlike:(state,action)=>{
state.allpost[action.payload.index].likes.push(action.payload.userid)

},
removelike:(state,action)=>{
  state.allpost[action.payload.index].likes=state.allpost[action.payload.index].likes.filter(fid=>fid!==action.payload.userid)
}


    },

 
    extraReducers:(builder)=>{
  builder.addCase(createpost.fulfilled,(state,action)=>{
    state.post=action.payload
  })
  builder.addCase(createpost.rejected,(state,action)=>{
    state.error=action.payload
  })
  builder.addDefaultCase(state=>state)
    },
    extraReducers:(builder)=>{
builder.addCase(initialpost.fulfilled,(state,action)=>{
  state.allpost=action.payload
})
builder.addCase(initialpost.rejected,(state,action)=>{
  state.allpost=null
})
builder.addDefaultCase(state=>state)
    }
})

export const {addpost,
  createpostcomment,
  deletecomment,
  addliketopost,
  removelikefromcomment,
  updatecommentfrompost,
  updatepageview,
  postlike,
  removelike

}=postreducer.actions

export default  postreducer.reducer  