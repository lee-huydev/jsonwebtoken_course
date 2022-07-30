const mongoose = require('mongoose')

const Products = new mongoose.Schema({
    product_name: {type: String, minLength: 5, required: true},
    price: {type: String, required: true},
    amount: {type: Number, required: true}
})

module.exports = mongoose.model('Products', Products)