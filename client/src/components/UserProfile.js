import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import Checkout from "./Checkout";
import Container from "react-bootstrap/Container";
import {PAYMENT_ROUTE} from "../utils/consts";
import {Link} from "react-router-dom";
import {clearUserStatus, updateUser} from "../store/actions/userAction";
import Message from "./Message";
import Loading from "./Loading";
import useInput from "../hooks/useInput";


const UserProfile = (props) => {

    const {userInfo} = useSelector(state => state.userLogin);

    const {userProfile,loadingProfile,statusCode, loadingUpdateDB, errorUpdateDB} = useSelector(state => state.userProfile);

    const dispatch = useDispatch();

    const name      = useInput(userProfile.name, {onlyLetters: false});
    const surname   = useInput(userProfile.surname,{onlyLetters: false});
    const city      = useInput(userProfile.city,{onlyLetters: false});
    const address   = useInput(userProfile.address, {});
    const phone     = useInput(userProfile.phone, {telValid: false});
    const branchNP  = useInput(userProfile.branchNP, {numValid: false});

    const [validated, setValidated] = useState(false);

    //monitors changes in form fields
    let [isFormChange, setIsFormChange] = useState(false);

    const isEmpty = !name.value || !surname.value || !city.value|| !address.value || !phone.value || !branchNP.value;

    const isProfile = props.location && props.location.pathname === '/profile';

    const submitHandler = event => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if(form.checkValidity() === true){
            event.preventDefault();
            dispatch(updateUser(userProfile.id_user, name.value, surname.value, city.value, address.value, phone.value, branchNP.value))
            setIsFormChange(false);
            setTimeout(() => { dispatch(clearUserStatus())}, 2000)
        }
    };
    const handlePayment = () => {
        props.history.push(PAYMENT_ROUTE);
    };

    return (
        <Container className="flex-grow-1 flex-shrink-1">
            { isProfile && <Checkout step1 />}
            <Form noValidate validated={validated}  onSubmit={submitHandler}>
                { loadingProfile ? <Loading/> : (
                    <>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Имя</Form.Label>
                                { (name.isDirty && name.textError) && <div className="ts_error-message">{name.message}</div>}
                                <Form.Control type="text" name="name_user" readOnly={isProfile} style={!name.value?{borderColor: 'red'}:{color: 'grey'}} required value={name.value || undefined}
                                              onChange={ (e) => { name.onChange(e); setIsFormChange(true);}} onBlur={ (e) => name.onBlur(e)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Фамилия</Form.Label>
                                { (surname.isDirty && surname.textError) && <div className="ts_error-message">{surname.message}</div>}
                                <Form.Control type="text" name="surname" readOnly={isProfile} style={!surname.value?{borderColor: 'red'}:{color: 'grey'}} required placeholder="Введите фамилию" value={surname.value || undefined}
                                              onChange={ (e) => { surname.onChange(e); setIsFormChange(true);}} onBlur={ (e) => surname.onBlur(e)}/>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Город</Form.Label>
                                {(city.isDirty && city.textError) && <div className="ts_error-message">{city.message}</div>}
                                <Form.Control type="text" name="city" readOnly={isProfile} style={!city.value?{borderColor: 'red'}:{color: 'grey'}} required placeholder="Введите город" value={city.value || undefined}
                                              onChange={ (e) => { city.onChange(e); setIsFormChange(true);}} onBlur={ (e) => city.onBlur(e)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAddress">
                                <Form.Label>Адресс</Form.Label>
                                <Form.Control type="text" placeholder="Введите адресс" readOnly={isProfile} name="address" style={!address.value?{borderColor: 'red'}:{color: 'grey'}} required value={address.value || undefined}
                                              onChange={ (e) => { address.onChange(e); setIsFormChange(true);}} onBlur={ (e) => address.onBlur(e)}/>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Телефон</Form.Label>
                                {(phone.isDirty && phone.telError) && <div className="ts_error-message">{phone.message}</div>}
                                <Form.Control type="text" name="phone_user" readOnly={isProfile} style={!phone.value?{borderColor: 'red'}:{color: 'grey'}} required placeholder="Введите телефон" value={phone.value || undefined}
                                              onChange={ (e) => { phone.onChange(e); setIsFormChange(true);}} onBlur={ (e) => phone.onBlur(e)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridBranchNP">
                                <Form.Label>Отделение Новой почты</Form.Label>
                                {(branchNP.isDirty && branchNP.numError) && <div className="ts_error-message">{branchNP.message}</div>}
                                <Form.Control type="text" name="branchNP" readOnly={isProfile} style={!branchNP.value?{borderColor: 'red'}:{color: 'grey'}} required value={branchNP.value || undefined}
                                              onChange={ (e) => { branchNP.onChange(e); setIsFormChange(true);}} onBlur={ (e) => branchNP.onBlur(e)}/>
                            </Form.Group>
                        </Form.Row>


                        { isProfile ?
                            <>
                                <div>
                                    {
                                        isEmpty ? <span className="d-block text-danger">У Вас есть незаполненые данные!!!</span> :
                                            <span className="d-block text-danger">Внимательно, проверьте Ваши данные!!!</span>
                                    }
                                    <span>Внести изменения можно  - <Link to="/user">тут</Link></span></div>
                                <div className="text-right">
                                    <Button type="button" onClick={handlePayment} className="ml-3 btn btn-success" disabled={isEmpty} >Далее</Button>
                                </div>
                            </>
                            :
                            <>
                                <div className="font-italic">Изменения данных: введите новое значение в поле, затем нажмите кнопку Обновить данные </div>
                                <div className="text-right">
                                    <Button  variant="primary" disabled={!isFormChange || !name.inputValid || !phone.inputValid || !surname.inputValid || !phone.inputValid || !branchNP.inputValid} type="submit" >
                                        Обновить данные
                                    </Button>
                                </div>
                            </>
                        }

                        {
                            !loadingUpdateDB && !errorUpdateDB  && statusCode === 200 ?

                                <Message key={1} message={'Ваши данные успешно обновлены'} /> : errorUpdateDB ?
                                <Message key={1} message={'Упсс... Что-то пошло не так!!! Попробуйте еще раз'}  /> : ''
                        }
                    </>
                )}
            </Form>
        </Container>
    );
};

export default UserProfile;
