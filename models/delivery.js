var mongoose = require("mongoose")

var DeliverySchema = new mongoose.Schema({
    driver: {
        type: String,
        ref: "user"
    },
    device: String,
    quantity: Number,
    shop: String,
    state: {
        type: String,
        default: "Created"
    }
})

module.exports = mongoose.model("delivery", DeliverySchema)