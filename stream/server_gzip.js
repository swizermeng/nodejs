const http = require('http')
const fs = require('fs')
const url = require('url')
const zlib = require('zlib')

const server = http.createServer((req, res) => {
    const {
        pathname
    } = url.parse(req.url, true)

    const filePath = `.${pathname}`
    fs.stat(filePath, err => {
        if (err) {
            console.error(err)
            res.setHeader('content-encoding', 'identity')
            res.writeHead(404)
            res.write('Not Found')
            res.end()
        } else {
            const readStream = fs.createReadStream(`.${filePath}`)
            const gzip = zlib.createGzip()
            res.setHeader('content-encoding', 'gzip')

            readStream.pipe(gzip).pipe(res)

            readStream.on('error', err => {
                console.error(err)
                res.setHeader('content-encoding', 'identity')
                res.writeHead(404)
                res.write('Not Found')
                res.end()
            })
        }
    })
})

server.listen(8080)