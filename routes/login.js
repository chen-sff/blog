var express = require('express');
var router = express.Router();
var MysqlPool = require('./db/mysqlPool');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();


router.get('/', function(req, res, next) {
  res.render('login',{msg:''});
});

router.post('/',function(req,res){
  //输出json格式
  var user = {
    "username":req.body.username,
    "password":req.body.password
  };
var selectSql = "select username,password from user where username = '"+req.body.username+"' and password = '"+req.body.password+"'";
var  addSqlParams = [req.body.username,req.body.password];
pool.getConnection((err,connection)=>{
  connection.query(selectSql,addSqlParams,function(err,result){
    if(err){
        console.log('[login ERROR] - ',err.message);
        return;
       }
    if(result==''){
        res.render('login',{msg:'登录失败！用户名或密码错误'})
       }
    else{
        console.log("OK");
        req.session.name = result[0].username;
        console.log(req.session.name);
        res.redirect('/index');
        res.end();
       }  
  });
  console.log(user);
  connection.release();
  console.log(err);

});
});

module.exports = router;