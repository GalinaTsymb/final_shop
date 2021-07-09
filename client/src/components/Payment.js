import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Checkout from "./Checkout";
import {DELIVERY_ROUTE} from "../utils/consts";
import {loadPayments, savePayment} from "../store/actions/paymentActions";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Payment = (props) => {
    const {payments, loadingPayment, errorPayment}   = useSelector(state => state.payment);
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        dispatch(loadPayments());

    }, [ dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push(DELIVERY_ROUTE);
    };
    return (
        <Container className="flex-grow-1 flex-shrink-1">
            <Checkout step1 step2 />
                <Col md={5} className="m-auto">
                    <div className="d-flex flex-column mt-5  pt-4 pl-5 pr-5 pb-4 border">
                        <h2 className="mb-4 text-center">Выберите способ оплаты</h2>
                    {loadingPayment ? (<div>Loading...</div>) : errorPayment ? (<div>{errorPayment}</div>) : (
                            <Form onSubmit={submitHandler}>

                                 {payments.map((item) => (
                                            <Form.Check
                                                className = "mb-2"
                                                name      = "group1"
                                                key       = {item.id_payment}
                                                type      = "radio"
                                                id        = {item.name}
                                                label     = {item.name}
                                                value     = {item.id_payment}
                                                onChange  = {(e) => setPaymentMethod(e.target.value)}
                                            />
                                    ))}

                                <button type="submit" disabled={!paymentMethod} className="d-block ml-auto mt-3 btn btn-success">
                                    Далее
                                </button>
                            </Form>
                    )}
                    </div>
                </Col>
        </Container>
    );
};

export default Payment;
