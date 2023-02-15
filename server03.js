const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

const html = 'text/html; charset=utf-8'

// 요청에 대한 정적파일을 서비스하는 함수
function serveStaticFile(res, fname){
    fs.readFile(path.join(__dirname, 'public', fname), (err,data) =>{
        if (err) {  // 파일을 읽다가 오류가 발생했다면
                    // 응답코드 500 전송후 오류메세지 출력
            res.writeHead(500, {'Content-Type': html});
            return res.end('<h1>파일처리중 오류발생!!</h1>');
        }
        res.writeHead(200, {'Content-Type': html});
        res.end(data);
    })
}

// localhost:3000 요청시, 요청 path별 처리 세분화 -rauting
// 요청 path : /
// 요청 path : /user
// 요청 path : /about
// 그외 나머지 : 404 -페이지 없음

const server = http.createServer((req,res) => {
    switch (req.url){
        case '/':
            serveStaticFile(res, 'index.html');
            break;
        case '/user':
            serveStaticFile(res, 'user.html');
            break;
        case '/about':
            serveStaticFile(res, 'about.html');
            break;
        case '/500': //의도적으로  오류를 발생시켜봄
            serveStaticFile(res, '500.html');
            break;
        default:
            serveStaticFile(res, '404.html');
    }
});

server.listen(port,() =>{
    console.log('서버가 실행중... 중지하혀면 ctrl+c를 눌러주세요!');
});