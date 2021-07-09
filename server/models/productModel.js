const dataBase = require('../config/db.config');
const ApiError = require('../error/ApiError');

class ProductModel {

    async getCountProducts(){

        try{
            const [count] = await dataBase.promise()
                .query(`SELECT COUNT(*) as count FROM products`);
            return count[0];
        }catch (error) {
            return ApiError.badRequest('Request not found');
        }
    }
    async getAll(start, end){
        try{
            const products = await dataBase.promise().query(`SELECT * FROM products as Pr JOIN structure as St WHERE id_prod BETWEEN ${start} AND ${end} AND Pr.id_structure = St.id_structure `)
            return products[0];
        }catch(error){
            console.log('dddd');
            return ApiError.badRequest('Request not found');
        }
    }

    async getCountProductsByCategory(id){
        try{
            const [count] = await dataBase.promise()
                .query(`SELECT COUNT(*) as count FROM product_to_categories WHERE id_categories = ${id}`);

            return count[0];
        }catch (error) {
            return ApiError.badRequest('Request not found');
        }
    }

    async getProductsCategoryId(startIndex, limit, id_category){
        try{
            const productsCategoryName = await dataBase.promise().query(`SELECT * FROM product_to_categories as PrC JOIN products as P WHERE PrC.id_product = P.id_prod AND PrC.id_categories = ${id_category} LIMIT ${limit} OFFSET ${(startIndex - 1)}`);

            return productsCategoryName[0];
        }
       catch (error){
           return ApiError.badRequest('Request not found');
       }
    }

   async getOne(id){

        try{
            const productsDetails = await dataBase.promise().query(`SELECT * FROM products as Pr JOIN color as C JOIN sizes as S JOIN structure as St JOIN type as T WHERE Pr.id_prod = ${id} AND Pr.id_structure = St.id_structure AND Pr.id_type = T.id_type AND Pr.id_color = C.id_color AND Pr.id_size = S.id_size`);

            return productsDetails[0];
        }
        catch (error){
            return ApiError.badRequest('Request not found');
        }
    }
}
module.exports = new ProductModel();
