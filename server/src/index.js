'use strict';

const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database');
const { PORT, HOST } = require('./config');
const path = require('path');
const app = express();


//midlewars
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/user', require(path.join(__dirname, '/routers/user')));
app.use('/publication', require(path.join(__dirname, '/routers/publication')));

//server initial
app.listen(PORT, ()=>{
    console.log('\x1b[36m%s\x1b[0m',`server listening on port ${HOST}:${PORT}`);
});