var express = require('express');
var router = express.Router();
var  MysqlPool = require('./db/mysqlPool');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();


router.get('/:id', function(req, res, next) {
    console.log(req.params.id);
var selectSql = "select title,content from article where id = "+req.params.id+" order by title asc "
pool.getConnection((err,connect)=>{
  console.log(err);
  connect.query(selectSql,(err,rusult)=>{
    res.render('article',{ data:rusult });
    });
  });
});



module.exports = router;