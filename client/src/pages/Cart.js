import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, getUserCart} from "../store/actions/cart";
import {decodeToken} from "../utils/consts";


const Cart = (props) => {

    const dispatch = useDispatch();

    const {isAuthentication, userInfo } = useSelector(
        state => state.userLogin
    );
   let decodeT = decodeToken(userInfo.token);

    const {userCart, fetchingCart, errorCart} = useSelector(
        state => state.userCart
    );
    console.log('cart userCart',userCart );
    const productId = props.match.params.id;
    useEffect(() => {
        dispatch(getUserCart(decodeT))
    }, [dispatch]);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId));
        }
    }, [dispatch]);

    return (

        <Container>

            <h2>Корзина покупок</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Код товара</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Всего</th>
                </tr>
                </thead>
                <tbody>
                {!fetchingCart && !errorCart && userCart && (
                    <>
                    {userCart.length <=0 ? <p>У Вас нет товаров в корзине</p>
                        :
                        userCart.map( item => {
                            return (
                                <tr>
                                    <td>{item.name_prod}</td>
                                    <td>{item.id_prod}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price_prod}</td>
                                    <td>{(item.qty * item.price_prod).toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                    </>
                )}
                </tbody>
            </Table>

        </Container>

    );
};

export default Cart;
