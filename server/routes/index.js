const express = require('express');

const router = express.Router();

const holdingsController = require('../controllers/holdingsController.js');

// router.get('/login', loginController);
// create new user (DB)
// authenticate user (DB)

// My portfolio
// get users stocks/qty (DB)
router.get('/holdings/:id', holdingsController.getHoldings, (req, res) => {
    res.status(200).send(res.locals.holdings);
  })
// post/patch/delete updated qtys (DB)
// get current closing price for all ticker symbols (API)

// Add Friend
// post new friend (DB)

// View friends
// get friends (DB)

// Share post

// Newsfeed

// Log Out

// OAuth

module.exports = router;
