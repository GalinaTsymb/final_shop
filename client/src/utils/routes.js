
import {
    CART_ROUTE,
    USER_ROUTE,
    SHOP_ROUTE,
    PRODUCT_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_PROFILE,
    PAYMENT_ROUTE,
    DELIVERY_ROUTE,
    ORDER_ROUTE,
    THANKS_ROUTE
} from "./consts";
import Cart from "../pages/Cart";
import UserPage from "../pages/UserPage";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import UserProfile from "../components/UserProfile";
import Payment from "../components/Payment";
import Delivery from "../components/Delivery";
import Order from "../components/Order";
import Thanks from "../pages/Thanks";

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
    },
    {
        path: USER_PROFILE ,
        component: UserProfile
    },
    {
        path: PAYMENT_ROUTE,
        component: Payment
    },
    {
        path: DELIVERY_ROUTE,
        component: Delivery
    },
    {
        path: ORDER_ROUTE,
        component: Order
    },
    {
        path: THANKS_ROUTE,
        component: Thanks
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
        component: Product

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
