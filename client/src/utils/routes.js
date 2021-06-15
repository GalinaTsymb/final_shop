
import {CART_ROUTE, USER_ROUTE, SHOP_ROUTE, PRODUCT_ROUTE,LOGIN_ROUTE, REGISTRATION_ROUTE} from "./consts";
import Cart from "../pages/Cart";
import UserPage from "../pages/UserPage";
import Shop from "../pages/Shop";
import ProductSingle from "../pages/ProductSingle";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

//список маршрутов который имеет только авторизованный пользователь
export const authentificationRoutes = [
    {
        path: CART_ROUTE + '/:id',
        component: Cart
    },
    {
        path: CART_ROUTE,
        component: Cart

    },
    {
        path: USER_ROUTE ,
        component: UserPage
    }
];

// на эти маршруты может перейти любой пользователь
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        component: Shop

    },
    {
        path: PRODUCT_ROUTE + '/:id',
        component: ProductSingle

    },
    {
        path: LOGIN_ROUTE,
        component: Login

    },
    {
        path: REGISTRATION_ROUTE,
        component: Registration

    }
];
