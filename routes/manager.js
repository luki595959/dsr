var express = require("express")
var router = express.Router()
var Order = require("../models/order")
var Sold = require("../models/sold")
var Service = require("../models/service")
var middleware = require("../middleware")
var mongoose = require("mongoose")
const middlewareObj = require("../middleware")

//show the form to add an external order
router.get("/order/new", middlewareObj.isLoggedIn, middlewareObj.manager, function (req, res) {
    res.render("manager/order_new")
})

//create an external order
router.post("/order", middlewareObj.isLoggedIn, middlewareObj.manager, function (req, res) {
    var newOrder = {
        device: req.body.device,
        quantity: req.body.quantity
    }
    Order.create(newOrder, function (err, order) {
        if (err) {
            req.flash("error", err.message)
            res.redirect("back")
        } else {
            req.flash("success", "The Order Has Been Added")
            res.redirect("/manager/orders")
        }
    })
})

//show all external orders
router.get("/orders", middlewareObj.isLoggedIn, middlewareObj.manager, function (req, res) {
    Order.find({}, function (err, allOrders) {
        if (err) {
            console.log(err)
        } else {
            res.render("manager/orders", { orders: allOrders })
        }
    })
})

//show sold devices
router.get("/sold", middlewareObj.isLoggedIn, middlewareObj.manager, function (req, res) {
    Sold.find({}, function (err, allSolds) {
        if (err) {
            console.log(err)
        } else {
            res.render("manager/sold", { solds: allSolds })
        }
    })
})

//show serviced
router.get("/services", middlewareObj.isLoggedIn, middlewareObj.manager, function (req, res) {
    Service.find({}, function (err, allServices) {
        if (err) {
            console.log(err)
        } else {
            res.render("manager/service", { services: allServices })
        }
    })
})

module.exports = router