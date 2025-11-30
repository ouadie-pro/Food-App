const express = require('express');
const Router = express.Router();
const {addUser , addUser1 , getUser1 , deletUser} = require('../controller/User');

Router.post('/',addUser);
Router.post('/new',addUser1);
Router.get('/:id',getUser1);
Router.delete('/:id',deletUser);

module.exports = Router;