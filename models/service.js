var mongoose = require("mongoose")

var ServiceSchema = new mongoose.Schema({
    device: String,
    failure: String,
    state: {
        type: String,
        default: "Created"
    },
    username: {
        type: String,
        ref: "user"
    }
})

module.exports = mongoose.model("service", ServiceSchema)