const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const date = require('date-and-time');
const bookModel = require('../model/bookModel');


exports.getBookList = async (req, res) => {

    const bookList = await bookModel.selectBookList();
    console.log(bookList);

    if(bookList.length > 0){
        res.render('../views/main',{
            msg: 'book select list success',
            data: bookList
        });
    } else {
        res.send({
            msg: 'book select list fail'
        });
    }

}

exports.postBook = async (req, res) => {
    console.log(req.body);
    const book_title = req.body.book_title;
    const book_content = req.body.book_content;
    const book_authors = req.body.book_authors;
    const book_date = req.body.book_date;
    const book_publisher = req.body.book_publisher;
    const book_price = req.body.book_price;

    const data = [book_title, book_content, book_authors, book_date, book_publisher, book_price];


    const book_no = await bookModel.insertBook(data);
    console.log(book_no);

    if(book_no > 0){
        const book = await bookModel.selectBook(book_no);
        res.redirect('/');
    } else {
        res.send({
            msg: 'book insert fail'
        });
    }
};

exports.postBookEdit = async (req, res) => {
    const book_no = req.params.id;
    const book_title = req.body.book_title;
    const book_content = req.body.book_content;
    const book_authors = req.body.book_authors;
    const book_date = req.body.book_date;
    const book_publisher = req.body.book_publisher;
    const book_price = req.body.book_price;
    const data = [book_title, book_content, book_authors, book_date, book_publisher, book_price, book_no];

    const ret = await bookModel.updateBook(data);

    if(ret){
        res.redirect('/');
    } else {
        res.send({
            msg: 'book edit fail'
        });
    }
}

exports.deleteBook = async(req, res) => {
    const book_no = req.params.id;
    console.log('deleteBook : ',book_no);
    const ret = await bookModel.deleteBook(book_no);

    if(ret){
        res.redirect('/');
    } else {
        res.send({
            msg: 'book delete fail'
        });
    }
}