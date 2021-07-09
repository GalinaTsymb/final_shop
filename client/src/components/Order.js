import React, {useEffect} from 'react';
import Checkout from "./Checkout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useDispatch, useSelector} from "react-redux";
import {getProductImageUrl, THANKS_ROUTE} from "../utils/consts";
import Button from "react-bootstrap/Button";
import {saveOrder, saveOrderDetails} from "../store/actions/orderActions";


const Order = (props) => {

    const dispatch = useDispatch();

    const {delivery, deliveryChoice} = useSelector(state => state.delivery);
    const {userProfile}              = useSelector(state => state.userProfile);
    const {payments, paymentChoice}  = useSelector(state => state.payment);
    const {cartItems, cartId }       = useSelector(state => state.cart);
    const {order}                    = useSelector(state => state.order);

    const [userDelivery] = delivery.filter(item => item.id_delivery === +deliveryChoice.deliveryMethod);

    const totalQty = cartItems.reduce((a,c) => a + c.qty, 0);
    const totalSum = cartItems.reduce((a,c) => a + c.qty*c.price_prod, 0);

    useEffect(() =>{
        dispatch(saveOrderDetails({order, cartId, cartItems}));
        if(order) props.history.push(THANKS_ROUTE);

    },[order, cartId, cartItems, dispatch, props.history]);

    const orderHandler = () => {
        dispatch(saveOrder({
                             id_payment: parseInt(paymentChoice.paymentMethod),
                             id_user: userProfile.id_user,
                             id_delivery: parseInt(deliveryChoice.deliveryMethod),
                             status: 'in process'}));
    };

    return (
        <Container className="flex-grow-1 flex-shrink-1">
            <Checkout step1 step2 step3 step4/>
            <div className="mt-5">
                <Row>
                    <Col xs={8} className="mr-4">
                        <Row className="border rounded p-2 mb-3 d-flex flex-column">
                            <h4>Доставка</h4>
                           <div className="d-block">
                                <span>{userDelivery.name_delivery},</span>
                               {+deliveryChoice.deliveryMethod === 1 ?
                                   <span className="ml-2"><strong>Отделение:</strong> {userProfile.branchNP},</span> :
                                   +deliveryChoice.deliveryMethod === 2 ?
                                       <span className="ml-2"><strong>Адресс:</strong> {userProfile.city}, {userProfile.address},</span> :
                                       <>
                                           <span className="ml-2"><strong>Отделение:</strong> {userProfile.branchNP},</span>
                                           <span className="ml-2"><strong>Адресс:</strong> {userProfile.address}</span>
                                       </>
                               }
                               <span className="ml-2"><strong>Телефон:</strong>{userProfile.phone}</span>
                            </div>
                        </Row>
                        <Row className="border rounded p-2 mb-3 d-flex flex-column">
                            <h4>Оплата</h4>
                            <div className="d-block">
                                {payments.map(item => {
                                    if(item.id_payment === +paymentChoice.paymentMethod)
                                        return item.name;
                                })}
                            </div>
                        </Row>
                        <Row className="border rounded p-2 mb-3 d-flex flex-column">
                            <h4>Корзина</h4>
                            {
                                cartItems.map( item =>
                                    <div key={item.id_prod} className="d-flex justify-content-between">
                                        <Col xs={3} ><img className="ts_w" src={getProductImageUrl(item.image)} alt="product"/></Col>
                                        <Col xs={3} className="text-center">{item.name_prod}</Col>
                                        <Col xs={3} className="text-center">{item.qty}</Col>
                                        <Col xs={3} className="text-center">{item.price_prod} грн</Col>
                                    </div>
                                )}
                        </Row>
                    </Col>
                    <Col xs={3}>
                        <Row className="border rounded p-3 d-flex flex-column">
                           <h4 className="text-center text-success">Ваш заказ</h4>
                            <p className="d-flex justify-content-between">
                                <span>Количество товаров:</span>
                                <span>{totalQty}</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Сумма заказа:</span>
                                <span >{ (totalSum).toFixed(2) } грн</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Стоимость доставки:</span>
                                <span>{ userDelivery.price_delivery } грн</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span><strong>Общая сумма заказа:</strong></span>
                                <span><strong>{ (+userDelivery.price_delivery + totalSum).toFixed(2)} грн</strong></span>
                            </p>

                        </Row>
                        <Button className="btn btn-danger mt-5 ml-auto d-block" onClick={orderHandler} type="submit">Заказать</Button>
                    </Col>
                </Row>
            </div>

        </Container>
    );
};

export default Order;
