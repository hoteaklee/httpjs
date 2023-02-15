const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');

const app = express();
const port = process.env.PORT || 3000;
const html = 'text/html; charset=utf-8';

// index에 대한 route handler 지정
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);




app.listen(port,() =>{
    console.log('express 서버가 실행중... 중지하혀면 ctrl+c를 눌러주세요!');
});