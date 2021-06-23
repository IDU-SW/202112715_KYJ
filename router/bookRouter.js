const express = require('express');
const router  = express.Router();

const bookController = require('../controller/bookController');
const apiController = require('../controller/apiController');

//aws 
router.get('/',bookController.getBookList); // select
router.post('/', bookController.postBook); // insert
router.post('/:id', bookController.postBookEdit); //update
router.get('/delete/:id', bookController.deleteBook); //delete

//postman api
router.get('/api',apiController.getBookList); //all select
router.get('/api/:id',apiController.getBook); //one select
router.post('/api/add', apiController.postBook); //insert
router.put('/api/:id', apiController.postBookEdit); //update
router.delete('/api/:id', apiController.deleteBook); //delete

module.exports = router ;