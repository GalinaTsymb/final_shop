
export const LOGIN_ROUTE        = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const SHOP_ROUTE         = '/';
export const CART_ROUTE         = '/cart';
export const PRODUCT_ROUTE      = '/product';
export const USER_ROUTE         = '/user';
export const USER_PROFILE       = '/profile';
export const PAYMENT_ROUTE      = '/payment';
export const DELIVERY_ROUTE     = '/delivery';
export const ORDER_ROUTE        = '/order';
export const THANKS_ROUTE       = '/thanks';


/**********************************************************/

export const getProductImageUrl = name =>
    `${process.env.REACT_APP_API_URL}/images/${name}`;

/**********************************************************/

export const limitPagination = 6;
export const idAllproducts   = 0;


