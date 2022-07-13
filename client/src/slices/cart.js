import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const get= createAsyncThunk(
    "cart/get",
    async(uid,thunkAPI)=>{
        try {
            const res=await axios.get(`/api/cart/${uid}`)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)
export const add= createAsyncThunk(
    "cart/add",
    async(data,thunkAPI)=>{
        try {
            const res=await axios.post(`/api/cart/${data.uid}`,{
                productid: data.productId,
                quantity: data.quantity,
            })
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)
export const drop= createAsyncThunk(
    "cart/add",
    async(data,thunkAPI)=>{
        try {
            const res=await axios.delete(`/api/cart/${data.uid}/${data.pid}`)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)
export const update= createAsyncThunk(
    "cart/add",
    async(data,thunkAPI)=>{
        try {
            const res=await axios.patch(`/api/cart/${data.uid}`,{
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
    cart:null
}

const cartSlice= createSlice({
    name: "cart",
    initialState,
    extraReducers:{
        [get.fulfilled]: (state, action) => {
            state.cart=action.payload.data
        },
        [get.rejected]: (state, action) => {
            state.cart=null
        },
        [add.fulfilled]: (state, action) => {
            state.cart=action.payload.data
        },
        // [add.rejected]: (state, action) => {},
        [drop.fulfilled]: (state, action) => {
            state.cart=action.payload.data
        },
        // [drop.rejected]: (state, action) => {},
        [update.fulfilled]: (state, action) => {
            state.cart=action.payload.data
        },
        // [update.rejected]: (state, action) => {},
    }
})
const {reducer}=cartSlice
export default reducer