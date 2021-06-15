import React, {useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {CART_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, USER_ROUTE} from "../utils/consts";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthentication, logout} from "../store/actions/user";
import Button from "react-bootstrap/Button";
import {getUserCart} from "../store/actions/cart";
import {decodeToken} from "../utils/consts";


const NavBar = () => {

    const dispatch = useDispatch();

    const {isAuthentication, userInfo} = useSelector(
        state => state.userLogin
    );

    let decodeT;
    if(userInfo) {
        decodeT = decodeToken(userInfo.token);
    }
    const {userCart, fetchingCart, errorCart} = useSelector(
        state => state.userCart
    );
    console.log('cart userCart navbar',userCart );
    useEffect(()=>{
        dispatch(checkAuthentication());
        dispatch(getUserCart(decodeT))
    }, [dispatch]);


    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE}><img alt="logo" src='../logo.png' className="d-inline-block align-top"/></NavLink>
                    {isAuthentication ?
                        <Nav className="ml-auto">
                            <h5>{decodeT}</h5>
                            <NavLink to={USER_ROUTE} className="ml-2 ml-2 btn btn-outline-light">Мой профиль</NavLink>
                            <NavLink to={CART_ROUTE} className="ml-2 ml-2 btn btn-outline-light">Корзина <span>(0)</span></NavLink>
                            <Button  onClick={handleLogout} to={SHOP_ROUTE} className="ml-2 ml-2 btn btn-outline-light">Выйти</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto">
                            <NavLink to={ LOGIN_ROUTE} className="ml-2 ml-2 btn btn-outline-secondary" >Войти</NavLink>
                            <NavLink to={ REGISTRATION_ROUTE} className="ml-2 ml-2 btn btn-outline-secondary" >Зарегистрироваться</NavLink>
                        </Nav>
                    }
            </Container>
        </Navbar>
    );
};

export default NavBar;
