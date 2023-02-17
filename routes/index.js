//index.js
const express = require('express');
const path = require('path');
const router = express.Router();
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig');



// show index page
router.get('/',(req,res)=>{
        //res.sendFile(path.join(__dirname,'../public', 'index.html'));
        // handlebars 뷰 엔진으로 응답처리
        res.render('index', {title: 'index'});
});

router.get('/sungjuk',(req,res)=>{
        res.render('sungjuk', {title: '성적처리'});
});

router.post('/sungjuk',async (req, res, next) => {
        // 폼으로 전송된 데이터들은 req.body, req.body.폼이름 등으로 확인 가능
        //console.log(req.body)
        //console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat )
        let {name, kor, eng, mat} = req.body;
        kor = parseInt(kor);
        eng = parseInt(eng);
        mat = parseInt(mat);
        console.log(name, kor, eng, mat);

        // 성적처리
        let [tot, avg, grd] = [kor + eng + mat, (kor + eng + mat) / 3, '가'];
        if (avg >= 90) grd = '수';
        else if (avg >= 80) grd = '우';
        else if (avg >= 70) grd = '미';
        else if (avg >= 60) grd = '양';
        console.log(tot, avg, grd);

        // 데이터베이스 처리 - sungjuk 테이블에 insert
        let conn = null;
        let sql = 'insert into sungjuk ' +
            ' (sjno, name, kor, eng, mat, tot, avg, grd)' +
            ' values(sjno.nextval, :1, :2, :3, :4, :5, :6, :7)';
        let params = [name, kor, eng, mat, tot, avg, grd];

        try {
                oracledb.initOracleClient({libDir: 'C:/Java/instantclient_19_17'});
                conn = await oracledb.getConnection(dbconfig);
                let result = conn.execute(sql, params);
                await conn.commit();
                console.log(result)

        } catch (e) {
                console.log(e);
        } finally {
                if (conn) {
                        try { await conn.close(); } catch (e) {
                                console.log(e);
                                console.error(e);
                        }
                }
        }


        res.redirect(304, '/');
});



//단순한 그림파일을 화면에 표시하기 위해
// 일일히 라우팅 설정하는 것은 번거로움
// router.get('/book.png',(req,res)=>{
//         res.sendFile(path.join(__dirname,'../static/img', 'book.png'));
// });

module.exports = router;