const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);
    fs.readFile(`/www${req.url}`, (error, data) => {
        if(error) {
            res.statusCode = 404;
            res.write('Not Found')
        } else {
            res.write(data)
        }
        res.end()
    })
})
server.listen(8080)