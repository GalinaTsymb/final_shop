import {
    DELIVERY_LIST_STARTED,
    DELIVERY_LIST_FAILURE,
    DELIVERY_LIST_SUCCESS,
    SAVE_DELIVERY
} from './types';
import ApiService from "../../services/apiServices";

/********** PAYMENT LIST **********/
const loadDeliveryStarted = () => ({
    type: DELIVERY_LIST_STARTED,
});
const loadDeliverySuccess = (delivery) => ({
    type: DELIVERY_LIST_SUCCESS,
    payload: [...delivery]
});

const loadDeliveryFailure = (error) => ({
    type: DELIVERY_LIST_FAILURE,
    payload: error.message
});

export const loadDelivery = () => async (dispatch) => {

    try {
        dispatch(loadDeliveryStarted());

        const delivery= await ApiService.getDelivery()
            .then((res) => res.json());

        dispatch(loadDeliverySuccess(delivery));

    } catch (error){
        dispatch(loadDeliveryFailure(error));
    }
};
export const saveDelivery = (data) => (dispatch) => {
    dispatch({ type: SAVE_DELIVERY, payload: data });
};
