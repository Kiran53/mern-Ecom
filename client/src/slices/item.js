import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const get= createAsyncThunk(
    "item/get",
    async(pid,thunkAPI)=>{
        try {
            console.log("made req")
            const res=await axios.get(`/api/item/${pid}`)
            // console.log(res.data)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)
export const add= createAsyncThunk(
    "item/add",
    async(data,thunkAPI)=>{
        try {
            const res=await axios.post('/api/item/',{data})
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)
export const drop= createAsyncThunk(
    "item/add",
    async(data,thunkAPI)=>{
        try {
            const res=await axios.delete(`/api/item/${data.pid}`)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)
export const update= createAsyncThunk(
    "item/add",
    async(data,thunkAPI)=>{
        try {
            const res=await axios.patch('/api/item/',{params:{userId: data.pid}},{
                productid: data.productId,
                quantity: data.quantity,
            })
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)
const initialState={
    item:null,
    loading:true
}

const itemSlice= createSlice({
    name: "item",
    initialState,
    extraReducers:{
        [get.fulfilled]: (state, action) => {
            state.item=action.payload
            state.loading=false
            // console.log(action.payload)
        },
        [get.rejected]: (state, action) => {
            state.item=null
            state.loading=true
        },
        [add.fulfilled]: (state, action) => {
            state.item=action.payload
        },
        // [add.rejected]: (state, action) => {},
        [drop.fulfilled]: (state, action) => {
            state.item=action.payload
        },
        // [drop.rejected]: (state, action) => {},
        [update.fulfilled]: (state, action) => {
            state.item=action.payload
        },
        // [update.rejected]: (state, action) => {},
    }
})
const {reducer}=itemSlice
export default reducer