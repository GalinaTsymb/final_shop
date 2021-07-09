import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {clearErrorLogin, loginUser} from "../store/actions/userAction";
import Message from "../components/Message";
import useInput from "../hooks/useInput";


const Login = (props) => {

    const dispatch  = useDispatch();

    const email     = useInput('', {emailError: false});
    const password  = useInput('', {minLength: 5});

    const {userInfo, userError, error} = useSelector(state => state.userLogin );

    const [validated, setValidated]    = useState(false);

    useEffect(() => {
        // clear the form fields if such a user already exists
        if(userError === true  && error){
            email.clearValue();
            password.clearValue();
        }

        // if there are no errors and the user is logged in
        if(userInfo){
            props.history.push("/");
        }
    }, [userInfo, userError, error, props.history]);

    const submitHandler = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if(form.checkValidity() === true){
            event.preventDefault();
            dispatch(loginUser(email.value, password.value));
            setTimeout(() => { dispatch(clearErrorLogin())}, 2000)
        }
    };

    return (
        <Container
            className="d-flex justify-content-center flex-column align-items-center login-container flex-grow-1 flex-shrink-1">

            <Card className="p-5">
                <h2>Авторизация</h2>
                <Form noValidate validated={validated} onSubmit={submitHandler}>
                    <Form.Group controlId="emailError">
                        <Form.Label>Email</Form.Label>
                        { (email.isDirty && email.emailError) && <div className="ts_error-message">{email.message}</div>}
                        <Form.Control type="email" required  value={email.value} onChange={(e) => email.onChange(e)} onBlur={ (e) => email.onBlur(e)} placeholder="Введите Ваш login..." />
                    </Form.Group>
                    <Form.Group controlId="minLengthError">
                        <Form.Label>Пароль</Form.Label>
                        { (password.isDirty && password.minLengthError) && <div className="ts_error-message">{password.message}</div>}
                        <Form.Control type="password" required  value={password.value} onChange={(e) => password.onChange(e)} onBlur={ (e) => password.onBlur(e)} placeholder="Введите Ваш пароль..." />
                    </Form.Group>
                    <Button disabled={!email.inputValid || !password.inputValid} variant="primary" type="submit">
                        Войти
                    </Button>
                </Form>
            </Card>
            {
                userError === true && error ? <Message key={1} message={`${error.statusText}`}/> :''
            }
        </Container>
    );
};

export default Login;
