const categoriesModel = require('../models/categoriesModel');

class CategoriesController{

    async getAll(req, res){
        const allProducts = await categoriesModel.getAll();
        return res.json(allProducts);
    }

}

module.exports = new CategoriesController();
