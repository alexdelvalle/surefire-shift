const express      = require('express');
const bcrypt       = require("bcrypt");
const passport     = require("passport");

const router       = express.Router();

const UserModel    = require("../models/user-model");
const AvailabilityModel = require("../models/availability-model");
// const ShiftModel   = require("../models/shift-model");


// ROUTES ---------------------------------------------------------------------
// Dashboard
router.get("/dashboard", (req, res, next) => {
    if (req.user === undefined) {
        res.redirect("/");
    }
    res.render("shift-views/dashboard");

});
// ----------------------------------------------------------------------------
// Add Available Days to Work
router.get("/my-availability", (req, res, next) => {
    if (req.user === undefined) {
        res.redirect("/");
        return;
    }

    res.render("shift-views/my-availability");

});

router.post("/dashboard", (req, res, next) => {
  var theAvailability = new AvailabilityModel({
        date: req.body.addDate,
        user: req.user._id,
        description: req.user.fullName
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
//----------------------------------------------------------------------------
// List Day Availabe for Pick Up
router.get("/my-requests", (req, res, next) => {
    if (req.user === undefined) {
        res.redirect("/");
        return;
    }
    res.render("shift-views/my-requests");
});

router.post("/dashboard2", (req, res, next) => {
  var theAvailability = new AvailabilityModel({
        date: req.body.requestDate,
        user: req.user._id,
        description: "OPEN"
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
            res.render("shift-views/my-requests");
          }
          else {
            // render the error page with our error
            next(err);
          }
      });
  });
//----------------------------------------------------------------------------
// Add/Edit/Delete Dates directly on calendar --------------------------------
router.get("/master-availability", (req, res, next) => {
    AvailabilityModel
    .find()
    .exec()
    .then( (availableDates) => {
        const datesArray = [];
        availableDates.forEach((oneDate) => {
            datesArray.push({
              id: oneDate._id,
              start_date: oneDate.date,
              end_date: oneDate.date,
              text: oneDate.description
            });
        });

        res.json(datesArray);

    })
    .catch( (err) => {
      next(err);
    });
});


router.post("/edit-availability", (req, res, next) => {
    if (req.body["!nativeeditor_status"] === "inserted") {
        const theAvailability = new AvailabilityModel({
              date: req.body.start_date,
              user: req.user._id,
              description: req.body.text
        });

        theAvailability.save()
          .then( () => {
              res.json({message: "success!"});
          })
          .catch( (err) => {
              res.json({ error: "Error saving availability" });
          });
    }
    else if (req.body["!nativeeditor_status"] === "updated"){
        AvailabilityModel.findById(req.body.id)
        .then( (dateFromDb) => {
            dateFromDb.set({
                date: req.body.start_date,
                description: req.body.text
            });
            return dateFromDb.save();
        })
        .then( () => {
            res.json({message: "success!"});
        })
        .catch( (err) => {
            res.json({ error: "Error saving availability" });
        });
    }
    else if (req.body["!nativeeditor_status"] === "deleted"){
        AvailabilityModel.findByIdAndRemove(req.body.id)
        .then( () => {
            res.json({message: "deletion success!"});
        })
        .catch( (err) => {
            res.json({ error: "Error deleting availability" });
        });
    }
    else {
        res.json({ error: "Error saving availability" });
    }
});

module.exports = router;
