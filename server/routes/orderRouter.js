const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');

router.post('/create', orderController.createOrder);
router.post('/details', orderController.createOrderDetails);
router.post('/orders', orderController.getUserOrders);
router.post('/orderdetails', orderController.getOrderDetails);

module.exports = router;
