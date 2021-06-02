var express = require("express")
var router = express.Router()
var Delivery = require("../models/delivery")
var middleware = require("../middleware")
var mongoose = require("mongoose")
const middlewareObj = require("../middleware")

//show all the delivery
router.get("/", middlewareObj.isLoggedIn, middlewareObj.drive, function (req, res) {
    Delivery.find({driver: req.user.username}, function (err, allDelivery) {
        if (err) {
            console.log(err)
        } else {
            res.render("driver/driver", { delivery: allDelivery })
        }
    })
})

//accept the delivery by driver
router.get("/:id", middlewareObj.isLoggedIn, middlewareObj.drive, function (req, res) {
    Delivery.findById(req.params.id).exec(function (err, foundDelivery) {
        if (err) {
            console.log(err)
        } else {
            foundDelivery.state = "Accept By Driver"
            updateDelivery = foundDelivery
            Delivery.findByIdAndUpdate(req.params.id, updateDelivery, function (err, updatedDelivery) {
                if (err) {
                    console.log(err)
                } else {
                    req.flash("success", "Succesfully Updated Delivery")
                    res.redirect("/driver")
                }
            })
        }
    })
})

module.exports = router