import { createSlice} from "@reduxjs/toolkit";

const initialState = {} 
const errorSlice= createSlice({
    name: 'error',
    initialState,
    reducers:{
        setError: (state,action)=>{
            // console.log("called")
            return {error: action.payload}
        } ,
        clearError :()=>{
            return {error: {msg:''}}
        },
    },
})

const {reducer,actions}= errorSlice
export const {setError,clearError}= actions
export default reducer