const http = require('http');
const querystring = require('querystring');
const url = require('url');
const { URL } = url

const server = http.createServer((req, res) => {
    // 处理数据有三种方式
    // 1、将请求数据中的req.url进行字符串切割，在用querystring模块获取数据
    // const [pathname, queryStr] = req.url.split('?');
    // const query = querystring.parse(queryStr)
    // console.log('pathname:',pathname)
    // console.log('query:',query)

    // 2、用URL构造函数实例化一个url对象，从中获取到pathname和search值，在用querystring模块解析search数据
    // const url = new URL(`http:localhost:8080${req.url}`)
    // const {pathname, search} = url
    // const query = querystring.parse(search.substring(1, search.length))
    // console.log('pathname:',pathname)
    // console.log('query:',query)


    // 3、使用url模块的parse方法，直接解析出数据
    const {pathname, query} = url.parse(req.url, true)
    console.log('pathname:',pathname)
    console.log('query:',query)

})

server.listen(8080)