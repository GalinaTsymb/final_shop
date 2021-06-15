const dataBase = require('../config/db.config');
const ApiError = require('../error/ApiError');

class CartModel{

   async create(id_user){
        try{
            const cart = await dataBase.promise().query(`INSERT INTO cart(id_user) VALUES (${id_user})`);
            return cart[0];
        }catch(error){
            return ApiError.badRequest('Request not found');
        }
    }
    async getUserCart(email){
       try{
           const userCart = await dataBase.promise().query(`SELECT C.id_cart, Pr.id_prod,Pr.name_prod, Cpr.qty, Pr.price_prod FROM cart as C JOIN users as U JOIN cart_to_products Cpr JOIN products as Pr WHERE C.id_user = U.id_user AND U.email_user = '${email}' AND Cpr.id_cart = C.id_cart AND Cpr.id_product=Pr.id_prod`);

           return userCart[0];
       }catch{
           return ApiError.badRequest('Request not found');
       }
    }
    async addPtoductInCart(id_cart, id_prod, qty){
        console.log('model', id_cart, id_prod, qty);
       try{
           const cartProduct = await dataBase.promise().query(`INSERT INTO cart_to_products(id_cart, id_product, qty) VALUES (${id_cart}, ${id_prod}, ${qty})`);
           console.log('model', cartProduct);
           return cartProduct;
       }catch{
           return ApiError.badRequest('Request not found');
       }
    }


}

module.exports = new CartModel();
