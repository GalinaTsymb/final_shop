import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import Checkout from "./Checkout";
import Container from "react-bootstrap/Container";
import {DELIVERY_ROUTE, PAYMENT_ROUTE} from "../utils/consts";
import {Link} from "react-router-dom";
import {clearUserStatus, updateUser} from "../store/actions/userAction";
import Message from "./Message";
import Loading from "./Loading";


const Test = (props) => {

    const {userInfo} = useSelector(state => state.userLogin);

    const {userProfile,loadingProfile,
        statusCode, loadingUpdateDB, errorUpdateDB} = useSelector(state => state.userProfile);

    const dispatch = useDispatch();

    const [name, setName]           = useState(userProfile.name);
    const [surname, setSurname]     = useState(userProfile.surname);
    const [city, setCity]           = useState(userProfile.city);
    const [address, setAddress]     = useState(userProfile.address);
    const [phone, setPhone]         = useState(userProfile.phone);
    const [branchNP, setBranchNP]   = useState(userProfile.branchNP);


    //monitors changes in form fields
    let [isFormChange, setIsFormChange] = useState(false);

    const isEmpty = !name || !surname || !city || !address || !phone || !branchNP;
    console.log('isEmpty', isEmpty);
    const isProfile = props.location && props.location.pathname === '/profile';

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateUser(userInfo.user, name, surname, city, address,phone, branchNP));
        setIsFormChange(false);
        setTimeout(() => { dispatch(clearUserStatus())}, 2000)

    };
    const handlePayment = () => {
        props.history.push(PAYMENT_ROUTE);
    };

    return (
        <Container className="flex-grow-1 flex-shrink-1">
            { isProfile && <Checkout step1 />}
            <Form  onSubmit={submitHandler}>
                { loadingProfile ? <Loading/> : (
                    <>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control type="text" name="name_user" readOnly={isProfile} style={!name?{borderColor: 'red'}:{color: 'grey'}} required value={name || undefined} onChange={(event) => {
                                    setName(event.target.value);
                                    setIsFormChange(true);
                                }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control type="text" name="surname" readOnly={isProfile} style={!surname?{borderColor: 'red'}:{color: 'grey'}} required placeholder="Введите фамилию" value={surname || undefined} onChange={(event) => {
                                    setSurname(event.target.value);
                                    setIsFormChange(true);
                                }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Город</Form.Label>
                                <Form.Control type="text" name="city" readOnly={isProfile} style={!city?{borderColor: 'red'}:{color: 'grey'}} required placeholder="Введите город" value={city || undefined} onChange={(event) => {
                                    setCity(event.target.value);
                                    setIsFormChange(true);
                                }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAddress">
                                <Form.Label>Адресс</Form.Label>
                                <Form.Control type="text" placeholder="Введите адресс" readOnly={isProfile} name="address" style={!address?{borderColor: 'red'}:{color: 'grey'}} required value={address || undefined} onChange={(event) => {
                                    setAddress(event.target.value);
                                    setIsFormChange(true);
                                }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control type="text" name="phone_user" readOnly={isProfile} style={!phone?{borderColor: 'red'}:{color: 'grey'}} required placeholder="Введите телефон" value={phone || undefined} onChange={(event) => {
                                    setPhone(event.target.value);
                                    setIsFormChange(true);
                                }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridBranchNP">
                                <Form.Label>Отделение Новой почты</Form.Label>
                                <Form.Control type="text" name="branchNP" readOnly={isProfile} style={!branchNP?{borderColor: 'red'}:{color: 'grey'}} required value={branchNP || undefined} onChange={(event) => {
                                    setBranchNP(event.target.value);
                                    setIsFormChange(true);
                                }}
                                />
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
                                    <Button  variant="primary" disabled={!isFormChange} type="submit" >
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

export default Test;
