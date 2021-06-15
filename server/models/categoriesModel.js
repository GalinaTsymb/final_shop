const dataBase = require('../config/db.config');

class CategoriesModel {

   async getAll(req, res){
       try{
           const category = await dataBase.promise().query(`SELECT * FROM categories`);
           return  category[0];
       }catch{
           res.status(401).json({message: "Не удается обработать запрос"});
       }
    }
}
module.exports = new CategoriesModel();
