import React, { useEffect} from 'react';
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {getUserProfile} from "../store/actions/user";

/*const INITIAL_STATE = {
    name_user: "",
    surname: "",
    city: "",
    address: "",
    phone_user: "",
    branchNP: "",
    email_user: "",
    password: ""
};*/

 const UserProfile = (props) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(
        state => state.userLogin
    );

    let decodeToken;
    if(userInfo) { decodeToken = jwt_decode(userInfo.token);}

    const {user, fetchingProfileUser, userProfileError} = useSelector(
        state => state.userProfile
    );

    useEffect(()=>{

        dispatch(getUserProfile(decodeToken.email));

    }, [dispatch]);

     const handleChange = (event) => {
         /*user[0].name_user = event.target.value;*/
     };
/*    const handleInput = (e) => {
        console.log(e.target.name, " : ", e.target.value);
        setUserNew({ ...userNew, [e.target.name]: e.target.value });
    };*/
    const submit = e => {
        console.log('form')
    };
    return (

        <Form  onSubmit={submit}>
            {!fetchingProfileUser  && !userProfileError && user && (
                <>
            <Form.Row>
               <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" name="name_user" value={user[0].name_user} onChange={handleChange}
                                   />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridSurname">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control type="text" name="surname" placeholder="Введите телефон" value={user[0].surname}
                                    />
                </Form.Group>
            </Form.Row>
           <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Город</Form.Label>
                <Form.Control type="text" name="city" placeholder="Введите город" value={user[0].city}
                               />
            </Form.Group>
                <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label>Адресс</Form.Label>
                    <Form.Control type="text" placeholder="Введите адресс" name="address" value={user[0].address}
                                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control type="text" name="phone_user" placeholder="Введите телефон" value={user[0].phone_user}
                                   />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridBranchNP">
                    <Form.Label>Отделение Новой почты</Form.Label>
                    <Form.Control type="text" name="branchNP" value={user[0].branchNP}
                                   />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email_user" placeholder="Введите телефон" value={user[0].email_user}
                                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={user[0].password}
                                    />
                </Form.Group>
            </Form.Row>
            <div className="text-right">
                <Button  variant="primary" type="submit" >
                    Обновить данные
                </Button>
            </div>
            </>
                )}
        </Form>
    );
};

export default UserProfile;
