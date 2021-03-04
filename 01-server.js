// 引入node自带的http模块
const http = require('http')
// 引入node自带的child_process模块
const child_process = require('child_process')

const hostname = '127.0.0.1' //本机地址
const port = 3000  // 端口号

// 创建一个服务器
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write('a \n')
    res.write('b \n')
    res.write('c \n')
    res.end('hello world \n')
})

// 开始监听
server.listen(port, hostname, () => {
    // 在命令行打印运行结果
    console.log(`server running at: ${hostname}:${port}`)
    // 使用默认浏览器打开地址
    child_process.exec(`start http://${hostname}:${port}/`)
})
