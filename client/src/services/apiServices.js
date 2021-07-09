import {limitPagination} from "../utils/consts";

const apiHost = process.env.REACT_APP_API_URL;

class ApiService {

    getCategories         = async () => fetch(`${apiHost}/api/categories/all`);

    getProducts           = async (page, id) => fetch(`${apiHost}/api/products/all?page=${page}&limit=${limitPagination}&id=${id}`);

    getDetailsProduct     = async id => fetch(`${apiHost}/api/products/${id}`);

    sendUserRegistr       = async userInfo => fetch(`${apiHost}/api/user/registration`,
        { method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' }
        });
    sendUserLogin         = async userInfo => fetch(`${apiHost}/api/user/login`,
        { method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' }
        });
    getUserProfile          = async user => fetch(`${apiHost}/api/user/info`,
        { method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        });

    getPayments = async () => fetch(`${apiHost}/api/payment/all`);

    getDelivery = async () => fetch(`${apiHost}/api/delivery/all`);

    getUserCart = async login => fetch(`${apiHost}/api/cart/id`,{
        method: 'POST',
        body: JSON.stringify(login),
        headers: { 'Content-Type': 'application/json'}
    });
    getUserCartList = async login => fetch(`${apiHost}/api/cart/list`,{
        method: 'POST',
        body: JSON.stringify(login),
        headers: { 'Content-Type': 'application/json'}
    });

    saveAddToCart = async product => fetch(`${apiHost}/api/cart/add`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    saveDeleteFromCart = async orderInfo => fetch(`${apiHost}/api/cart/delete`, {
        method: 'POST',
        body: JSON.stringify(orderInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    updateUser = async userNewInfo => fetch(`${apiHost}/api/user/update`, {
        method: 'POST',
        body: JSON.stringify(userNewInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    saveOrder = async orderInfo => fetch(`${apiHost}/api/order/create`,{
        method: 'POST',
        body: JSON.stringify(orderInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    saveOrderDetails = async detailsOrder => fetch(`${apiHost}/api/order/details`,{
        method: 'POST',
        body: JSON.stringify(detailsOrder),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    getUserOrders = async id => fetch(`${apiHost}/api/order/orders`, {
        method: 'POST',
        body: JSON.stringify(id),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    getOrderDetails = async id => fetch(`${apiHost}/api/order/orderdetails`,{
        method: 'POST',
        body: JSON.stringify(id),
        headers: {
            'Content-Type': 'application/json'
        }
    });


}
export default new ApiService();
