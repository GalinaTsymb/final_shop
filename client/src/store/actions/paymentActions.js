import {
    PAYMENT_LIST_STARTED,
    PAYMENT_LIST_FAILURE,
    PAYMENT_LIST_SUCCESS,
    SAVE_PAYMENT
} from './types';
import ApiService from "../../services/apiServices";

/********** PAYMENT LIST **********/
const loadPaymentsStarted = () => ({
    type: PAYMENT_LIST_STARTED,
});
const loadPaymentsSuccess = (payments) => ({
    type: PAYMENT_LIST_SUCCESS,
    payload: [...payments]
});

const loadPaymentsFailure = (error) => ({
    type: PAYMENT_LIST_FAILURE,
    payload: error.message
});

export const loadPayments = () => async (dispatch) => {

    try {
        dispatch(loadPaymentsStarted());

          const payments= await ApiService.getPayments()
                .then((res) => res.json());

        dispatch(loadPaymentsSuccess(payments));

    } catch (error){
        dispatch(loadPaymentsFailure(error));
    }
};
export const savePayment = (data) => (dispatch) => {
    dispatch({ type: SAVE_PAYMENT, payload: data });
};
