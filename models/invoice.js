var mongoose = require("mongoose")

var InvoiceSchema = new mongoose.Schema({
    type: String,
    price: String
})

module.exports = mongoose.model("invoice", InvoiceSchema)