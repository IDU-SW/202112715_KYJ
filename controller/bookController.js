const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const date = require('date-and-time');
const bookModel = require('../model/bookModel');


exports.getBook = async (req, res) => {
    const book_no = req.params.id;
    const book = await bookModel.selectBook(book_no);

    if(book){
        res.send({
            msg: 'select success',
            data: book
        });
    } else {
        res.send({
            msg: 'select fail'
        });
    }
}

exports.getBookList = async (req, res) => {

    const bookList = await bookModel.selectBookList();
    console.log(bookList);

    if(bookList.length > 0){
        res.render('../views/main',{
            msg: 'select list success',
            data: bookList
        });
    } else {
        res.send({
            msg: 'select list fail'
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

    // 입력 에러 처리
    if (!book_title) {
        res.sendStatus(400);
        console.log("no insert");
        return;
    }

    const book_no = await bookModel.insertBook(data);
    console.log(book_no);

    if(book_no > 0){
        const book = await bookModel.selectBook(book_no);
        res.send({
            msg: 'insert success',
            data: book
        });
    } else {
        res.send({
            msg: 'insert fail'
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

    // 입력 에러 처리
    if (!book_title) {
        res.sendStatus(400);
        console.log("no insert");
        return;
    }
    
    const ret = await bookModel.updateBook(data);

    if(ret){
        const book = await bookModel.selectBook(book_no);
        res.send({
            msg: 'update success',
            data: book
        });
    } else {
        res.send({
            msg: 'book fail'
        });
    }
}

exports.deleteBook = async(req, res) => {
    const book_no = req.params.id;
    console.log('deleteBook : ',book_no);
    const ret = await bookModel.deleteBook(book_no);

    if(ret){
        res.send({
            msg: 'delete success',
            data: book_no
        });
    } else {
        res.send({
            msg: 'delete fail'
        });
    }
}