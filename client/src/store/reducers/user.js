import {
    USER_REGISTER_STARTED,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_STARTED,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_STARTED,
    USER_PROFILE_FAILURE,
    USER_CART_STARTED,
    USER_CART_SUCCESS,
    USER_CART_FAILURE
} from "../actions/types";

function reducerUserRegister(state = {fetchingUser: false, userError: false}, action) {
    switch (action.type) {
        case USER_REGISTER_STARTED:
            return { ...state, fetchingUser: true, userError: false };
        case USER_REGISTER_SUCCESS:
            return { ...state, fetchingUser: true, userError: false};
        case USER_REGISTER_FAILURE:
            return { ...state, fetchingUser: false, userError: true};
        default: return state;
    }
}

function reducerUserLogin(state={userInfo: null, fetchingUserLogin: false,userLoginError: false,isAuthentication: false}, action){

    switch (action.type) {
        case USER_LOGIN_STARTED:
            return { ...state, fetchingUserLogin: true, userLoginError: false };
        case USER_LOGIN_SUCCESS:
            return { ...state, isAuthentication:true, fetchingUserLogin: true, userInfo: action.payload};
        case USER_LOGIN_FAILURE:
            return { ...state,isAuthentication:false, fetchingUserLogin: false, userLoginError: true};
            case USER_LOGOUT:
                return {isAuthentication:false};
        default: return state;
    }
}

function reducerGetUser(state={user: null, fetchingProfileUser: false, userProfileError: false}, action){
    switch (action.type) {
        case USER_PROFILE_STARTED:
            return { ...state, fetchingProfileUser: true, userProfileError: false };
        case USER_PROFILE_SUCCESS:
            return { ...state, fetchingProfileUser:false, userProfileError: false, user: action.payload};
        case USER_PROFILE_FAILURE:
            return { ...state, fetchingProfileUser: false, userProfileError: true};

        default: return state;
    }
}

export {
    reducerUserRegister,
    reducerUserLogin,
    reducerGetUser
}
