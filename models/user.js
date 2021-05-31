var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    phone: String,
    position: {
        type: String,
        default: "zákazník"
    }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("user", UserSchema)