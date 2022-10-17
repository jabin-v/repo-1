const Stock = require('../models/Stock')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

// @desc Get all stock 
// @route GET /stock
// @access public
const getStockList = asyncHandler(async (req, res) => {
    // Get all products from MongoDB
    const list = await Stock.find().populate('product').select("-__v").lean()

    // If no products 
    if (!list?.length) {
        return res.status(400).json({ message: 'Nothing  stock list' })
    }

    res.json(list)
})

// @desc Create new stock
// @route POST /stock
// @access public
const createStock = asyncHandler(async (req, res) => {
    const { product_id} = req.body

    // Confirm data
    if (!product_id ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for  Product exist
    const product = await Product.findOne({ product_id }).exec()

    if (!product) {
        return res.status(409).json({ message: `Product with product_id  ${product_id} not exist`})
    }


    

    
    const stockItem = await Stock.create({ product:product._id})

    if (stockItem) { // Created 
        return res.status(201).json({ message: 'New stock item added' })
    } else {
        return res.status(400).json({ message: 'Invalid stock data received' })
    }

})


module.exports = {
    createStock,
    getStockList

    
}