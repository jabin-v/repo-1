const Delivery = require('../models/Delivery')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

// @desc Get all delivery 
// @route GET /delivery
// @access public
const getDeliveryList = asyncHandler(async (req, res) => {
    // Get all products from MongoDB
    const list = await Delivery.find().populate('product').select("-__v").lean()

    // If no products 
    if (!list?.length) {
        return res.status(400).json({ message: 'Nothing  delivery list' })
    }

    res.json(list)
})

// @desc Create new delivery
// @route POST /delivery
// @access public
const createDeliveryList = asyncHandler(async (req, res) => {
    const { product_id} = req.body

    // Confirm data
    if (!product_id ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for  Product exist
    const product = await Product.findOne({ product_id }).lean().exec()

    if (!product) {
        return res.status(409).json({ message: `Product with product_id  ${product_id} not exist`})
    }


    

    
    const deliveryItem = await Delivery.create({ product:product._id})

    if (deliveryItem) { // Created 
        return res.status(201).json({ message: 'New delivery item added' })
    } else {
        return res.status(400).json({ message: 'Invalid delivery data received' })
    }

})


module.exports = {
    createDeliveryList,
    getDeliveryList

    
}