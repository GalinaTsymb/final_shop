import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {addToCart, removeFromCart} from "../store/actions/cartActions";
import {Link} from "react-router-dom";
import {getProductImageUrl} from "../utils/consts";
import Button from "react-bootstrap/Button";

const Cart = (props) => {

    const dispatch = useDispatch();
    const { cartItems, loading, error, cartId } = useSelector(state => state.cart);

    const productId = props.match.params.id;

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(cartId, productId));
        }
    }, [dispatch]);

    const checkoutHandler = () => {
        props.history.push("/profile");
    };

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(cartId, productId));
    };

    return (
        <Container className="flex-grow-1 flex-shrink-1">
            <div className="pt-5 pb-5">
                <h2 className="text-center">Корзина покупок</h2>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Фото</th>
                        <th>Наименование</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Всего</th>
                    </tr>
                    </thead>

                    { cartItems.length === 0 ? <caption className="text-center ts_not"> Ваша корзина пустая</caption> :
                        <tbody>
                        { !loading && !error &&
                        cartItems.map( item =>
                            <tr key={item.id_prod}>
                                <td><img className="ts_w" src={getProductImageUrl(item.image)} alt="product"/></td>
                                <td><Link to={"/product/" + item.product}>{item.name_prod}</Link></td>
                                <td>
                                    <button className="ts_btn badge badge-primary badge-sm" onClick={() => removeFromCartHandler(item.id_prod)}>-</button>
                                    <span>{item.qty}</span>
                                    <button className="ts_btn badge badge-primary badge-sm" onClick={() => dispatch(addToCart(cartId, item.id_prod))}>+</button>
                                </td>
                                <td>{item.price_prod} грн</td>
                                <td>{(item.qty * item.price_prod).toFixed(2)} грн</td>
                            </tr>

                        )}
                        </tbody>
                    }

                    {
                        cartItems.length > 0 && !loading && !error &&
                        <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="ts_yes"><strong>Общая сумма: </strong></td>
                            <td className="ts_yes"><strong>{
                                (cartItems.reduce((a,c) => a + (c.qty * c.price_prod), 0)).toFixed(2)
                            } грн</strong></td>
                        </tr>
                        </tfoot>
                    }

                </Table>
                    <div className="d-flex justify-content-between mt-3 ml-3 mr-3 pt-2 pr-2 pl-2">
                        <Link to="/" className="ml-2 ml-2 btn btn-secondary">Продолжить покупки</Link>
                        {
                            cartItems.length >0  &&
                            <Button onClick={checkoutHandler} className="ml-2 ml-2 btn btn-secondary">Оформить заказ</Button>
                        }

                    </div>
            </div>
        </Container>
    );
};

export default Cart;
