import {
    FETCH_Product_STARTED,
    FETCH_Product_FAILURE,
    FETCH_Product_SUCCESS,
    FETCH_DetailsProduct_SUCCESS,
    FETCH_DetailsProduct_STARTED,
    FETCH_DetailsProduct_FAILURE,
} from "./types";

import ApiService from "../../services/apiServices";

/*********** ProductList ***************/
const loadProductsSuccess = (products) => ({
    type: FETCH_Product_SUCCESS,
    payload: [
        ...products
    ]
});
const loadProductsStarted = () => ({
    type: FETCH_Product_STARTED,
});

const loadProductsFailure = () => ({
    type: FETCH_Product_FAILURE,
});

/************* Product *************/
const loadDetailsProductSuccess = (product) => ({
    type: FETCH_DetailsProduct_SUCCESS,
    payload:[ ...product]

});
const loadDetailsProductStarted = () => ({
    type: FETCH_DetailsProduct_STARTED
});

const loadDetailsProductFailure = () => ({
    type: FETCH_DetailsProduct_FAILURE,
});

export const loadProducts = (id = 0) => async (dispatch) => {

    dispatch(loadProductsStarted());
    try {
        let products;
        if(id === 0){
            products = await ApiService.getProducts()
                .then((res) => res.json());
        }else{
            products = await ApiService.getProductsByCategory(id)
                .then((res) => res.json());
        }
        console.log('products')
        dispatch(loadProductsSuccess(products));

    } catch {
        dispatch(loadProductsFailure());
    }
};
export const detailsProduct = (id) => async (dispatch) => {
    dispatch(loadDetailsProductStarted());
    try{
        const product = await ApiService.getDetailsProduct(id)
            .then((res) => res.json());
        dispatch(loadDetailsProductSuccess(product));

    }catch{
        dispatch(loadDetailsProductFailure());
    }
};

