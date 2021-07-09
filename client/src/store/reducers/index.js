import { combineReducers } from 'redux';

import { productListReducer, productDetailsReducer} from "./productReducers";
import { categoryReducer } from "./categoryReducers";
import { reducerUserLogin, reducerUserRegister, reducerUserProfile} from "./userReducers";
import { cartReducer } from "./cartReducers";
import {paymentListReducer} from "./paymentReducers";
import {deliveryListReducer} from "./deliveryReducers";
import {orderReducer} from "./orderReducers";


export const reducer = combineReducers({

    productList:    productListReducer,
    category:       categoryReducer,
    productDetails: productDetailsReducer,
    payment:        paymentListReducer,
    delivery:       deliveryListReducer,
    cart:           cartReducer,
    userRegistr:    reducerUserRegister,
    userLogin:      reducerUserLogin,
    userProfile:    reducerUserProfile,
    order:          orderReducer
});
