var User = require("../models/user")
var middlewareObj = {}

middlewareObj.admin = function (req, res, next) {
    var position = req.user.position
    if (position == "admin") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered ADMIN")
    res.redirect("/login")
}

middlewareObj.manager = function (req, res, next) {
    var position = req.user.position
    if (position == "vedúci podniku") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered MANAGER")
    res.redirect("/login")
}

middlewareObj.customer = function (req, res, next) {
    var position = req.user.position
    if (position == "zákazník") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered CUSTOMER")
    res.redirect("/login")
}

middlewareObj.service = function (req, res, next) {
    var position = req.user.position
    if (position == "servisný štáb") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered SERVICE")
    res.redirect("/login")
}

middlewareObj.store = function (req, res, next) {
    var position = req.user.position
    if (position == "predajné oddelenie") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered STORE")
    res.redirect("/login")
}

middlewareObj.economy = function (req, res, next) {
    var position = req.user.position
    if (position == "účtovník") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered ECONOMIST")
    res.redirect("/login")
}

middlewareObj.warehouseManager = function (req, res, next) {
    var position = req.user.position
    if (position == "manažér skladu") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered WAREHOUSE MANAGER")
    res.redirect("/login")
}

middlewareObj.warehouseMan = function (req, res, next) {
    var position = req.user.position
    if (position == "skladník") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered WAREHOUSEMAN")
    res.redirect("/login")
}

middlewareObj.drive = function (req, res, next) {
    var position = req.user.position
    if (position == "závozník") {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Bad Position, Requiered DRIVER")
    res.redirect("/login")
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.session.redirectTo = req.originalUrl
    req.flash("error", "Must Be Loged In")
    res.redirect("/login")
}


module.exports = middlewareObj