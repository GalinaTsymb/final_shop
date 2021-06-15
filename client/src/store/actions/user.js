import {
    USER_REGISTER_STARTED,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_STARTED,
    USER_LOGIN_FAILURE,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_STARTED,
    USER_PROFILE_FAILURE,
   USER_LOGOUT
} from "./types";

import ApiService from "../../services/apiServices";
import Cookie from 'js-cookie';
import jwt_decode from "jwt-decode";


/************** USER REGISTRATION **************/
const sendUserRegistrationSuccess = () => ({
    type: USER_REGISTER_SUCCESS

});
const sendUserRegistrationStarted = () => ({
    type: USER_REGISTER_STARTED
});

const sendUserRegistrationFailure = () => ({
    type: USER_REGISTER_FAILURE,
});

/********** USER LOGIN ************************/
const sendUserLoginSuccess = (userInfo) => ({
    type: USER_LOGIN_SUCCESS,
    payload: userInfo

});
const sendUserLoginStarted = () => ({
    type: USER_LOGIN_STARTED
});

const sendUserLoginFailure = () => ({
    type: USER_LOGIN_FAILURE,
});

/************* USER PROFILE **************/
const getUserProfileSuccess = (user) => ({
    type: USER_PROFILE_SUCCESS,
    payload: user

});
const getUserProfileStarted = () => ({
    type: USER_PROFILE_STARTED
});

const getUserProfileFailure = () => ({
    type: USER_PROFILE_FAILURE,
});



export const registerUser = (name, email, password, phone) => async (dispatch) => {
    const userInfo = {name, email, password, phone};
    dispatch(sendUserRegistrationStarted());
    try {
        const data = await ApiService.sendUserRegistr(userInfo)
            .then((res) => res.json());
        dispatch(sendUserRegistrationSuccess());

    } catch (error) {
        dispatch(sendUserRegistrationFailure());
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    const userInfo = {email, password};
    dispatch(sendUserLoginStarted());
    try {
        const data = await ApiService.sendUserLogin(userInfo)
            .then((res) => res.json());

        dispatch(sendUserLoginSuccess(data));
        if(Cookie.get('token') === undefined || Cookie.get('token') === null){
            Cookie.set('token', JSON.stringify(data));
        }
    } catch (error) {
        dispatch(sendUserLoginFailure());
    }
};

export const logout = () => (dispatch) => {
    Cookie.remove("token");
    dispatch({ type: USER_LOGOUT })
};

export const checkAuthentication = () => async (dispatch) => {

    const token = Cookie.get('token');
    let email, password;

    if(token){
        const decodeToken = jwt_decode(token);
        email = decodeToken.email;
        password = decodeToken.password;
        dispatch(loginUser(email, password));
    }
};

export const getUserProfile = (email) => async (dispatch) => {

    const userEmail = {email};
    dispatch(getUserProfileStarted());
    try{
        const user = await ApiService.getUser(userEmail)
            .then((res) => res.json());

        dispatch(getUserProfileSuccess(user));
    }catch(error){
        dispatch(getUserProfileFailure());
    }
};
