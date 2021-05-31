var express = require("express")
var router = express.Router()
var User = require("../models/user")
var Delivery = require("../models/delivery")
var middleware = require("../middleware")
var mongoose = require("mongoose")
var simpleJSONFilter = require("./sort.js")
const middlewareObj = require("../middleware")

//show the form to add a delivery
router.get("/new", middlewareObj.isLoggedIn, middlewareObj.warehouseManager, function (req, res) {
    User.find({}, function (err, allDrivers) {
        if (err) {
            console.log(err)
        } else {
            var sjf = new simpleJSONFilter()
            var result = sjf
                .filter({ 'position ==': 'závozník' })
                .data(allDrivers)
                .wantArray()
                .exec()
            res.render("warehouse/new", { drivers: result })
        }
    })
})

//create a new delivery
router.post("/", middlewareObj.isLoggedIn, middlewareObj.warehouseManager, function (req, res) {
    var newDelivery = {
        driver: req.body.driver,
        device: req.body.device,
        quantity: req.body.quantity,
        shop: req.body.shop
    }
    Delivery.create(newDelivery, function (err, order) {
        if (err) {
            req.flash("error", err.message)
            res.redirect("back")
        } else {
            req.flash("success", "The Delivery Has Been Added")
            res.redirect("/warehouse")
        }
    })
})

//show all the delivery
router.get("/", middlewareObj.isLoggedIn, middlewareObj.warehouseManager, function (req, res) {
    Delivery.find({}, function (err, allDelivery) {
        if (err) {
            console.log(err)
        } else {
            res.render("warehouse/warehouse", { delivery: allDelivery })
        }
    })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////WAREHOUSEMAN///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//show all the delivery
router.get("/warehouseman", middlewareObj.isLoggedIn, middlewareObj.warehouseMan, function (req, res) {
    Delivery.find({}, function (err, allDelivery) {
        if (err) {
            console.log(err)
        } else {
            res.render("warehouse/man", { delivery: allDelivery })
        }
    })
})

//accept delivery by warehouseman
router.get("/warehouseman/:id", middlewareObj.isLoggedIn, middlewareObj.warehouseMan, function (req, res) {
    Delivery.findById(req.params.id).exec(function (err, foundDelivery) {
        if (err) {
            console.log(err)
        } else {
            foundDelivery.state = "Ready For Driver"
            updateDelivery = foundDelivery
            Delivery.findByIdAndUpdate(req.params.id, updateDelivery, function (err, updatedDelivery) {
                if (err) {
                    console.log(err)
                } else {
                    req.flash("success", "Succesfully Updated Delivery")
                    res.redirect("/warehouse/warehouseman")
                }
            })
        }
    })
})

module.exports = router