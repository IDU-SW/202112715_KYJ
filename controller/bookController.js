const express = require('express');
const bodyParser = require('body-parser');
const {getTodoList, insertTodoList, deleteTodoList, updateTodoListDetail } = require('../model/bookModel');

exports.sendTodoList = async (req, res) => {
    const data = await getTodoList();
    res.render('index', {
        todo:data
    });
    
}

exports.postTodoList = async (req, res) => {
    console.log(req.body);
    const bobo = req.body;
    const aaa = JSON.stringify(bobo);
    console.log(aaa);
    const todo_title = req.body.todo_title;
    const todo_content = req.body.todo_content;
    const todo_status = req.body.todo_status;
    console.log('todo_title',todo_title);
    // 입력 에러 처리
    if ( !todo_title || !todo_content || !todo_status)  {
        res.sendStatus(400);
        console.log("Not insert");
        return;
    }

    
    const todoId = await insertTodoList(todo_title, todo_content, todo_status);
    console.log('ret ;', todoId);

    res.redirect('/todo');
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