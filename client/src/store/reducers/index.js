import { combineReducers } from 'redux';

import categoriesReducer from './categories';
import {reducerProductList, productDetailsReducer} from './products';
import {reducerUserRegister, reducerUserLogin, reducerGetUser} from './user';
import {reducerGetUserCart} from'./cart'

export const reducer = combineReducers({
    categories: categoriesReducer,
    productList: reducerProductList,
    productDetails: productDetailsReducer,
    userRegistr: reducerUserRegister,
    userLogin: reducerUserLogin,
    userProfile: reducerGetUser,
    userCart: reducerGetUserCart
});
