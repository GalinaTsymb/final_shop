const productModel = require('../models/productModel');

class ProductController{

     async paginatedProducts(req, res){

         const page         = parseInt(req.query.page);
         const limit        = parseInt(req.query.limit);
         const id_category  = parseInt(req.query.id);

         const startIndex = ((page - 1) * limit) +1;
         const endIndex = page * limit;

         const results = {};
         let count;
         if(id_category === 0){
              count= await productModel.getCountProducts();
         }else{
              count= await productModel.getCountProductsByCategory(id_category);
         }

         if (endIndex < count.count) {
             results.next = {
                 page: page + 1,
                 limit: limit
             };
         }

         if (startIndex > 1) {
             results.previous = {
                 page: page - 1,
                 limit: limit
             }
         }

         try {
             if(id_category === 0){
                 results.results = await productModel.getAll(startIndex, endIndex);
                 return res.json(results);
             }else{
                 results.results = await productModel.getProductsCategoryId(startIndex, limit,id_category );
                 return res.json(results);
             }


         } catch (e) {
             res.status(500).json({ message: e.message })
         }
     }


    async getOne(req, res){
        const productDetails = await productModel.getOne(req.params.id);
        return res.json(productDetails);
    }
}

module.exports = new ProductController();
