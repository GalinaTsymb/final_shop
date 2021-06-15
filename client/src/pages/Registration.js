import React, {useEffect,useState } from 'react';
import Container from "react-bootstrap/Container";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../store/actions/user";
import { LOGIN_ROUTE } from "../utils/consts";


const Registration = props => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const {fetchingUser, userError} = useSelector(
        state => state.userRegistr
    );

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password, phone));
        props.history.push(LOGIN_ROUTE);
    };

    return (
        <Container className="mt-5">
            <Card className="ts_registr p-3">
                <h2 className="ts_login__title">Регистрация</h2>
            <Form onSubmit={submitHandler}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control name="name" type="name" placeholder="Введите имя" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control name="phone" type="tel" placeholder="Введите телефон" onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Введите email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                <div className="text-right">
                    <Button  variant="primary" type="submit" >
                        Зарегистрироваться
                    </Button>
                </div>
            </Form>
            </Card>
        </Container>
    );
};

export default Registration;
