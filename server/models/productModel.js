const dataBase = require('../config/db.config');

class ProductModel {

    async getAll(){
        try{
            const products = await dataBase.promise()
                .query(`SELECT * FROM products as Pr JOIN structure as St WHERE Pr.id_structure = St.id_structure`);
            return products[0];
           //return callback({ success: true, msg: products });
        }catch (error) {
           return callback({ success: false, msg: JSON.stringify(error) });
        }
    }

    async getProductsCategoryId( id, callback){
        try{
            const productsCategoryName = await dataBase.promise().query(`SELECT * FROM product_to_categories as PrC JOIN products as P WHERE PrC.id_product = P.id_prod AND PrC.id_categories = ${id}`);
            console.log('category products',productsCategoryName[0] );
            return productsCategoryName[0];
        }
       catch (error){
           return callback({ success: false, msg: JSON.stringify(error) });
       }
    }

   async getOne(id, callback){
       console.log('prod id', id);
        try{
            const productsDetails = await dataBase.promise().query(`SELECT * FROM products as Pr JOIN color as C JOIN sizes as S JOIN structure as St JOIN type as T WHERE Pr.id_prod = ${id} AND Pr.id_structure = St.id_structure AND Pr.id_type = T.id_type AND Pr.id_color = C.id_color AND Pr.id_size = S.id_size`);
            console.log('category products',productsDetails[0] );
            return productsDetails[0];
        }
        catch (error){
            return callback({ success: false, msg: JSON.stringify(error) });
        }
    }
}
module.exports = new ProductModel();
