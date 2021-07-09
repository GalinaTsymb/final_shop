const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.post('/list', cartController.getUserCartList);
router.post('/id', cartController.getUserCart);
router.post('/add', cartController.addProductInCart);
router.post('/delete', cartController.deleteProductFromCart);

module.exports = router;
