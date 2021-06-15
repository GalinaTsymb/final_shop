const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

router.get('/all', productController.getAll);
router.get('/:id', productController.getOne);
router.get('/categoryId/:id', productController.getProductsCategoryId);

module.exports = router;
