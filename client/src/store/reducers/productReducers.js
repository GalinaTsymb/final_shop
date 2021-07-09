import {
    PRODUCT_LIST_STARTED,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_STARTED,
    PRODUCT_DETAILS_FAILURE
} from '../actions/types';

function productListReducer (state = { results:[]}, action){
    switch(action.type){
        case PRODUCT_LIST_STARTED:
            return {loading: true, loadingError: false };
        case PRODUCT_LIST_SUCCESS:
            const info = action.payload;
            return {...state, loading: false, loadingError: false, next: info.next, previous: info.previous, results: info.results};
        case PRODUCT_LIST_FAILURE:
            return {loading: false, loadingError: true, error: action.payload};
        default:
            return state;
    }
}

function productDetailsReducer (state = {}, action){
    switch(action.type){
        case PRODUCT_DETAILS_STARTED:
            return {loadingDetProd: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loadingDetProd: false, product: action.payload};
        case PRODUCT_DETAILS_FAILURE:
            return {loadingDetProd: false, errorDetProd: true, error: action.payload};
        default:
            return state;
    }
}
export {productListReducer, productDetailsReducer}
