const mongoose = require('mongoose');

const stockSchema=new mongoose.Schema({
    product:{
           type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'

    }

})


module.exports = mongoose.model('Stock', stockSchema)