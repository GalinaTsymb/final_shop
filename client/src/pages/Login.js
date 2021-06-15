import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/actions/user";
import {SHOP_ROUTE} from "../utils/consts";

const Login = (props) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {userInfo, fetchingUserLogin, userLoginError, isAuthentication} = useSelector(
        state => state.userLogin
    );
    console.log('login state', userInfo);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
        props.history.push(SHOP_ROUTE);
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center login-container mt-5">

            <Card className="ts_login p-5">
                <h2 className="ts_login__title">Авторизация</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Введите Ваш login..." />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Введите Ваш пароль..." />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
                </Form>
            </Card>

        </Container>
    );
};

export default Login;
