const dataBase = require('../config/db.config');
const ApiError = require('../error/ApiError');

class CategoriesModel {

   async getAll(){
       try{
           const category = await dataBase.promise().query(`SELECT * FROM categories`);
           return  category[0];
       }catch{
           return ApiError.badRequest('Request not found');
       }
    }
}
module.exports = new CategoriesModel();
