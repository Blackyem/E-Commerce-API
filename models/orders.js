const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
    nameOfItem: String,
    unitPrice: Number,
    totalPrice: Number,
    quantity: Number
}, {
    versionKey: false
});


const Order = mongoose.model("Order", orderSchema);


module.exports = Order;