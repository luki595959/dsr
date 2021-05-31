var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")
var middleware = require("../middleware")
const middlewareObj = require("../middleware")

//root route
router.get("/", function (req, res) {
    res.render("landing")
})

// show register form
router.get("/register", function (req, res) {
    res.render("register")
})

//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username, position: req.body.position, telefon: req.body.telefon })
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message)
            return res.render("register")
        }
        req.flash("success", "Done, Username: " + newUser.username + " Was Succesfully Registered")
        res.redirect("/")

    })
})

//show login form
router.get("/login", function (req, res) {
    res.render("login")
})

//handling login logic
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.redirect('/login') }
        req.logIn(user, function (err) {
            if (err) { return next(err) }
            var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/profile'
            delete req.session.redirectTo
            res.redirect(redirectTo)
        })
    })(req, res, next)
})

//logout route
router.get("/logout", function (req, res) {
    req.logout()
    req.flash("success", "You Are Logged Out")
    res.redirect("/")
})

//show profile
router.get("/profile", middlewareObj.isLoggedIn, function (req, res) {
    res.render("profile")
})

module.exports = router