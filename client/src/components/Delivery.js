import React, {useEffect, useState} from 'react';
import Checkout from "./Checkout";
import { ORDER_ROUTE} from "../utils/consts";
import {loadDelivery, saveDelivery} from "../store/actions/deliveryActions";
import {useDispatch, useSelector} from "react-redux";
import Col from "react-bootstrap/Col";
import {Form} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const Delivery = (props) => {

    const dispatch = useDispatch();
    const {delivery, loadingDelivery, errorDelivery} = useSelector(state => state.delivery);
    const [deliveryMethod, setDeliveryMethod] = useState('');

    useEffect(() => {
        dispatch(loadDelivery())
    }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveDelivery({ deliveryMethod }));
        props.history.push(ORDER_ROUTE);
    };

    return (
        <Container className="flex-grow-1 flex-shrink-1">
            <Checkout step1 step2 step3 /> <Col md={6} className="m-auto ">
            <div className="d-flex flex-column mt-5 pt-4 pl-5 pr-5 pb-4 border">
                <h2 className="mb-4 text-center">Выберите способ доставки</h2>
                {loadingDelivery ? (<div>Loading...</div>) : errorDelivery ? (<div>{errorDelivery}</div>) : (
                    <Form onSubmit={submitHandler}>

                        {delivery.map((item) => (
                            <Form.Check
                                className = "mb-2"
                                name      = "group1"
                                key       = {item.id_delivery}
                                type      = "radio"
                                id        = {item.name_delivery}
                                label     = {item.name_delivery}
                                value     = {item.id_delivery}
                                onChange  = {(e) => setDeliveryMethod(e.target.value)}
                            />
                        ))}

                        <button type="submit" disabled={!deliveryMethod} className="d-block ml-auto mt-3 btn btn-success">
                            Далее
                        </button>
                    </Form>
                )}
            </div>
        </Col>
        </Container>
    );
};

export default Delivery;
