const express = require('express');
const router = express.Router();
const path = require('path');


// show about page
router.get('/',(req,res)=>{
   // res.sendFile(path.join(__dirname,'../public', 'about.html'));
    res.render('about', {title: 'about'});
});

module.exports = router;