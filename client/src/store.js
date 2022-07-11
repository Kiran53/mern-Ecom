import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import errorReducer from './slices/error'
const reducer={auth:authReducer, error:errorReducer}
const store= configureStore({
    reducer: reducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})

export default store;