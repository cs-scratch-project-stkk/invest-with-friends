const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const holdingsController = require('../controllers/holdingsController.js');
const updateStocksController = require('../controllers/updateStocksController.js');
const relationshipsController = require('../controllers/relationshipsController');

const validator = require('../middleware/validator');


router.post('/signup', userController.signup, (req, res) => {
  return res.status(200).json(res.locals.createdUser);
});

router.post('/login', userController.login, (req, res) => {
  return res.status(200).json(res.locals.existingUser);
})

// My portfolio
// get users stocks/qty (DB)
router.get('/getHoldings/:id', holdingsController.getHoldings, (req, res) => {
    return res.status(200).send(res.locals.holdings);
  })
  
 // get friend's stocks/qty (DB)
router.get('/getFriendHoldings/:id', holdingsController.getFriendHoldings, (req, res) => {
  return res.status(200).send(res.locals.holdings);
})

// post updated qtys (DB)
router.post('/addHolding', validator.addHolding, holdingsController.addHolding, (req, res) => {
  return res.status(200).send(res.locals.holdings);
  })

  // patch updated qtys (DB)
router.patch('/updateHolding', holdingsController.updateHolding, (req, res) => {
  return res.status(200).send(res.locals.holdings);
})

// delete updated qtys (DB)
router.delete('/deleteHolding', holdingsController.deleteHolding, (req, res) => {
  return res.status(200).send(res.locals.holdings);
})

// get current closing price for all ticker symbols (API)
router.patch('/closingPrice/:id', updateStocksController.getTickers, updateStocksController.getClosingPrice, (req, res) => {
  return res.status(200).send(res.locals.holdings);
})

// Add Friend
// post new friend (DB)
router.post('/addRelationship', relationshipsController.addRelationship, (req, res) => {
  return res.status(200).send(res.locals.relationships);
})

// View friends
// get friends (DB)
router.get('/relationships/:id', relationshipsController.getRelationships, (req, res) => {
  return res.status(200).send(res.locals.relationships);
})

// Share post

// Newsfeed

// Log Out

// OAuth

module.exports = router;
