var express = require('express');
var router = express.Router();
var MysqlPool = require('./db/mysqlPool');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();


router.get('/', function(req, res, next) {
var selectSql = "select id,title,content from article order by title asc "
pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(selectSql,(err,rusult)=>{
    res.render('index',{ data:rusult });
    });
  });
});
router.get('/ser', function(req, res, next) {
  var searchSql = "select id,title,content from article  "
  pool.getConnection((err,connect)=>{
    console.log(err);
    connect.query(searchSql,[req.query.id,req.query.title,req.query.content],(err,rusult)=>{
      console.log(req.query.keyword);
      res.render('search',{ data:rusult[0]});

      });
    });
  });

  router.get('/search', function(req, res, next) {
    var searchSql = "select id,title,content from article where title like'%"+req.query.keyword+"%'"
    pool.getConnection((err,connect)=>{
      connect.query(searchSql,(err,rusult)=>{
        if(err){
          console.log(err);
        }
        
        res.render('index',{ data:rusult});
  
        });
      });
    });





module.exports = router;
