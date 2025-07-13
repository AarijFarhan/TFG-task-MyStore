const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  updateProductPrice
} = require('../controllers/productController');




router.get('/products', getAllProducts);
router.put('/products/:id', updateProductPrice);

module.exports = router;
