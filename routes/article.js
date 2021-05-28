var express = require('express');
var router = express.Router();
var MysqlPool = require('./db/mysqlPool');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/article/index');
});
router.post('/delAjax',function(req,res){
  var id = req.body.id;
  console.log(id);
  var delSql = "DELETE FROM article WHERE id = '"+id+"'"
  pool.getConnection((err,connection)=>{
    connection.query(delSql,function(err,result){
      res.json({"data":1});
      // res.json({"data":result})
    });
    connection.release();
  });
})
//ajax显示
router.post('/viewAjax',function(req,res){
  var selectSql = "select * from article"
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,function(err,result){
      console.log(result);
      res.json(result);
      
    });
    connection.release();
    
  });
})
//ajax删除功能
router.post('/delAjax',function(req,res){
  var delSql = "DELETE FROM article WHERE id = ?"
  pool.getConnection((err,connection)=>{
    connection.query(selectSql,function(err,result){
      
      // res.json({"data":result})
    });
    res.json({"status1":1});
    connection.release();
    
  });
})
// 增功能
router.get('/add', function(req, res, next) {
  res.render('admin/article/add');
});
router.post('/add',function(req,res){
  var article = {
    "title":req.body.title,
    "content":req.body.content
  }
var  addSql = 'INSERT INTO article(title,content) VALUES(?,?)';
var  addSqlParams = [1,req.body.title,req.body.content];
pool.getConnection((err,connection)=>{
  connection.query(addSql,addSqlParams,function(err,result){
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      res.end("0");//如果注册失败就给客户端返回0
      return;//如果失败了就直接return不会继续下面的代码
    }else if(result){
     console.log("OK");
     res.redirect('/admin/article')
     res.end();
    }
  });
  console.log(article);
  connection.release();
  console.log(err);
});
});
// 改功能
router.get('/edit', function(req, res, next) {
  res.render('admin/article/edit');
});


module.exports = router;