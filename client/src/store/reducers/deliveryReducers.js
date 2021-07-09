import {
    DELIVERY_LIST_STARTED,
    DELIVERY_LIST_FAILURE,
    DELIVERY_LIST_SUCCESS,
    SAVE_DELIVERY
} from '../actions/types';


function deliveryListReducer (state = {delivery: [], deliveryChoice: {}}, action){
    switch(action.type){
        case DELIVERY_LIST_STARTED:
            return {loadingDelivery: true};
        case DELIVERY_LIST_SUCCESS:
            return {loadingDelivery: false, delivery: action.payload};
        case DELIVERY_LIST_FAILURE:
            return {loadingDelivery: false, errorDelivery: action.payload};
        case SAVE_DELIVERY:
            return { ...state, deliveryChoice: action.payload };
        default:
            return state;
    }
}
export {deliveryListReducer}
