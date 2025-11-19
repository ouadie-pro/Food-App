const express = require('express');
const Router = express.Router();
const {addUser} = require('../controller/User');

Router.post('/',addUser);

module.exports = Router;