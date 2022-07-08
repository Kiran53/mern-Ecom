import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const user = createAsyncThunk(
    "auth/user",
    async (_,thunkAPI) => {
        try {
            console.log("made req")
            const response = await axios.get('/api/user')
            console.log("auth/user/dispatch"+response.data)
            return response.data
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
)
export const register = createAsyncThunk(
    "auth/register",
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await axios.post('/api/register', {
                name: username,
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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            //   return message;
            // thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await axios.post('/api/login', { email, password }, { withCredentials: true });
            return { user: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            // return message
            // thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
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
            state.user=action.payload.data.name
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user=null
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user.data.name;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [user.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload.user.data
        },
        [user.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.user = null
        },
    },
});

const { reducer } = authSlice;
export default reducer;