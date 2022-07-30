const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.index);
router.post('/', productsController.middlewareAuthor, productsController.post);
router.patch(
   '/:_id',
   productsController.middlewareAuthor,
   productsController.patch
);
router.delete(
   '/:_id',
   productsController.middlewareAuthor,
   productsController.delete
);
module.exports = router;
