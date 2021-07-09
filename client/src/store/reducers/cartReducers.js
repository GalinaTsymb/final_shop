import {
    INIT_CART_STARTED,
    INIT_CART_SUCCESS,
    INIT_CART_FAILURE,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_LIST_STARTED,
    CART_LIST_SUCCESS,
    CART_LIST_FAILURE,
    CLEAR_CART
}
    from '../actions/types';


function cartReducer(state={cartId: {}, cartItems: []}, action){
    switch(action.type){
        case INIT_CART_STARTED:
            return {...state, loading: true};
        case INIT_CART_SUCCESS:
            return {...state, loading: false, cartId: action.payload};
        case INIT_CART_FAILURE:
            return {...state, loading: false, error: action.payload};
        case CART_LIST_STARTED:
            return {...state, loading: true};
        case CART_LIST_SUCCESS:
            return {...state, loading: false, cartItems: action.payload};
        case CART_LIST_FAILURE:
            return {...state, loading: false, error: action.payload};
        case CART_ADD_ITEM:
            const item = action.payload;

            const product = state.cartItems.find(x => x.id_prod === item.id_prod);
            if(product){

                return {
                    ...state,
                    cartItems: state.cartItems.map(x => {
                       if(x.id_prod === product.id_prod){
                           x.qty++;
                       }
                       return x;
                    } )};
            }
            return { ...state, cartItems: [...state.cartItems, item]};

        case CART_REMOVE_ITEM:

            const productDelete = state.cartItems.find(x => x.id_prod === action.payload);
            if(productDelete.qty>1){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => {
                        if(x.id_prod === productDelete.id_prod){
                            x.qty--;
                        }
                        return x;
                    } )};
            }
            return {...state, cartItems: state.cartItems.filter(x => x.id_prod !== action.payload)};
        case CLEAR_CART:
            return {...state, cartItems: []};
        default:
            return state;
    }
}

export {cartReducer}
