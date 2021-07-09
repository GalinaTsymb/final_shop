const Router = require('express');
const router = new Router();
const deliveryController = require('../controllers/deliveryController');

router.get('/all', deliveryController.getAll);

module.exports = router;
