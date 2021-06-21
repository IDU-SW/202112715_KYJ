const express = require('express');
const router  = express.Router();

const bookController = require('../controller/bookController');

router.get('/',bookController.getBookList);
router.get('/:id',bookController.getBook);
router.post('/', bookController.postBook);
router.put('/:id', bookController.postBookEdit);
router.delete('/:id', bookController.deleteBook);

module.exports = router ;