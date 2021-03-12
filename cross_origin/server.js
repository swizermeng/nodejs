const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.headers.origin)
    //在实际项目中，不可以简单地设置res.setHeader('Access-Control-Allow-Origin', '*')，而是要通过req.headers.origin判断发起请求的域名是否合法，再设置Access-Control-Allow-Origin属性，以免出现安全问题。
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.write(`{"resultCode": "0000", "msg": "success"}`)
    res.end()
})

server.listen(8080)