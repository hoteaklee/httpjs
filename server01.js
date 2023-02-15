const http = require('http');
const port = process.env.PORT || 3000;

// localhost:3000 요청시 처리
const server = http.createServer((req,res) => {
    // 응딥헤더 작성 : 응답코드, 응답 데이터 형식 지정
    res.writeHead(200,{'Content-Type':'text/plain'});
    // 응답메세지 전송
    res.end('Hello, World!!');
});

server.listen(port,() =>{
    console.log('서버가 실행중... 중지하혀면 ctrl+c를 눌러주세요!');
});