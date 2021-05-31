var express = require("express")
var router = express.Router()
var Sold = require("../models/sold")
var User = require("../models/user")
var Service = require("../models/service")
var middleware = require("../middleware")
var mongoose = require("mongoose")
const middlewareObj = require("../middleware")

//show the form to add a order
router.get("/sold/new", middlewareObj.isLoggedIn, middlewareObj.customer, function (req, res) {
    res.render("customer/order_new")
})

//create a new order
router.post("/sold", middlewareObj.isLoggedIn, middlewareObj.customer, function (req, res) {
    var newOrder = {
        device: req.body.device,
        quantity: req.body.quantity,
        username: req.user.username
    }
    Sold.create(newOrder, function (err, order) {
        if (err) {
            req.flash("error", err.message)
            res.redirect("back")
        } else {
            req.flash("success", "The Order Has Been Added")
            res.redirect("/customer/sold")
        }
    })
})

//show order for user
router.get("/sold", middlewareObj.isLoggedIn, middlewareObj.customer, function (req, res) {
    Sold.find({ username: req.user.username }, function (err, allSolds) {
        if (err) {
            console.log(err)
        } else {
            res.render("customer/order", { solds: allSolds })
        }
    })
})

//show the form to add a service
router.get("/services/new", middlewareObj.isLoggedIn, middlewareObj.customer, function (req, res) {
    res.render("customer/service_new")
})

//create a new service
router.post("/services", middlewareObj.isLoggedIn, middlewareObj.customer, function (req, res) {
    var newOrder = {
        device: req.body.device,
        failure: req.body.failure,
        username: req.user.username
    }
    Service.create(newOrder, function (err, order) {
        if (err) {
            req.flash("error", err.message)
            res.redirect("back")
        } else {
            req.flash("success", "The Service Has Been Added")
            res.redirect("/customer/services")
        }
    })
})

//show service for user
router.get("/services", middlewareObj.isLoggedIn, middlewareObj.customer, function (req, res) {
    Service.find({ username: req.user.username }, function (err, allServices) {
        if (err) {
            console.log(err)
        } else {
            res.render("customer/service", { services: allServices })
        }
    })
})

module.exports = router