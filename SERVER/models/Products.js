const mongoose = require('mongoose');

const Product = mongoose.model('Product',{
    item:{
        type: String,
    },
    price:{
        type: Number,
    },
    desc:{
        type: Number,
    }
}
)

module.exports = {Product};