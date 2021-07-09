import {
    INIT_CART_STARTED,
    INIT_CART_SUCCESS,
    INIT_CART_FAILURE,
    CART_LIST_STARTED,
    CART_LIST_SUCCESS,
    CART_LIST_FAILURE,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from './types';
import ApiService from "../../services/apiServices";

export const initCart = (userInfo) => async (dispatch) =>{

    if(userInfo){
        const login = {login: userInfo.user};

        try {
            dispatch({type: INIT_CART_STARTED});

            const [id_cart] = await ApiService.getUserCart(login)
                .then((res) => res.json());

            dispatch({type: INIT_CART_SUCCESS, payload: id_cart});

        } catch (error){
            dispatch({type: INIT_CART_FAILURE, payload: error});
        }
    }
};

export const initCartList = (userInfo) => async (dispatch) =>{

    if(userInfo){
        const login = { login: userInfo.user} ;
        try {
            dispatch({type:CART_LIST_STARTED });

              const userCartList = await ApiService.getUserCartList(login)
                    .then((res) => res.json());

            dispatch({type:CART_LIST_SUCCESS, payload: userCartList });

        } catch (error){
            dispatch({type:CART_LIST_FAILURE, payload: error });
        }
    }
};

export const addToCart = (id_cart, productId) => async (dispatch) =>{

    try{
        const product = await ApiService.getDetailsProduct(productId)
            .then((res) => res.json());

        dispatch({type: CART_ADD_ITEM, payload: {
                id_prod: product[0].id_prod,
                name_prod: product[0].name_prod,
                image: product[0].image,
                price_prod: product[0].price_prod,
                available: product[0].available,
                qty: 1
            }});
        const saveDB = await ApiService.saveAddToCart({id_cart, productId});

    }catch(error){
        console.log(error)
    }
};

export const removeFromCart = (id_cart, productId) => async (dispatch) => {

    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    await ApiService.saveDeleteFromCart({id_cart, productId});
};


