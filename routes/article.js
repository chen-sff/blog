var express = require('express');
var router = express.Router();
var MysqlPool = require('./db/mysqlPool');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();
 


// 显示
router.get('/', function(req, res, next) {
  var selectSql = "select id,title,content from article order by id asc "
    pool.getConnection((err,connect)=>{
    console.log(err);
    connect.query(selectSql,(err,rusult)=>{
    res.render('admin/article/index',{ data:rusult });
    });
  });
});

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
var update2Sql = "update article set content=replace(content,'<p>','') "
var update3Sql = "update article set content=replace(content,'</p>','') "
var  addSqlParams = [req.body.title,req.body.content];
pool.getConnection((err,connection)=>{
  connection.query(addSql,addSqlParams,function(err,result){
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      res.end("0");//如果注册失败就给客户端返回0
      return;//如果失败了就直接return不会继续下面的代码
    }else if(result){
    }
  });
  connection.release();
  console.log(err);
});
pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(update2Sql,(err,rusult)=>{
  console.log(err);
  });
});
pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(update3Sql,(err,rusult)=>{
  res.redirect("/admin/article");
  console.log(err);
  });
});
});

// 改功能
router.get('/edit/:id', function(req, res, next) {
  var selectSql = "select id,title,content from article where id = ?";
  pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(selectSql,[req.params.id],(err,rusult)=>{
  res.render('admin/article/edit',{ obj:rusult[0] });
  });
  connect.release();
});
});
router.post("/edit",(req,res)=>{
  var updateSql = "update article set title = ?,content = ? where id = ?";
  var update2Sql = "update article set content=replace(content,'<p>','') "
  var update3Sql = "update article set content=replace(content,'</p>','') "
  pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(updateSql,[req.body.title,req.body.content,req.body.id],(err,rusult)=>{
    console.log(req.body.id);
  console.log(err);
  });
  connect.release();
});
pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(update2Sql,(err,rusult)=>{
  console.log(err);
  });
});
pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(update3Sql,(err,rusult)=>{
  res.redirect("/admin/article");
  console.log(err);
  });
});
})
// 删除
router.get("/:id",(req,res)=>{
  var delSql = "DELETE FROM article WHERE id = ? ";
  pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(delSql,[req.params.id],(err,rusult)=>{
    console.log(req.params.id);
  res.redirect("/admin/article");
  console.log(err);
  console.log(rusult);
  res.end();
  });

  connect.release();

});
})


module.exports = router;