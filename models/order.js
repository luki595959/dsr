var mongoose = require("mongoose")

var OrderSchema = new mongoose.Schema({
    device: String,
    quantity: Number
})

module.exports = mongoose.model("order_ext", OrderSchema)