const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const date = require('date-and-time');
const { getTodoList, insertTodoList, deleteTodoList, updateTodoListDetail } = require('../model/bookModel');
const bookModel = require('../model/bookModel');

exports.getBookList = async (req, res) => {
    try {
        const bookList = await bookModel.selectBookList();
        const data = { data: bookList, count: bookList.length };
        console.log('book', bookList);

        res.render('../views/main', {
            msg: 'success',
            books: bookList
        });
    } catch (error) {
        console.log('Error: ', error);
    }

}

exports.postBook = async (req, res) => {

    console.log(req.body);
    const book_title = req.body.book_title;
    const book_content = req.body.book_content;
    const book_authors = req.body.book_authors;
    const book_date_original = moment(req.body.book_date);
    const book_date = book_date_original.format('YYYY-MM-DD');
    console.log("book_date : ", book_date);
    const book_publisher = req.body.book_publisher;
    const book_price = req.body.book_price;
    const data = [book_title, book_content, book_authors, book_date, book_publisher, book_price];
    console.log('data : ', data);

    // 입력 에러 처리
    if (!book_title || !book_content) {
        res.sendStatus(400);
        console.log("no insert");
        return;
    }

    try {
        const book_no = await bookModel.insertBook(data);
        console.log('ret ;', book_no);

        res.redirect('/');
        
    } catch (error) {
        console.log('Error: ', error);
    }
};

exports.postBookEdit = async (req, res) => {
    const book_no = req.params.id;
    const book_title = req.body.book_title;
    const book_content = req.body.book_content;
    const book_authors = req.body.book_authors;
    const book_date_original = moment(req.body.book_date);
    const book_date = book_date_original.format('YYYY-MM-DD');
    console.log("book_date : ", book_date);
    const book_publisher = req.body.book_publisher;
    const book_price = req.body.book_price;
    const data = [book_title, book_content, book_authors, book_date, book_publisher, book_price, book_no];
    console.log(book_no);
    console.log(data);
    
    try {
        const book = await bookModel.updateBook(data);
        res.redirect('/');
    } catch (error) {
        console.log('Error: ', error);
    }
}

