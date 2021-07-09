import {
    USER_REGISTER_STARTED,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_STARTED,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_PROFILE_STARTED,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
    USER_UPDATE_DB_STARTED,
    USER_UPDATE_DB_SUCCESS,
    USER_UPDATE_DB_FAILURE,
    UPDATE_USER_PROFILE,
    CLEAR_STATUS_CODE,
    CLEAR_ERROR_LOGIN,
    CLEAR_ERROR_REGISTER
} from "./types";

import ApiService from "../../services/apiServices";
import Cookie from 'js-cookie';
import jwt_decode from "jwt-decode";





/************* Profile USER  **************/
const getUserProfileStarted = (user) => ({
    type: USER_PROFILE_STARTED,
    payload: user
});
const getUserProfileSuccess = (data) => ({

    type: USER_PROFILE_SUCCESS,
    payload: data

});
const getUserProfileFailure = (error) => ({
    type: USER_PROFILE_FAILURE,
    payload: error.message
});


export const registerUser = (name, email, password, phone) => async (dispatch) => {
    const userInfo = {name, email, password, phone};

    try {
        dispatch({type: USER_REGISTER_STARTED});
        await ApiService.sendUserRegistr(userInfo)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(err => Promise.reject(err));
                }
            })
            .then(info => {
                dispatch({type: USER_REGISTER_SUCCESS, payload: info});
            })

    } catch (error) {
        dispatch({type: USER_REGISTER_FAILURE, payload: error});
    }
};

export const loginUser = (email, password) => async (dispatch) => {

    const userInfo = {email, password};
    try {
        dispatch({type: USER_LOGIN_STARTED});

        await ApiService.sendUserLogin(userInfo)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(err => Promise.reject(err));
                }
            })
            .then(info => {
                dispatch({type: USER_LOGIN_SUCCESS, payload: info});
            });

    } catch (error) {
        dispatch({type: USER_LOGIN_FAILURE, payload: error});
    }

};

export const logout = () => (dispatch) => {
    Cookie.remove("token");
    dispatch({ type: USER_LOGOUT })
};

export const checkAuthentication = (token) => async (dispatch) => {
    let email, password;
    if(token){
        const decodeToken = jwt_decode(token);
        email = decodeToken.email;
        password = decodeToken.password;
        dispatch(loginUser(email, password));
    }
};

export const getUserProfile = (userInfo) => async (dispatch) =>{

    if(userInfo){

        const login = { login: userInfo.user} ;

        try{
            dispatch(getUserProfileStarted(login));
            const data = await ApiService.getUserProfile(login)
                .then((res) => res.json());

            dispatch(getUserProfileSuccess(data));
        }catch(error){
            dispatch(getUserProfileFailure(error));
        }
    }
};

export const updateUser = ( id_user, name, surname, city, address,phone, branchNP) => async (dispatch) => {

    const userNewInfo = {id_user, name, surname, city, address, phone, branchNP};

    dispatch({type: UPDATE_USER_PROFILE, payload:userNewInfo});

    try{
        dispatch({type:USER_UPDATE_DB_STARTED, payload:userNewInfo});

        const data = await ApiService.updateUser(userNewInfo)
            .then((res) => res.status);

        dispatch({type:USER_UPDATE_DB_SUCCESS, payload:data})

    }catch(error){
        dispatch({type:USER_UPDATE_DB_FAILURE, payload:error})
    }

};
export const clearUserStatus = () => async(dispatch) => {
    dispatch ({type: CLEAR_STATUS_CODE})
};

export const clearErrorLogin = () => async(dispatch) => {
    dispatch({type: CLEAR_ERROR_LOGIN})
};
export const clearErrorRegister = () => async(dispatch) => {
    dispatch({type: CLEAR_ERROR_REGISTER})
};
