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
    var newUser = new User({ username: req.body.username, position: req.body.position, phone: req.body.phone })
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
            //console.log(user)
            if (user.position == "závozník") {
                var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/driver'
                delete req.session.redirectTo
                res.redirect(redirectTo)
            } else if (user.position == "skladník") {
                var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/warehouse/warehouseman'
                delete req.session.redirectTo
                res.redirect(redirectTo)
            } else if (user.position == "manažér skladu") {
                var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/warehouse'
                delete req.session.redirectTo
                res.redirect(redirectTo)
            } else if (user.position == "servisný štáb") {
                var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/service/services'
                delete req.session.redirectTo
                res.redirect(redirectTo)
            } else {
                var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/profile'
                delete req.session.redirectTo
                res.redirect(redirectTo)
            }
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


router.get("/password", middlewareObj.isLoggedIn, function (req, res) {
    res.render("password")
})

router.post('/changepassword', function (req, res) {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            req.flash("error", err)
            res.redirect("/")
        } else {
            if (!user) {
                req.flash("error", "User Not Found")
                res.redirect("/")
            } else {
                user.changePassword(req.body.oldpassword, req.body.newpassword, function (err) {
                    if (err) {
                        if (err.name === 'IncorrectPasswordError') {
                            req.flash("error", "Incorrect Password")
                            res.redirect("/profile")
                        } else {
                            req.flash("error", "Something Went Wrong!! Please Try Again After Sometimes")
                            res.redirect("/profile")
                        }
                    } else {
                        req.flash("success", "Your Password Has Been Changed Successfully")
                        res.redirect("/profile")
                    }
                })
            }
        }
    })
})

module.exports = router