var express = require("express")
var router = express.Router()
var Service = require("../models/service")
var middleware = require("../middleware")
var mongoose = require("mongoose")
const middlewareObj = require("../middleware")

//show all the services
router.get("/services", middlewareObj.isLoggedIn, middlewareObj.service, function (req, res) {
    Service.find({}, function (err, allServices) {
        if (err) {
            console.log(err)
        } else {
            res.render("service/service", { services: allServices })
        }
    })
})

//accept service 
router.get("/:id", middlewareObj.isLoggedIn, middlewareObj.service, function (req, res) {
    Service.findById(req.params.id).exec(function (err, foundService) {
        if (err) {
            console.log(err)
        } else {
            foundService.state = "Accept By Service"
            updateService = foundService
            Service.findByIdAndUpdate(req.params.id, updateService, function (err, updatedService) {
                if (err) {
                    console.log(err)
                } else {
                    req.flash("success", "Succesfully Updated Service")
                    res.redirect("/service/services")
                }
            })
        }
    })
})

//complete service
router.get("/done/:id", middlewareObj.isLoggedIn, middlewareObj.service, function (req, res) {
    Service.findById(req.params.id).exec(function (err, foundService) {
        if (err) {
            console.log(err)
        } else {
            foundService.state = "Done"
            updateService = foundService
            Service.findByIdAndUpdate(req.params.id, updateService, function (err, updatedService) {
                if (err) {
                    console.log(err)
                } else {
                    req.flash("success", "Succesfully Updated Service")
                    res.redirect("/service/services")
                }
            })
        }
    })
})

module.exports = router