//packages
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    cors = require('cors')

//routes
var keys = require("./config/keys"),
    indexRoutes = require("./routes/index"),
    adminRoutes = require("./routes/admin"),
    managerRoutes = require("./routes/manager"),
    customerRoutes = require("./routes/customer"),
    serviceRoutes = require("./routes/service"),
    storeRoutes = require("./routes/store"),
    economyRoutes = require("./routes/economist"),
    warehouseRoutes = require("./routes/warehouse"),
    driverRoutes = require("./routes/driver")

//database
var User = require("./models/user")

//dbs connect
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected To MongoDB')
})
mongoose.set("useFindAndModify")

app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}))

app.use(bodyParser.json({
    extended: false,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}))

//set app
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'))
app.use(methodOverride("_method"))
app.use(flash())

//passport - login
app.use(require("express-session")({
    secret: "scrt",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

//routes
app.use("/", indexRoutes)
app.use("/admin", adminRoutes)
app.use("/manager", managerRoutes)
app.use("/customer", customerRoutes)
app.use("/service", serviceRoutes)
app.use("/store", storeRoutes)
app.use("/economy", economyRoutes)
app.use("/warehouse", warehouseRoutes)
app.use("/driver", driverRoutes)

//bad route
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/error.html")
})

//run app
var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
    console.log("The Server Has Started On Port 8080!")
})