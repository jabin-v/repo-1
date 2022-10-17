const express = require('express')
const router = express.Router()
const stockController = require('../controllers/stockController')

router.route('/')
    .get(stockController.getStockList)
    .post(stockController.createStock)
    

module.exports = router