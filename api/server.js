'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/healthcheck', require('./routes/index').router);
app.use('/login', require('./routes/login').router);
app.use('/books', require('./routes/books').router);
app.use('/authors', require('./routes/authors').router);

const path = require('path')

app.use('/', express.static(path.join(__dirname, '../build')))

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

module.exports = app;
