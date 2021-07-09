const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

router.get('/all', productController.paginatedProducts);
router.get('/:id', productController.getOne);

module.exports = router;
