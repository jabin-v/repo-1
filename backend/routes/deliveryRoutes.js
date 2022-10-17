const express = require('express')
const router = express.Router()
const deliveryController = require('../controllers/deliveryController')

router.route('/')
    .get(deliveryController.getDeliveryList)
    .post(deliveryController.createDeliveryList)
    

module.exports = router