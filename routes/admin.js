var express = require("express")
var router = express.Router()
var User = require("../models/user")
var middleware = require("../middleware")
var mongoose = require("mongoose")
const middlewareObj = require("../middleware")
var simpleJSONFilter = require("./sort.js")
var passport = require("passport")

//show all the user without customers
router.get("/", middlewareObj.isLoggedIn, middlewareObj.admin, function (req, res, next) {
    User.find({}, function (err, allUsers) {
        if (err) {
            console.log(err)
        } else {
            var sjf = new simpleJSONFilter()
            var result = sjf
                .filter({ 'position !=': 'zákazník' })
                .data(allUsers)
                .wantArray()
                .exec()
            res.render("admin/admin", { users: result })
        }
    })
})

//show edit form to edit users
router.get("/:id/edit", middlewareObj.isLoggedIn, middlewareObj.admin, function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        res.render("admin/admin_edit", { user: foundUser })
    })
})

//update
router.put("/:id", middlewareObj.isLoggedIn, middlewareObj.admin, function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body.user, function (err, updatedUser) {
        if (err) {
            console.log(err)
        } else {
            req.flash("success", "Succesfully Updated")
            res.redirect("/admin")
        }
    })
})

//delete
router.delete("/:id", middlewareObj.isLoggedIn, middlewareObj.admin, function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err)
        } else {
            req.flash("success", "Succesfully Deleted User")
            res.redirect("/admin")
        }
    })
})

module.exports = router