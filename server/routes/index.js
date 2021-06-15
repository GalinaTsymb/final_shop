const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const categoriesRouter = require('./categoriesRouter');
const cartRouter = require('./cartRouter');

router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoriesRouter);
router.use('/cart', cartRouter);


module.exports = router;
