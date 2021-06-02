const mysql = require('mysql');


class MysqlPool {
  constructor(){
    this.flag = true;
    this.pool = mysql.createPool({
      host:'127.0.0.1',
      user:'root',
      password:'123456',
      database:'myblog',
      port:3306
    });
  }
  getPool(){
    if(this.flag){
      this.pool.on('connection', (connection)=>{
        connection.query('SET SESSION auto_increment_increment=1');
        this.flag = false;
      });
    }
    return this.pool;
  }  
}
//通过使用 this.flag 判断是否需要 connection，如果是第一次连接，则返回 pool，如果不是第一次，则不需要返回。
module.exports = MysqlPool;