const http = require('http')
const url = require('url')
const fs = require('fs')
const mysql = require('mysql')

// 1、连接服务器
const connection = mysql.createConnection({
    connectionLimit: 10, //建立的链接数量，默认为10个
    host: 'localhost', //地址
    port: '3306', //端口号，默认3306
    user: 'root', //登录名
    password: '123456', //密码
    database: 'test' //连接的数据库
})

// 2、与HTTP模块配合使用
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setContentType("application/json;charset=utf-8")
    const {pathname, query} = url.parse(req.url, true)
    console.log(pathname, query)
    if(pathname == '/reg') {
        const {username, password} = query
        if(!username || !password) {
            res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
            res.write(JSON.stringify({
                error:1,
                code: 1,
                msg: '用户名或密码不可为空'
            }))
            res.end()
        } else if(username.length > 32) {
            res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
            res.write(JSON.stringify({
                error: 1,
                code: 2,
                msg: '用户名长度不可超过32位'
            }))
        } else if(password.length > 32) {
            res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
            res.write(JSON.stringify({
                error: 1,
                code: 3,
                msg: '密码长度不可超过32位'
            }))
        } else {
            //检查用户名是否已存在
            connection.query(`SELECT ID FROM user_table WHERE username="${username}"`, (err,data) => {
                if(err) {
                    res.writeHead(200,{"content-type": "application/json;charset=utf-8"})
                    res.end()
                } else {
                    if(data.length) {
                        res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
                        res.write(JSON.stringify({
                            error: 1,
                            code: 4,
                            msg: '用户已存在'
                        }))
                        res.end()
                    } else {
                        connection.query(`INSERT INTO user_table (username, password) VALUES('${username}', '${password}')`, (err, data) => {
                            if(err) {
                                res.writeHead(200,{"content-type": "application/json;charset=utf-8"})
                                res.end()
                            } else {
                                res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
                                res.write(JSON.stringify({
                                    error: 0,
                                    code: 5,
                                    msg: '注册成功'
                                }))
                                res.end()
                            }
                        }) 
                    }
                }
            })
        }
    } else if(pathname == '/login') {
        const arr = []

        req.on('data', buffer => {
            arr.push(buffer)
        })
        req.on('end',() => {
            let buffer = Buffer.concat(arr)

            const post = JSON.parse(buffer.toString())

            const {username, password} = post

            connection.query(`SELECT ID FROM user_table WHERE username='${username}'`, (err, data) => {
                if(err) {
                    console.log(err)
                } else {
                    if(!data.length) {
                        res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
                        res.write(JSON.stringify({
                            error: 1,
                            code: 6,
                            msg: '用户名或密码错误'
                        }))
                        res.end()
                    } else if(data[0].password !== password) {
                        res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
                        res.write(JSON.stringify({
                            error:1,
                            code: 7,
                            msg: '密码不正确'
                        }))
                        res.end()
                    } else {
                        res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
                        res.write(JSON.stringify({
                            error: 0,
                            code: 8,
                            msg: '登陆成功'
                        }))
                    }
                }
            })
        })
    } else {
        fs.readFile(`.${pathname}`, (err,data) => {
            if(err) {
                res.writeHead(404)
                res.write(data)
            } else {
                res.write(data)
            }
            res.end()
        })
    }
})

server.listen(8081)