import {
    USER_CART_STARTED,
    USER_CART_SUCCESS,
    USER_CART_FAILURE,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM

} from "../actions/types";
import ApiService from "../../services/apiServices";

function reducerGetUserCart(state={userCart: [], cart: [], fetchingCart: false, errorCart: false}, action){
    switch (action.type) {
        case USER_CART_STARTED:
            return { ...state, fetchingCart: true, errorCart: false };
        case USER_CART_SUCCESS:
            return { ...state, fetchingCart:true, errorCart: false, userCart: action.payload};
        case USER_CART_FAILURE:
            return { ...state, fetchingCart: false, errorCart: true};
        case CART_ADD_ITEM:
            const item = action.payload;
            console.log('item', item);

            console.log('state cart ',  state.userCart);

           /* const product = state.userCart.find(x => x.id_prod === item.id_prod);*/

            /*if (product) {
                product.qty ++;
                return {
                   ...state, userCart:
                        state.userCart.map(x => x.id_prod === product.id_prod ? product : x)
                };
            }else{*/
            let infoAdd = {id_cart: state.userCart[0].id_cart, id_prod: item.id_prod, qty: 1};
            console.log('infoAdd', infoAdd);
            ApiService.addProductInCart(infoAdd);
                /*infoAdd = {};
                return { ...state, userCart: [...state.userCart, item] };*/

            return {...state};

        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };
        default: return state;
    }
}

export {
    reducerGetUserCart,

}
