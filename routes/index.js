var express = require('express');
var router = express.Router();
var MysqlPool = require('./db/mysqlPool');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();


router.get('/', function(req, res, next) {
var selectSql = "select title,content from article order by title asc "
pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(selectSql,(err,rusult)=>{
    res.render('index',{ data:rusult });
    });
  });
});



module.exports = router;
