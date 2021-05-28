// 入口模块

const express = require('express');
// 创建主营用
const app = express();
//模版引擎的设置
app.set("view engine","html")
app.set("view",`${__dirname}/views`)
app.engine
app.listen(3000)