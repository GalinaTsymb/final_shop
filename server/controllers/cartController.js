const cartModel = require('../models/cartModel');

class CartController {

    async getUserCart(req, res){
        const email = req.body.email;
        const userCart= await cartModel.getUserCart(email);
        return res.json(userCart);
    }
    async addPtoductInCart(req, res){
        const idCart = req.body.id_cart;
        const idProduct = req.body.id_prod;
        const qty = req.body.qty;
        const cartProduct = await cartModel.addPtoductInCart(idCart, idProduct, qty);

    }
}
module.exports = new CartController();
