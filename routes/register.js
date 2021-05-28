var express = require('express');
var router = express.Router();
var MysqlPool = require('./db/mysqlPool');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();


router.get('/', function(req, res, next) {
  res.render('register',{msg:''});
});

router.post('/',async function(req,res){
  //输出json格式
  var user = {
    "username":req.body.username,
    "password":req.body.password
  };
var selectSql = 'SELECT * FROM user WHERE username = "'+ req.body.username + '"';
var selectSqlParams = [req.body.username];
pool.getConnection((err,connection)=>{
  
  connection.query(selectSql,function(err,result){
    if(err){
      console.log(err);
    }else if(result[0]){
      console.log(result)
      res.render('register',{msg:'用户名已存在！'})
      return;
    }else{
      var  addSql = 'INSERT INTO user(username,password) VALUES(?,?)';
      var  addSqlParams = [req.body.username,req.body.password];
      pool.getConnection((err,connection)=>{
        connection.query(addSql,addSqlParams,function(err,result){
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;//如果失败了就直接return不会继续下面的代码
          }
          console.log("OK");
          res.redirect("/");
          return;
    
  });
})
    }
  })
})

  // console.log(user);
  connection.release();
  // console.log(err);



});

module.exports = router;
