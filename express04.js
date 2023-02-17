const express = require('express');
const path = require('path');
const logger = require('morgan');  // 로그 출력기
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser'); // 폼 처리기

// 라우터 외부 작성
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');

const app = express();
const port = process.env.PORT || 3000;

// view 템플릿 엔진 설정
app.engine('hbs', engine({
    extname:'.hbs', defaultLayout: 'layout',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

// 라우팅을 거치치 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname, 'static')));

//로그 설정
app.use(logger('dev'));

// 미들웨어 등록 및 설정
app.use(express.json());
//전송된 폼 데이터에 대한 urlencoding 위한 설정
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());     //전송된 폼 데이터는 json형식
//app.use(bodyParser.text());     //enctype이 text/paain일때 필요 (비추~)


// index에 대한 route handler 지정
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);

// 404 처리
app.use((req,res) =>{
    res.status(404);
    res.sendFile(path.join(__dirname,'public', '404.html'));
});

// 500처리
app.use((err,req,res,next) =>{
    console.log(err);
    res.status(500);
    res.sendFile(path.join(__dirname,'public', '500.html'));
});


app.listen(port,() =>{
    console.log('express 서버가 실행중... 중지하혀면 ctrl+c를 눌러주세요!');
});