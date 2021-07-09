import {
    PAYMENT_LIST_STARTED,
    PAYMENT_LIST_FAILURE,
    PAYMENT_LIST_SUCCESS,
    SAVE_PAYMENT
} from '../actions/types';

function paymentListReducer (state = {payments: [], paymentChoice: {}}, action){
    switch(action.type){
        case PAYMENT_LIST_STARTED:
            return {loadingPayment: true};
        case PAYMENT_LIST_SUCCESS:
            return {loadingPayment: false, payments: action.payload};
        case PAYMENT_LIST_FAILURE:
            return {loadingPayment: false, errorPayment: action.payload};
        case SAVE_PAYMENT:
            return { ...state, paymentChoice: action.payload };
        default:
            return state;
    }
}
export {paymentListReducer}
