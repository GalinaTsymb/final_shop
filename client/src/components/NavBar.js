import React from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/actions/userAction";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";

const NavBar = () => {
    const dispatch = useDispatch();

    const {userInfo} = useSelector(
        state => state.userLogin
    );
    const {userProfile, loadingProfile, errorProfile} = useSelector(state => state.userProfile);

    const {cartItems, loading, error} = useSelector(
        state => state.cart
    );

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };
    return (
        <Navbar bg="dark" variant="dark" className="flex-grow-0 flex-shrink-0 ">
            <Container>
                <Link to={SHOP_ROUTE}><img alt="logo" src='../logo.png' className="d-inline-block align-top w-75"/></Link>
                {userInfo ?
                    <Nav className="ml-auto align-items-end">
                        <h5 className="ts_name_user">Hi, <span >{!loadingProfile && !errorProfile && userProfile.name}</span></h5>
                        <Link to="/user" className="ml-2 ml-2 btn btn-outline-light">Мой профиль</Link>
                        <Link to="/cart" className="ml-2 ml-2 btn btn-outline-light">Корзина <span>({
                            !loading && !error && cartItems &&
                            cartItems.reduce((a,c) => a + c.qty, 0)
                        })</span></Link>
                        <Button  onClick={handleLogout} to="/" className="ml-2 ml-2 btn btn-outline-light">Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Link to={LOGIN_ROUTE} className="ml-2 ml-2 btn btn-outline-secondary">Войти</Link>
                        <Link to={REGISTRATION_ROUTE} className="ml-2 ml-2 btn btn-outline-secondary">Зарегистрироваться</Link>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
};

export default NavBar;
