import React, {useEffect} from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import { ordersList} from "../store/actions/orderActions";
import Col from "react-bootstrap/Col";
import {getProductImageUrl} from "../utils/consts";
import Item from "./Item";
import Loading from "./Loading";

const Orders = () => {

    const dispatch = useDispatch();
    const {userProfile} = useSelector(state => state.userProfile);

    const {loading, orders, orderDetails, loadingDetails, detailsError} = useSelector(state => state.order);

    useEffect(() =>{
        dispatch(ordersList(userProfile.id_user))
    }, [dispatch]);

    const convertDate = (date) => {
        let d = new Date(date);
        return d.toLocaleDateString('en-GB');
    };

    return (
        <Container>
            <Accordion className="mt-4" >
                { loading ? <Loading /> : orders.length > 0 ?
                    orders.map((order, index) =>
                        <Card className="mt-3" key={index}>

                            <Item eventKey={order.id_order}>
                                <div className="d-flex justify-content-around ">
                                    <span>Дата заказа: <strong>{convertDate(order.data_order)}</strong></span>
                                    <span>Сумма заказа: <strong>{order.total_sum}</strong></span>
                                    <span>Стоимость доставки: <strong>{order.sum_delivery}</strong></span>
                                    <span>Статус заказа: <strong>{order.status}</strong></span>
                                </div>
                            </Item>
                            <Accordion.Collapse eventKey={order.id_order}>
                                <Card.Body>
                                    {
                                        !loadingDetails && !detailsError && orderDetails && (
                                            orderDetails.map((item, index) =>
                                            <div key={index} className="d-flex justify-content-between mt-2">
                                                <Col xs={2} ><img className="w-25" src={getProductImageUrl(item.image)} alt="product"/></Col>
                                                <Col xs={3} className="text-center">{item.name_prod}</Col>
                                                <Col xs={2} className="text-center">{item.qty}</Col>
                                                <Col xs={2} className="text-center">{item.price} грн</Col>
                                                <Col xs={3} className="text-center">{item.summa} грн</Col>
                                            </div>
                                        ))
                                    }

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                ): <div> У Вас нет заказов!!! Советуем что-нибудь приобрести из нашего магазина</div> }
            </Accordion>
        </Container>
    );
};

export default Orders;
