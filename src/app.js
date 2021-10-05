const express = require('express');
const cors = require('cors');
const app = express();


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => response.json({'health-indicator':'up'}));

// enable cors
app.use(cors());
app.options('*', cors());

module.exports = app;