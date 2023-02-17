//Sungjuk.js
const oracledb = require('../models/Oracle');

class Sungjuk{

    options = {  /* 셀렉트할때 이 옵션이 있어야 출력 가능함*/
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };

    selectaql = ' select sjno,name,kor,eng,mat,regdate from sungjuk ' +
                 ' order by sjno desc ';

    // 생성자 정의 - 변수 초기화
    // 즉, 매개변수로 전달된 값을 클래스 멤버변수에 대입함
    constructor(name,kor,eng,mat,tot,avg,grd) {
        this.name = name;
        this.kor = kor;
        this.eng = eng;
        this.mat = mat;
        this.tot = tot;
        this.avg = avg;
        this.grd = grd;
    }
    // 성적 저장
    async insert(){
        // 데이터베이스 처리 - sungjuk 테이블에 insert
        let conn = null;
        let sql = 'insert into sungjuk ' +
            ' (sjno, name, kor, eng, mat, tot, avg, grd)' +
            ' values(sjno.nextval, :1, :2, :3, :4, :5, :6, :7)';
        let params = [this.name, this.kor, this.eng, this.mat, this.tot, this.avg, this.grd];

        try {
            conn = await oracledb.makeConn();
            let result = conn.execute(sql, params);
            await conn.commit();
            console.log(result)

        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn(conn);
        }
    }

    //성적 전체 조회
   async select(){
        let conn = null;
        let result = null;

        try{
            conn = await oracledb.makeConn();
            result = await conn.execute(this.selectaql, [], this.options);

            let rs = result.resultSet;
            let row = null;
            while ((row = await rs.getRow())){
                result = new Sungjuk(row[1], row[2], row[3], row[4]);
                result.sjno = row[0];
                result.regdate = row[5];
            }
        }catch (e){
            console.log(e);
        }finally {
            await oracledb.closeConn(conn);
        }
        return await result;
   }

    //성적 상세조회
    selectOne(sjno) {}
}

module.exports = Sungjuk;