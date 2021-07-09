import {
    ADD_ORDER,
    ORDER_LIST_STARTED,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    ORDER_DETAILS_STARTED,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,

} from "../actions/types";

function orderReducer (state={ orders: [], orderDetails: [] }, action){
    switch (action.type){
        case ADD_ORDER:
            console.log('reducer order', action.payload);
            return {...state, order: action.payload};
        case ORDER_LIST_STARTED:
            return {...state, loading: true, loadingError: false };
        case ORDER_LIST_SUCCESS:
            return {...state, loading: false, loadingError: false, orders: action.payload};
        case ORDER_LIST_FAILURE:
            return {...state, loading: false, loadingError:true, error: action.payload};
        case ORDER_DETAILS_STARTED:
            return {...state, loadingDetails: true, detailsError: false };
        case ORDER_DETAILS_SUCCESS:
            return {...state, loadingDetails: false, detailsError: false, orderDetails: action.payload};
        case ORDER_DETAILS_FAILURE:
            return {...state, loadingDetails: false, detailsError:true, error: action.payload};
        default: return state;
    }
}

export {orderReducer}
