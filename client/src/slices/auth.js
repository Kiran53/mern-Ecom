import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./error";


export const user = createAsyncThunk(
    "auth/user",
    async (_,thunkAPI) => {
        try {
            // console.log("made req")
            const response = await axios.get('/api/user')
            // console.log(response.data)
            return response.data 
        } 
        catch (error) {
            
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)
export const register = createAsyncThunk(
    "auth/register",
    async ({ name, email, password }, thunkAPI) => {
        try {
            const response = await axios.post('/api/register', {
                name: name,
                email: email,
                password: password
            },
                {
                    withCredentials: true
                }
            );
            // thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            
            //   return message;
            const msg=error.response.data
            msg.type=2
            msg.dis=true
            thunkAPI.dispatch(setError(msg));
            return thunkAPI.rejectWithValue()
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await axios.post('/api/login', { email, password }, { withCredentials: true });
            // console.log(data)
            return { user: data };
        } catch (error) {
            const msg=error.response.data
            msg.type=1
            msg.dis=true
            thunkAPI.dispatch(setError(msg));
            return thunkAPI.rejectWithValue()
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async () => {
    await axios.post('/api/logout')
        .then(res => console.log(res))
});
const initialState = { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user=action.payload.data
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user=null
        },
        [login.fulfilled]: (state, action) => {

            state.isLoggedIn = true;
            state.user = action.payload.data;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;

        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            window.alert("Logged Out!")
        },
        [user.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
            // console.log("user fulfilled: "+state.user)
        },
        [user.rejected]: (state, action) => {
            // console.log("rejected")
            state.isLoggedIn = false
            state.user = null
        },
    },
});

const { reducer } = authSlice;
export default reducer;