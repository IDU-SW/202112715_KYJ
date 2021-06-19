const express = require('express');
const router  = express.Router();
const bookController = require('../controller/bookController');

router.get('/todo', bookController.sendTodoList); //*select
router.post('/todo/add', bookController.postTodoList); //insert
router.get('/todo/delete/:id', bookController.removeTodoList); //delete
router.post('/todo/edit/:id', bookController.editTodoList);
router.get('/', function(req,res) {
    res.render('main',{});
})

module.exports = router ;