import jwt_decode from "jwt-decode";

export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const SHOP_ROUTE = '/shop';
export const CART_ROUTE = '/cart';
export const PRODUCT_ROUTE = '/product';
export const USER_ROUTE = '/user';

/**********************************************************/

export const getProductImageUrl = name =>
    `${process.env.REACT_APP_API_URL}/images/${name}`;

/**********************************************************/
export function decodeToken(token){
    let decode = jwt_decode(token);
    return decode.email;
}

