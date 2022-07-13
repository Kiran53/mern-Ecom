import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import errorReducer from './slices/error'
import itemReducer from './slices/item'
import cartReducer from './slices/cart'
const reducer={
  auth:authReducer, 
  error:errorReducer,
  item:itemReducer,
  cart:cartReducer
}
const store= configureStore({
    reducer: reducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})

export default store;