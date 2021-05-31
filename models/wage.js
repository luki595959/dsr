var mongoose = require("mongoose")

var WageSchema = new mongoose.Schema({
    employee: {
        type: String,
        ref: "user"
    },
    wage: String
})

module.exports = mongoose.model("wage", WageSchema)