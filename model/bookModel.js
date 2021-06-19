const pool = require('../db/dbConnection');

exports.getTodoList = async () => {
    const sql = 'SELECT * FROM todo order by todo_status desc';

    let conn;
    try {
        conn = await pool.getConnection();
        const [rows, metadata] = await conn.query(sql);
        conn.release();
        return rows;
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}    


exports.insertTodoList = async (todo_title, todo_content, todo_status) => {
    const sql = 'INSERT INTO todo (todo_title,todo_content,todo_status) VALUES(?,?,?)';
    const data= [todo_title, todo_content,todo_status];

    let conn;
    try {
        conn = await pool.getConnection();
        const ret = await conn.query(sql, data);
        console.log(ret);
        const todo_no = ret[0]['insertId'];
        return todo_no;
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}

exports.deleteTodoList = async(todo_no) => {
    const sql = 'DELETE FROM todo WHERE todo_no= ?';
    const data = [todo_no]; 
    let conn;
    try {
        conn = await pool.getConnection();        
        const ret = await conn.query(sql, data);
        const info = ret[0];
        console.log('삭제 대상 Row(affectedRows) :', info['affectedRows']);
        return info;
    } catch (error) {
        console.error(error);  
    } finally {
        if ( conn ) conn.release();
    }
}

exports.updateTodoListDetail = async(todo_title,todo_content,todo_no,todo_status) => {
    const sql = 'update todo set todo_status=?, todo_title=?, todo_content=? where todo_no=?';
    const data = [todo_status, todo_title, todo_content, todo_no];
    let conn;
    try{
        conn = await pool.getConnection();
        const [row, metadata] = await conn.query(sql,data);
        conn.release();
        return row;
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}