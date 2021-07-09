const Router = require('express');
const router = new Router();
const paymentController = require('../controllers/paymentController');

router.get('/all', paymentController.getAll);

module.exports = router;
