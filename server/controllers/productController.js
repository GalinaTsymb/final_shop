const productModel = require('../models/productModel');

class ProductController{

    async getAll(req, res){

        const allProducts = await productModel.getAll();
        return res.json(allProducts);
    }

    async getProductsCategoryId(req, res){
        const productsCategoryId = await productModel.getProductsCategoryId(req.params.id);
        return res.json(productsCategoryId);
    }

    async getOne(req, res){
        const productDetails = await productModel.getOne(req.params.id);
        return res.json(productDetails);
    }
}

module.exports = new ProductController();
