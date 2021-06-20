const express = require('express');
const router  = express.Router();
const bookController = require('../controller/bookController');

router.get('/',bookController.getBookList);
router.post('/', bookController.postBook);
router.post('/:id', bookController.postBookEdit);

module.exports = router ;