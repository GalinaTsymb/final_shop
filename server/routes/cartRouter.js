const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.getUserCart);
router.post('/add', cartController.addPtoductInCart);

module.exports = router;
