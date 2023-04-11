const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const holdingsController = require('../controllers/holdingsController.js');
const updateStocksController = require('../controllers/updateStocksController.js');
const relationshipsController = require('../controllers/relationshipsController');


router.post('/signup', userController.signup, (req, res) => {
  return res.status(200).json(res.locals.createdUser);
});

router.post('/login', userController.login, (req, res) => {
  return res.status(200).json(res.locals.existingUser);
})

router.post('/login', userController.login, (req, res) => {
  return res.status(200).json(res.locals.existingUser);
})

// My portfolio
// get users stocks/qty (DB)
router.get('/holdings/:id', holdingsController.getHoldings, (req, res) => {
    res.status(200).send(res.locals.holdings);
  })
  
  
// post updated qtys (DB)
router.post('/addHolding', holdingsController.addHolding, (req, res) => {
    const success = res.locals.addHoldingSuccess;
    const code = success ? 200 : 400;
    return res.sendStatus(code);
  })

  // patch updated qtys (DB)
router.patch('/updateHolding', holdingsController.updateHolding, (req, res) => {
    const success = res.locals.updateHoldingSuccess;
    const code = success ? 200 : 400;
    return res.sendStatus(code);
})

// delete updated qtys (DB)
router.delete('/updateHolding', holdingsController.updateHolding, (req, res) => {
    const success = res.locals.deleteHoldingSuccess;
    const code = success ? 200 : 400;
    return res.sendStatus(code);
})



// get current closing price for all ticker symbols (API)
router.patch('/closingPrice', updateStocksController.getTickers, updateStocksController.getClosingPrice, (req, res) => {
  const success = res.locals.updateClosingPriceSuccess;
  const code = success ? 200 : 400;
  return res.sendStatus(code);
})

// Add Friend
// post new friend (DB)
router.post('/addRelationship', relationshipsController.addRelationship, (req, res) => {
  const success = res.locals.addRelationshipSuccess;
  const code = success ? 200 : 400;
  return res.sendStatus(code);
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
