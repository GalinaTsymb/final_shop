import React, {useEffect} from "react";
import './App.scss';
import { BrowserRouter} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Cookie from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthentication, getUserProfile} from "./store/actions/userAction";
import AppRouter from "./components/AppRouter";
import {initCart, initCartList} from "./store/actions/cartActions";
import Footer from "./components/Footer";



function App() {
  const token = Cookie.get('token') || null;
  const dispatch = useDispatch();

  const {userInfo} = useSelector( state => state.userLogin);

  useEffect(()=>{
    dispatch(checkAuthentication(token));
  }, [token, dispatch]);

  useEffect(() =>{
    dispatch(initCart(userInfo));
    }, [userInfo, dispatch]);

  useEffect(() =>{
    dispatch(initCartList(userInfo));
  }, [userInfo, dispatch]);

  useEffect(() => {
    dispatch(getUserProfile(userInfo))
  },[userInfo, dispatch]);

  return (
  <BrowserRouter>
    <NavBar />
    <AppRouter/>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
