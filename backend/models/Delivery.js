const mongoose = require('mongoose');

const deliverySchema=new mongoose.Schema({
    product:{
           type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'

    }

})


module.exports = mongoose.model('Delivery', deliverySchema)