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

    async getUserCart(loginUser){

        try{
            const [userCart] = await dataBase.promise().query(`SELECT id_cart FROM cart as C JOIN users as Us WHERE Us.email_user = '${loginUser}' AND Us.id_user = C.id_user`);

            return userCart;
        }catch{
            return ApiError.badRequest('Request not found');
        }
    }

    async getUserCartList(userLogin){

       try{
           const [userCartList] = await dataBase.promise().query(`SELECT C.id_cart, Pr.id_prod,Pr.name_prod, Cpr.qty, Pr.price_prod, Pr.image FROM cart as C JOIN cart_to_products Cpr JOIN products as Pr JOIN users as Us WHERE Us.email_user = '${userLogin}' AND Cpr.id_cart = C.id_cart AND Cpr.id_product=Pr.id_prod AND Us.id_user = C.id_user`);

           return userCartList;
       }catch{
           return ApiError.badRequest('Request not found');
       }
    }

    async addPtoductInCart(id_cart, id_prod){

       try{
           const [isProduct] = await dataBase.promise().query(`SELECT * FROM cart_to_products WHERE id_cart = ${id_cart} AND id_product = ${id_prod} LIMIT 1`);

           if(isProduct.length>0){

               const prod = isProduct[0].qty + 1;

               const setQty = await dataBase.promise().query(`UPDATE cart_to_products SET qty = '${prod}' WHERE id_cart = ${id_cart} AND id_product = ${id_prod}`);
               const updateDB = await dataBase.promise().query('CALL updateCartToProducts');
               const updateCart = await dataBase.promise().query('CALL updateCart');
               return setQty;
           }else{

               const cartProduct = await dataBase.promise().query(`INSERT INTO cart_to_products(id_cart, id_product, qty) VALUES (${id_cart}, ${id_prod}, ${1})`);
               const updateDB = await dataBase.promise().query('CALL updateCartToProducts');
               const updateCart = await dataBase.promise().query('CALL updateCart');
               return cartProduct;
           }

       }catch{
           return ApiError.badRequest('Request not found');
       }
    }
    async deleteProductFromCart(id_cart, id_prod){

        try{
            const [isProduct] = await dataBase.promise().query(`SELECT * FROM cart_to_products WHERE id_cart = ${id_cart} AND id_product = ${id_prod} LIMIT 1`);

            if(isProduct[0].qty>1){

                const prod = isProduct[0].qty - 1;

                const setQty = await dataBase.promise().query(`UPDATE cart_to_products SET qty = '${prod}' WHERE id_cart = ${id_cart} AND id_product = ${id_prod}`);
                const updateDB = await dataBase.promise().query('CALL updateCartToProducts');
                const updateCart = await dataBase.promise().query('CALL updateCart');
                return setQty;
            }else{

                const cartProduct = await dataBase.promise().query(`DELETE FROM cart_to_products WHERE id_cart = ${id_cart} AND id_product = ${id_prod}`);
                const updateCart = await dataBase.promise().query('CALL updateCart');
                return cartProduct;
            }

        }catch{
            return ApiError.badRequest('Request not found');
        }
    }
    async deleteCartDetails ({id_cart}) {

        try{
            const deleteDetails = await dataBase.promise().query(`DELETE FROM cart_to_products WHERE id_cart = ${id_cart}`);
            const updateCart = await dataBase.promise().query('CALL updateCart');

        }catch(error){
            return ApiError.badRequest('Request not found');
        }

    }


}

module.exports = new CartModel();
