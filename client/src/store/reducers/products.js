import {
    FETCH_Product_STARTED,
    FETCH_Product_FAILURE,
    FETCH_Product_SUCCESS,
    FETCH_DetailsProduct_STARTED,
    FETCH_DetailsProduct_FAILURE,
    FETCH_DetailsProduct_SUCCESS
} from "../actions/types";

 function reducerProductList(state = { products: null, fetchingProducts: false, productsError: false}, action) {
    switch (action.type) {
        case FETCH_Product_STARTED: {
            return { ...state, fetchingProducts: true, productsError: false};
        }
        case FETCH_Product_FAILURE: {
            return { ...state, fetchingProducts: false, productsError: true};
        }
        case FETCH_Product_SUCCESS: {
            return { ...state, fetchingProducts: false, products: action.payload};
        }
        default:
            return state;
    }
}

function  productDetailsReducer(state = {product: null, fetchingProductDetails: false, productDetailsError: false}, action) {
    switch (action.type) {
        case FETCH_DetailsProduct_STARTED: {
            return { ...state, fetchingProductDetails: true, productDetailsError: false};
        }
        case FETCH_DetailsProduct_FAILURE: {
            return { ...state, fetchingProductDetails: false, productDetailsError: true};
        }
        case FETCH_DetailsProduct_SUCCESS: {
            return { ...state, fetchingProductDetails: false, product: action.payload};
        }
        default:
            return state;
    }
}
export {
    reducerProductList,
    productDetailsReducer
}
