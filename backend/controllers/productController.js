const Product = require('../models/Product');
const Stock=require('../models/Stock');
const asyncHandler = require('express-async-handler')

// @desc Get all products 
// @route GET /products
// @access public
const getAllProducts = asyncHandler(async (req, res) => {
    // Get all products from MongoDB
    const products = await Product.find().lean()

    // If no products 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products  found' })
    }

    res.json(products)
})

// @desc Create new product
// @route POST /products
// @access public
const createNewProduct = asyncHandler(async (req, res) => {
    const { productName,product_id} = req.body

    // Confirm data
    if (!productName || !product_id ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate Product
    const duplicate = await Product.findOne({ product_id }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate product id' })
    }

    // Create and store the new product 
    const product = await Product.create({ productName, product_id})

    if (product) { // Created 
        return res.status(201).json({ message: 'New product created' })
    } else {
        return res.status(400).json({ message: 'Invalid product data received' })
    }

})


// @desc Get all products in outOfStock
// @route GET /products/outofstock
// @access public
const getAllOutOfStock = asyncHandler(async (req, res) => {
    // Get all products from MongoDB
    const products = await Product.find().exec()
    const stock=await Stock.find().populate('product')  

    // If no products 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products  exist ' })
    }

    let outOfStock=products.filter(product=>!stock.some(stock =>product.product_id === stock.product.product_id ) )
    
 

    res.json(outOfStock)
})


module.exports = {
    getAllProducts,
    createNewProduct,
    getAllOutOfStock
    
}