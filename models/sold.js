var mongoose = require("mongoose")

var SoldSchema = new mongoose.Schema({
    device: String,
    quantity: Number,
    username: {
        type: String,
        ref: "user"
    }
})

module.exports = mongoose.model("sold", SoldSchema)