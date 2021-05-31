var express = require("express")
var router = express.Router()
var Wage = require("../models/wage")
var User = require("../models/user")
var Invoice = require("../models/invoice")
var middleware = require("../middleware")
var mongoose = require("mongoose")
var simpleJSONFilter = require("./sort.js")
const middlewareObj = require("../middleware")

//show the form to add a wage to employee
router.get("/wage/new", middlewareObj.isLoggedIn, middlewareObj.economy, function (req, res) {
    User.find({}, function (err, allEmployees) {
        if (err) {
            console.log(err)
        } else {
            var sjf = new simpleJSONFilter()
            var result = sjf
                .filter({ 'position !=': 'zákazník' })
                .data(allEmployees)
                .wantArray()
                .exec()
            res.render("economy/wage_new", { employees: result })
        }
    })
})

//create a new wage
router.post("/wage", middlewareObj.isLoggedIn, middlewareObj.economy, function (req, res) {
    var newWage = {
        employee: req.body.employee,
        wage: req.body.wage
    }
    Wage.create(newWage, function (err, order) {
        if (err) {
            req.flash("error", err.message)
            res.redirect("back")
        } else {
            req.flash("success", "The Wage Has Been Added")
            res.redirect("/economy/wage")
        }
    })
})

//show all the wages
router.get("/wage", middlewareObj.isLoggedIn, middlewareObj.economy, function (req, res) {
    Wage.find({}, function (err, allWages) {
        if (err) {
            console.log(err)
        } else {
            res.render("economy/wage", { wages: allWages })
        }
    })
})

//show all the invoices
router.get("/invoices", middlewareObj.isLoggedIn, middlewareObj.economy, function (req, res) {
    Invoice.find({}, function (err, allInvoices) {
        if (err) {
            console.log(err)
        } else {
            res.render("economy/invoice", { invoices: allInvoices })
        }
    })
})

module.exports = router