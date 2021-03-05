const http = require('http');
const querystring = require('querystring');
const url = require('url');

const server = http.createServer((req, res) => {
    let method = req.method
    let path = ''
    let get = {}
    let post = {}
    if(method === 'GET') {
        const {pathname, query } = url.parse(req.url, true)
        path = pathname
        get = query
        complete()
    } else if(method === 'POST') {
        path = req.url
        let bufferArray = []
        req.on('data', buffer => {
            bufferArray.push(buffer)
        })
        req.on('end', () => {
            const buffer = Buffer.concat(bufferArray)
            post = querystring.parse(buffer.toString())
            complete()
        })
    }
    function complete() {
        console.log(method)
        console.log(path)
        console.log(get)
        console.log(post)
    }
})

server.listen(8080)

