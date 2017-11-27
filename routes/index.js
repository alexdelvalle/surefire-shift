const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// ABOUT page ------------------------------------------------------------
router.get('/about', (req, res, next) => {
  res.render('general-views/learn-more');
});

module.exports = router;
