const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const categoriesRouter = require('./categoriesRouter');
const cartRouter = require('./cartRouter');
const paymentRouter = require('./paymentRouter');
const deliveryRouter = require('./deliveryRouter');
const orderRouter = require('./orderRouter');

router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoriesRouter);
router.use('/cart', cartRouter);
router.use('/payment', paymentRouter);
router.use('/delivery', deliveryRouter);
router.use('/order', orderRouter);


module.exports = router;
