import './App.css';
import Nav from './components/Nav';
import user from './slices/auth'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import Home from './components/Home'
import Item from './components/Item';
import Cart from './components/Cart';
import Login from './components/auth/Login';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    console.log("app.js/dispatch")
      dispatch(user())
  },[])
  const Navlayout=()=>{
    return <>

    <Nav/>
    <Outlet/>
    </>
    }
  return (
    <div>

      <Router>

        <Routes>
          
            <Route path="/" element={<Navlayout/>}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/item" element={<Item />} />
              <Route exact path="/cart" element={<Cart />} />
            </Route>
          <Route exact path="/login"  element={<Login page={"tab-1"} />} />
          <Route exact path="/register"  element={<Login page={"tab-2"} />} />
          
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
