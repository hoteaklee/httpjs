//user.js
const express = require('express');
const router = express.Router();
const path = require('path');

const html = 'text/html; charset=utf-8'

// show user page
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public', 'user.html'));
});
router.get('/add',(req,res) =>{
    res.type(html);
    res.end('<h1>user 가입 페이지 입니다.</h1>');
});
router.get('/view',(req,res) =>{
    res.type(html);
    res.end('<h1>user 상세정보 페이지 입니다.</h1>');
});

module.exports = router;