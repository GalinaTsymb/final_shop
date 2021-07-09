import {
    ADD_ORDER,
    CLEAR_CART,
    ORDER_LIST_STARTED,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    ORDER_DETAILS_STARTED,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,

} from "./types";
import ApiService from "../../services/apiServices";

export const saveOrder = (orderInfo) => async (dispatch) =>{

        try {
            const order = await ApiService.saveOrder(orderInfo)
                .then((res) => res.json());
            console.log('order', order);
            dispatch({type: ADD_ORDER, payload: order});

            dispatch({type: CLEAR_CART})
        } catch (error){
            console.log(error);
        }

};

export const saveOrderDetails = (detailsOrder) => async (dispatch) => {

    try{
         await ApiService.saveOrderDetails(detailsOrder)
            .then((res) => res.status);

    }catch(error){
        return error;
    }
};

export const ordersList = (id_user) => async (dispatch) =>{
    const id = {id_user};

    try{
        dispatch({type:ORDER_LIST_STARTED, payload: id });

        const orders = await ApiService.getUserOrders(id)
            .then((res) => res.json());
        dispatch({type: ORDER_LIST_SUCCESS, payload: orders})

    }catch(error){
        dispatch({type: ORDER_LIST_FAILURE, payload: error})
    }
};
export const getDetailsOrder = (id_order) => async (dispatch) => {
    const id = {id_order};

    try{
        dispatch({type: ORDER_DETAILS_STARTED, payload: id });

        const orderDetails = await ApiService.getOrderDetails(id)
            .then((res) => res.json());

        dispatch({type: ORDER_DETAILS_SUCCESS, payload: orderDetails})

    }catch(error){
        dispatch({type: ORDER_DETAILS_FAILURE, payload: error})
    }
};

