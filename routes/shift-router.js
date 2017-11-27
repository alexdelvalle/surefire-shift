const express      = require('express');
const bcrypt       = require("bcrypt");
const passport     = require("passport");


const router       = express.Router();

const UserModel    = require("../models/user-model");
const AvailabilityModel = require("../models/availability-model");
// const ShiftModel   = require("../models/shift-model");


// ROUTES ---------------------------------------------------------------------
// Home Page
router.get("/dashboard", (req, res, next) => {
    if (req.user === undefined) {
        res.redirect("/");
    }

    res.render("shift-views/dashboard");

});
// ----------------------------------------------------------------------------
// Add Available Days to Work
router.get("/my-availability", (req, res, next) => {
    if (!req.user) {
        res.redirect("/");
    }

    res.render("shift-views/my-availability");

});

router.post("/dashboard", (req, res, next) => {
  const theAvailability = new AvailabilityModel({
        date: req.body.addDate,
    });

    theAvailability.save()
      .then( () => {
          res.redirect("/dashboard");
      })
      .catch( (err) => {
          // is this a validation error?
          // if it is, display the form with the error messages
          if (theAvailability.errors) {
            res.locals.validationErrors = err.errors;
            res.render("shift-views/my-availability");
          }
          else {
            // render the error page with our error
            next(err);
          }
      });
  });

module.exports = router;
