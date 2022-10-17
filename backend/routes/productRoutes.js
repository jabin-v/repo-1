const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createNewProduct)

router.route('/outofstock')
    .get(productController.getAllOutOfStock)
    
    

module.exports = router