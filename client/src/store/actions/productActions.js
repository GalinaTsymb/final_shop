import {
    PRODUCT_LIST_STARTED,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_STARTED,
    PRODUCT_DETAILS_FAILURE
} from './types';

import ApiService from "../../services/apiServices";



export const loadProducts = (page, id = 0) => async (dispatch) => {
        dispatch({type: PRODUCT_LIST_STARTED});
    try{

        const products = await ApiService.getProducts(page, id)
            .then((res) => res.json());
        dispatch({type:PRODUCT_LIST_SUCCESS, payload: products });

    }catch(error){
        dispatch({type: PRODUCT_LIST_FAILURE, payload: error});
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    try{
        dispatch({ type:PRODUCT_DETAILS_STARTED, payload: productId });

        const product = await ApiService.getDetailsProduct(productId)
            .then((res) => res.json());
        dispatch({ type:PRODUCT_DETAILS_SUCCESS, payload: product[0] });

    }catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAILURE, payload: error});
    }
};
