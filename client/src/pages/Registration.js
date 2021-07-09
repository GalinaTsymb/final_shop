import React, {useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useDispatch, useSelector} from "react-redux";
import {clearErrorRegister, registerUser} from "../store/actions/userAction";
import Message from "../components/Message";
import useInput from "../hooks/useInput";



const Registration = props => {

    const dispatch                = useDispatch();

    const {userError, error, info} = useSelector(state => state.userRegistr);

    const name      = useInput('', {onlyLetters: false});
    const email     = useInput('', {emailError: false});
    const password  = useInput('', {minLength: 5});
    const phone     = useInput('', {telValid: false});

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        //clear the form fields if such a user already exists
        if(userError === true  && error){
            name.clearValue();
            phone.clearValue();
            email.clearValue();
            password.clearValue();
        }

        //if there are no errors and the user is registered
        if(userError === false && info.statusText){
           setTimeout(() => {
               props.history.push("/login")
           }, 500);
        }
    }, [userError, info, error, props.history]);

    const submitHandler = async (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if(form.checkValidity() === true){
            event.preventDefault();
            dispatch(await registerUser(name.value, email.value, password.value, phone.value));
            setTimeout(() => { dispatch(clearErrorRegister())}, 2000)
        }
    };

    return (
        <Container className="mt-5 flex-grow-1 flex-shrink-1">
            <Card className="p-3">
                <h2 className="text-center">Регистрация</h2>
            <Form noValidate validated={validated} className="mt-3">
                <Form.Row>
                    <Form.Group as={Col} controlId="onlyLetters">
                        <Form.Label>Имя</Form.Label>
                        { (name.isDirty && name.textError) && <div className="ts_error-message">{name.message}</div>}
                        <Form.Control name="name" type="text" required placeholder="Введите имя" value={name.value} onChange={ (e) => name.onChange(e)} onBlur={ (e) => name.onBlur(e)} />
                    </Form.Group>
                   <Form.Group as={Col} controlId="telError">
                        <Form.Label>Телефон</Form.Label>
                       { (phone.isDirty && phone.telError) && <div className="ts_error-message">{phone.message}</div>}
                        <Form.Control name="phone" type="tel" required  value={phone.value} placeholder="Введите телефон" onChange={ (e) => phone.onChange(e)} onBlur={ (e) => phone.onBlur(e)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                      { (email.isDirty && email.emailError) && <div className="ts_error-message">{email.message}</div>}
                        <Form.Control name="email" type="email" required  value={email.value} placeholder="Введите email" onChange={(e) => email.onChange(e)} onBlur={ (e) => email.onBlur(e)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Пароль</Form.Label>
                        { (password.isDirty && password.minLengthError) && <div className="ts_error-message">{password.message}</div>}
                        <Form.Control name="password" type="password" required  value={password.value} placeholder="Password" onChange={(e) => password.onChange(e)} onBlur={ (e) => password.onBlur(e)}/>
                    </Form.Group>
                </Form.Row>
                <div className="text-right">
                    <Button disabled={!name.inputValid || !phone.inputValid || !email.inputValid || !password.inputValid}  variant="primary" onClick={submitHandler} type="submit" >
                        Зарегистрироваться
                    </Button>
                </div>
            </Form>
            </Card>
            {
                userError === true && error ? <Message key={1} message={`${error.statusText}`}/> :
                    userError === false && info.statusText ? <Message key={1} message={`${info.statusText}`}/> : ''
            }
        </Container>
    );
};

export default Registration;
