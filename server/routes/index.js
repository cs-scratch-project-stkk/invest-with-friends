const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const holdingsController = require('../controllers/holdingsController.js');
const updateStocksController = require('../controllers/updateStocksController.js');

// router.get('/login', loginController);
// create new user (DB)
// authenticate user (DB)
router.post('/signup', userController.signup, (req, res) => {
  const success = res.locals.createUserSuccess;
  const code = success ? 200 : 400;
  return res.sendStatus(code);
});

// My portfolio
// get users stocks/qty (DB)
router.get('/holdings/:id', holdingsController.getHoldings, (req, res) => {
    res.status(200).send(res.locals.holdings);
  })
// post/patch/delete updated qtys (DB)
// get current closing price for all ticker symbols currently in database (API)
router.get('/closingPrice', updateStocksController.getTickers, updateStocksController.getClosingPrice, (req, res) => {
  res.sendStatus(200);
})
// Add Friend
// post new friend (DB)

// View friends
// get friends (DB)

// Share post

// Newsfeed

// Log Out

// OAuth

module.exports = router;
