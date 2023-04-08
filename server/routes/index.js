const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const holdingsController = require('../controllers/holdingsController.js');

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
router.post('/addHolding', holdingsController.addHolding, (req, res) => {
    const success = res.locals.addHoldingSuccess;
    const code = success ? 200 : 400;
    return res.sendStatus(code);
  })

router.patch('/updateHolding', holdingsController.updateHolding, (req, res) => {
    const success = res.locals.updateHoldingSuccess;
    const code = success ? 200 : 400;
    return res.sendStatus(code);
})

router.delete('/updateHolding', holdingsController.updateHolding, (req, res) => {
    const success = res.locals.deleteHoldingSuccess;
    const code = success ? 200 : 400;
    return res.sendStatus(code);
})
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
