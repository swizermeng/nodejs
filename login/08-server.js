const http = require('http');
const querystring = require('querystring');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let method = req.method
    let path = ''
    let get = {}
    let post = {}

    if(method == 'GET') {
        const {pathname, query} = url.parse(req.url, true)
        path = pathname
        get = query
        complete()
    } else if(method == 'POST') {
        path = req.url
        let arr = []
        req.on('data', buffer => {
            arr.push(buffer)
        })
        req.on('end', () => {
            const buffer = Buffer.concat(arr)
            post = buffer
            complete()
        })
    }
    function complete() {
        try {
            if(path == '/reg') {
                const {username, password} = get
                fs.readFile('./users.json', (err, data) => {
                    if(err) {
                        res.writeHead(404)
                    } else {
                        let users = JSON.parse(data.toString())
                        let usernameIndex = users.findIndex(item => {
                            return username == item.username
                        })
                        if(usernameIndex >= 0) {
                            res.write(JSON.stringify({
                                error:1,
                                msg: '该账户已注册，请直接登录'
                            }))
                            res.end()
                        } else {
                            users.push({
                                username,
                                password
                            })
                            fs.writeFile('./users.json', JSON.stringify(users), err => {
                                if(err) {
                                    res.writeHead(404)
                                } else {
                                    res.write(JSON.stringify({
                                        error:0,
                                        msg: '注册成功'
                                    }))
                                    res.end()
                                }
                            })
                        }
                    }
                })
            } else if(path == '/login') {
                let users = JSON.parse(data.toString())
                let usernameIndex = users.findIndex(item => {
                    return username == item.username
                })
                if(usernameIndex >= 0) {
                    if(password == users[usernameIndex].password) {
                        res.write(JSON.stringify({
                            error: 0,
                            msg: '登陆成功'
                        }))
                    } else {
                        res.write(JSON.stringify({
                            error: 1,
                            msg: '密码错误'
                        }))
                    }
                } else {
                    res.write(JSON.stringify({
                        error: 1,
                        msg: '该账号向未注册'
                    }))
                }
                res.end()
            } else {
                fs.readFile(`.${path}`, (err, data) => {
                    if(err) {
                        res.writeHead(404)
                    } else {
                        res.write(data)
                    }
                    res.end()
                })
            }
        } catch(error) {
            console.error(error)
        }
    }
})

server.listen(8080)