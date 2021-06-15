const apiHost = process.env.REACT_APP_API_URL;

class ApiService {

    getCategories         = async () => fetch(`${apiHost}/api/categories/all`);

    getProducts           = async () => fetch(`${apiHost}/api/products/all`);

    getProductsByCategory = async id => fetch(`${apiHost}/api/products/categoryId/${id}`);

    getDetailsProduct     = async id => fetch(`${apiHost}/api/products/${id}`);

    sendUserRegistr            = async userInfo => fetch(`${apiHost}/api/user/registration`,
        { method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' }
        });
    sendUserLogin         = async userInfo => fetch(`${apiHost}/api/user/login`,
        { method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' }
        });
    getUser = async email => fetch(`${apiHost}/api/user/profile`, {
        method: 'POST',
        body: JSON.stringify(email),
        headers: { 'Content-Type': 'application/json'}
    });

    getUserCart = async email => fetch(`${apiHost}/api/cart/`,{
        method: 'POST',
        body: JSON.stringify(email),
        headers: { 'Content-Type': 'application/json'}
    });

    addProductInCart = async infoAdd => fetch(`${apiHost}/api/cart/add`,{
        method: 'POST',
        body: JSON.stringify(infoAdd),
        headers: { 'Content-Type': 'application/json'}
    })

}

export default new ApiService();
