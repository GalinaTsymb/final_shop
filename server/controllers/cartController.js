const cartModel = require('../models/cartModel');

class CartController {

    async getUserCart(req, res){
        const loginUser = req.body.login;
        const userCartId = await cartModel.getUserCart(loginUser);
        return res.json(userCartId);
    }

    async getUserCartList(req, res){

        const userLogin = req.body.login;
        const userCartList = await cartModel.getUserCartList(userLogin);
        return res.json(userCartList);
    }

    async addProductInCart(req, res){

        const cartId = req.body.id_cart.id_cart;
        const idProduct = req.body.productId;
        const cartProduct = await cartModel.addPtoductInCart(cartId, idProduct);
        return res.json(cartProduct);
    }
    async deleteProductFromCart (req, res){
        const cartId = req.body.id_cart.id_cart;
        const idProduct = req.body.productId;
        const cartProduct = await cartModel.deleteProductFromCart(cartId, idProduct);
        return res.json(cartProduct);
    }
}
module.exports = new CartController();
