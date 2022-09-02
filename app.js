'use strict';
const dotEnv = require('dotenv');
const cors = require('cors');
const express = require('express');
const db = require('./database');
const { exceptionFilter } = require('./utils/helpers')
const seedingHandler = require('./database/seed')
dotEnv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
require('./routes')(app);

// Handle all Requests not handled by all designated routes
app.use((_req, _res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use(exceptionFilter);

// Establish initial database connection and then  start server
(async () => {
    try {
    // Establish mongodb connection
     await db();
    // seeding DB
    await seedingHandler();
    // Listen for requests
    app.listen(port, () => {
        console.log(`Amazing Stuff is Happening on: ${port}`);
      });
    } catch (err) {
      console.log(err);
      process.exit(1)
    }
  })();

  module.exports = app;
