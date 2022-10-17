const mongoose = require('mongoose');

const productSceme=new mongoose.Schema({
    productName:{
        type:String,
        required: true
    },
    product_id:{
        type:Number,
        required: true
    },

})


module.exports = mongoose.model('Product', productSceme)