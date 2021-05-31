var express = require("express")
var router = express.Router()
var Sold = require("../models/sold")
var Invoice = require("../models/invoice")
var middleware = require("../middleware")
var mongoose = require("mongoose")
const middlewareObj = require("../middleware")

//show the form to add an invoice
router.get("/invoice/new", middlewareObj.isLoggedIn, middlewareObj.store, function (req, res) {
    res.render("store/new_invoice")
})

//create a new invoice
router.post("/invoice", middlewareObj.isLoggedIn, middlewareObj.store, function (req, res) {
    var newInvoice = {
        type: req.body.type,
        price: req.body.price
    }
    Invoice.create(newInvoice, function (err, order) {
        if (err) {
            req.flash("error", err.message)
            res.redirect("back")
        } else {
            req.flash("success", "The Invoice Has Been Added")
            res.redirect("/profile")
        }
    })
})

//show all the sold devices
router.get("/sold", middlewareObj.isLoggedIn, middlewareObj.store, function (req, res) {
    Sold.find({}, function (err, allSolds) {
        if (err) {
            console.log(err)
        } else {
            res.render("store/sold", { solds: allSolds })
        }
    })
})

module.exports = router