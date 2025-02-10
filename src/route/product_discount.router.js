const express = require('express');
const router = express.Router();

const {GetAllProductDiscount, CreateProductDiscount,UpdateProductDiscount} = require('../controller/product_discount.controller');


router.get('/', GetAllProductDiscount);///  useing get invoice save cart
router.post('/', CreateProductDiscount);///  useing page Product Discount
router.put('/', UpdateProductDiscount);///  useing page Product Discount

module.exports = router;