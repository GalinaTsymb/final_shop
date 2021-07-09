const Router = require('express');
const router = new Router();
const categoriesController = require('../controllers/categoriesController');


router.get('/all', categoriesController.getAll);
module.exports = router;
