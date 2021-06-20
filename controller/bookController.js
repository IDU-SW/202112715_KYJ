const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const date = require('date-and-time');
const {getTodoList, insertTodoList, deleteTodoList, updateTodoListDetail } = require('../model/bookModel');
const bookModel = require('../model/bookModel');

exports.getBookList = async (req, res) => {
    const data = await bookModel.selectBookList();
    console.log('book',data);
    res.render('../views/main', {
        books:data
    });
    
}

exports.postBook = async (req, res) => {
    console.log(req.body);
    const book_title = req.body.book_title;
    const book_content = req.body.book_content;
    const book_authors = req.body.book_authors;
    const book_date_original = moment(req.body.book_date);
    const book_date = book_date_original.format('YYYY-MM-DD');
    console.log("book_date : ",book_date);
    const book_publisher = req.body.book_publisher;
    const book_price = req.body.book_price;
    const data= [book_title, book_content,book_authors,book_date,book_publisher,book_price];
    console.log('data : ',data);
    // 입력 에러 처리
    if ( !book_title || !book_content )  {
        res.sendStatus(400);
        console.log("Not insert");
        return;
    }

    
    const book_no = await bookModel.insertBook(data);
    console.log('ret ;', book_no);

    res.redirect('/');
};

exports.removeTodoList = async (req, res) => {
    const todo_no = req.params.id;
    console.log(todo_no);
    const todoId = await deleteTodoList(todo_no);
    if(!todo_no){
        console.log("Not delete");
      };
      res.redirect("/todo");
}

exports.editTodoList = async(req,res) => {
    const todo_no = req.params.id;
    const todo_title = req.body.todo_title;
    const todo_content = req.body.todo_content;
    const todo_status = req.body.todo_status;
    console.log(todo_no);
    console.log(todo_status);
    const result = await updateTodoListDetail(todo_title,todo_content,todo_no,todo_status);
    res.redirect('/todo');
}