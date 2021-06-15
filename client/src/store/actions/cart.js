import {
    USER_CART_STARTED,
    USER_CART_SUCCESS,
    USER_CART_FAILURE, CART_ADD_ITEM
} from "../actions/types";

import ApiService from "../../services/apiServices";


/************* GET USER CART ***********************/
const getUserCartSuccess = (userCart) => ({
    type: USER_CART_SUCCESS,
    payload: userCart

});
const getUserCartStarted = () => ({
    type: USER_CART_STARTED
});

const getUserCartFailure = () => ({
    type: USER_CART_FAILURE,
});

/************** ADD TO CART **********************/
const addProductToCart = (id, name, price) => ({
    type: CART_ADD_ITEM,
    payload: {
        id_prod: id,
        name_prod: name,
        qty: 1,
        price_prod: price,

    }
});

export const getUserCart = (email) => async (dispatch) => {

    const userEmail = {email};
    dispatch(getUserCartStarted());
    try{
        const userCart = await ApiService.getUserCart(userEmail)
            .then((res) => res.json());
        console.log('action user cart', userCart);
        dispatch(getUserCartSuccess(userCart));
    }catch(error){
        dispatch(getUserCartFailure());
    }
};

export const addToCart = (productId) => async (dispatch) => {

    try {
        const  data  = await ApiService.getDetailsProduct(productId)
                .then((res) => res.json());

        dispatch(addProductToCart(data[0].id_prod, data[0].name_prod, data[0].price_prod));

    } catch (error) {

    }
};
