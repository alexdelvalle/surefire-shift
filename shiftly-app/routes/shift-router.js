const express      = require('express');
const bcrypt       = require("bcrypt");
const passport     = require("passport");


const router       = express.Router();

// const UserModel    = require("../models/user-model");
// const ShiftModel   = require("../models/shift-model");


// ROUTES ---------------------------------------------------------------------
router.get("/dashboard", (req, res, next) => {
    res.render("shift-views/dashboard");

});
// ----------------------------------------------------------------------------

module.exports = router;
