const express   = require('express');
const bcrypt    = require("bcrypt");
const passport  = require("passport");

const router    = express.Router();

const UserModel = require("../models/user-model");


// ROUTES ---------------------------------------------------------------------

// Sign up Form ---------------------------------------------------------------
router.get("/signup", (req, res, next) => {
    if (req.user) {
        res.redirect("/");
    }
    res.render("user-views/user-signup");
});
// ----------------------------------------------------------------------------
// Process sign up form -------------------------------------------------------
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
              reliefDay: req.body.signupReliefDay,
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
// Email Login
router.get("/login", (req, res, next) => {
    if (req.user) {
        res.redirect("/dashboard");
        return;
      }
    res.render("user-views/user-login");
});
// ----------------------------------------------------------------------------
// Process login form
router.post("/process-login", (req, res, next) => {

    // Check to see if user email exists
    UserModel.findOne( {email: req.body.loginEmail} )
      .then( (userFromDb) => {

          // If user email does not exist, show error
          if(userFromDb === null) {
              res.locals.errorMessage = "Wrong Email!";
              res.render("user-views/user-login");
              return;
          }

          const passwordSuccess = bcrypt.compareSync(req.body.loginPassword, userFromDb.encryptedPassword);

          // If password is incorrect, show error
          if (passwordSuccess === false) {
            res.locals.errorMessage = "Wrong password! Try again.";
            res.render("user-views/user-login");

            return;
          }

          req.login(userFromDb, (err) => {
              if (err) {
                  next(err);
              }
              else {
                  res.redirect("/dashboard");
              }
          });
      })

      .catch( (err) => {
          next(err);
      });
});

//-----------------------------------------------------------------------------
// User Profile
router.get("/my-profile/:userId", (req, res, next) => {
    // redirect to log in if there is no logged in user
    if (req.user === undefined) {
        res.redirect("/login");

        return;
    }

    res.render("user-views/user-profile");
});

// Step 2: receive edit submission
router.post("/my-profile/:userId", (req, res, next) => {

  UserModel.findById(req.params.userId)
    .then((userFromDb) => {
      (userFromDb).set({
        fullName: req.body.editFullName,
        photoUrl: req.body.photoImage,
        phoneNumber: req.body.editNumber,
        badgeNumber: req.body.editBadge,
        rank: req.body.editRank,
        shift: req.body.editShift,
        reliefDay: req.body.editRDay,
        station: req.body.editStation,
        district: req.body.editDistrict,
    });
    res.locals.currentUser = userFromDb;

    return userFromDb.save();
  })
  .then( () => {
    res.redirect(`/my-profile/${req.params.userId}`);
  })
  .catch( (err) => {
    if (err.errors) {
      res.locals.validationErrors = err.errors;
      res.render("user-views/user-profile");
    }
    else {
      next(err);
    }
  });
});


// ----------------------------------------------------------------------------
// Facebook Login

// Link to Facebook
// router.get("/facebook/login", passport.authenticate("facebook"));
//
// // Redirect based on success/failure
// router.get("/facebook/success",
//   passport.authenticate("facebook", {
//       successRedirect: "/",
//       failureRedirect: "/login"
//   })
// );
// ----------------------------------------------------------------------------
// Google Login

// Link to Google
// router.get("/google/login",
//   passport.authenticate("google", {
//       scope: [
//           "https://www.googleapis.com/auth/plus.login",
//           "https://www.googleapis.com/auth/plus.profile.emails.read"
//       ]
//   })
// );
//
// // Redirect based on success/failure
// router.get("/google/success",
//   passport.authenticate("google", {
//       successRedirect: "/",
//       failureRedirect: "/login",
//   })
// );
// ----------------------------------------------------------------------------
// Log Out
router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
});
// ----------------------------------------------------------------------------

module.exports = router;
