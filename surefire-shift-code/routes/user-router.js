const express   = require('express');
const bcrypt    = require("bcrypt");
const passport  = require("passport");

const router    = express.Router();

const UserModel = require("../models/user-model");


// ROUTES ----------------------------------------------------------

// Sign up Form ----------------------------------------------------
router.get("/signup", (req, res, next) => {
    if (req.user) {
        res.redirect("/");
    }
    res.render("user-views/user-signup");
});
// ------------------------------------------------------------------
// Process sign up form ---------------------------------------------
router.post("/process-signup", (req, res, next) => {
    // If the password is less than 8 characters
    // and has special characters, return an error.
    if (req.body.signupPassword.length < 8 ||
        req.body.signupPassword.match(/[^a-z0-9]/i) === null) {
            res.locals.errorMessage = "Password is invalid";
            res.render("user-views/user-signup");
            return;
    }
    // Check to see if email exists. If yes, return an error.
    UserModel.findOne({email: req.body.signupEmail})

      .then( (userFromDb) => {

          if(userFromDb !== null) {
              res.locals.errorMessage = "Sorry, this email is already registered.";
              res.render("user-views/user-signup");
              return;
          }
          // Encrypt user's password
          const salt = bcrypt.genSaltSync(10);
          const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

          // Register the new user
          const theUser = new UserModel ({
              fullName: req.body.signupFullName,
              email: req.body.signupEmail,
              encryptedPassword: scrambledPassword,
              shift: req.body.signupShift,
              restDay: req.body.signupRestDay,
              rank: req.body.signupRank
          });

          return theUser.save();
      })
      // Redirect to home page after signup was successful
      .then( () => {
          res.redirect("/");
      })

      .catch( (err) => {
          next(err);
      });

});
// ----------------------------------------------------------------------------

module.exports = router;
