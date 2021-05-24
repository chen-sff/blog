/**
 * 入口模块
 */
const express = require('express')
const session = require('cookie-session')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// 创建主应用
const app = express()

// 上传配置
const upload = multer({
    dest: './static/upload', // 上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 * 2 // 单个文件大小限制在2M以内
    }
})

// ejs  模板引擎的设置
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('ejs').renderFile)

// 静态资源配置
app.use(express.static('static'))

// POST请求处理
app.use(express.urlencoded({ extended: true }))

// SESSION配置
app.use(session({
    keys: ['secret'],
    maxAge: 1000 * 60 * 30 //30分钟
}))

// SESSION延期
app.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
})

// 调用首页子应用
app.use('/index', require('./router/index'))
app.use('/', require('./router/index'))

// 调用文章子应用
app.use('/article', require('./router/article'))
// 调用搜索子应用
app.use('/search', require('./router/search'))
// 调用登录子应用
app.use('/login', require('./router/login'))
// 调用注册子应用
app.use('/register', require('./router/register'))

// 进入后台的权限验证
app.use('/admin/?*', require('./middleware/auth').allowToAdmin)

// 上传操作
app.post('/admin/*', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})

// 调用后台首页
app.use(/\/admin\/(index)?/, require('./router/admin/index'))
// 调用后台文章管理
app.use('/admin/article', require('./router/admin/article'))
// 调用后台类目管理
app.use('/admin/category', require('./router/admin/category'))
// 调用后台日志管理
app.use('/admin/log', require('./router/admin/log'))
// 调用后台账户管理
app.use('/admin/account', require('./router/admin/account'))

// 退出操作
app.get('/user/logout', (req, res) => {
    req.session.user = null
    res.render('login', { msg: '退出成功' })
})

// 监听服务器
app.listen(3000)