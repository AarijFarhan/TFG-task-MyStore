const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/TFG-Task-DataBase')


const priceSchema = new mongoose.Schema({
  productId: { 
      type: Number,
      required: true,
      unique: true 
    },
  value: { 
     type: Number,
     required: true
     },
  currency_code: { 
    type: String, 
    default: 'USD'
 },
});


const Price = mongoose.model('Price', priceSchema);


module.exports = Price;
