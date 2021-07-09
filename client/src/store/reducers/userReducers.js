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
    UPDATE_USER_PROFILE,
    USER_UPDATE_DB_STARTED,
    USER_UPDATE_DB_SUCCESS,
    USER_UPDATE_DB_FAILURE,
    CLEAR_STATUS_CODE,
    CLEAR_ERROR_LOGIN,
    CLEAR_ERROR_REGISTER
} from "../actions/types";
import Cookie from "js-cookie";

function reducerUserRegister(state = { info: {}, error: {}, fetchingUser: false, userError: false }, action) {
    switch (action.type) {
        case USER_REGISTER_STARTED:
            return { ...state, fetchingUser: true, userError: false };
        case USER_REGISTER_SUCCESS:
            return { ...state, fetchingUser: false, userError: false, info: action.payload};
        case USER_REGISTER_FAILURE:
            return { ...state, fetchingUser: false, userError: true, error: action.payload};
        case CLEAR_ERROR_REGISTER:
            return {...state, fetchingUser:false, userError: false, error: {}};
        default: return state;
    }
}

function reducerUserLogin(state= { loading: false, userError: false, error: {}}, action){

    switch (action.type) {
        case USER_LOGIN_STARTED:
            return { ...state, loading: true, userError: false };
        case USER_LOGIN_SUCCESS:
            const {token} = action.payload;
            if(Cookie.get('token') === undefined || Cookie.get('token') === null){
                Cookie.set('token', JSON.stringify(token));
            }
            return {...state, loading: false, userError: false, userInfo: action.payload};
        case USER_LOGIN_FAILURE:
            return { ...state, loading:false, userError: true, error:action.payload};
        case CLEAR_ERROR_LOGIN:
            return {...state, loading:false, userError: false, error: {}};
        case USER_LOGOUT:
            return {};
        default: return state;
    }
}

function reducerUserProfile(state = {userProfile: {}, statusCode: {} }, action){
    switch (action.type) {
        case USER_PROFILE_STARTED:
            return { loadingProfile: true };
        case USER_PROFILE_SUCCESS:
            return { loadingProfile: false, userProfile: action.payload, errorProfile: false};
        case USER_PROFILE_FAILURE:
            return { loadingProfile:false, errorProfile:action.payload};
        case UPDATE_USER_PROFILE:
            return {...state, userProfile: action.payload};
        case USER_UPDATE_DB_STARTED:
            return {...state, loadingUpdateDB: true};
        case USER_UPDATE_DB_SUCCESS:
            return {...state, statusCode: action.payload, loadingUpdateDB: false, errorUpdateDB: false};
        case USER_UPDATE_DB_FAILURE:
            return {...state, loadingUpdateDB: false, errorUpdateDB: true};
        case CLEAR_STATUS_CODE:
            return {...state, statusCode: {}};
        default: return state;
    }
}

export {
    reducerUserRegister,
    reducerUserLogin,
    reducerUserProfile
}
