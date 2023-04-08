const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const router = require('./routes/index');

// import controller objects containing middleware functions

app.use(express.json());

app.use('/api', router);

// global error handling
app.use((err, req, res, next) => {
  console.log(err);
  return res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
