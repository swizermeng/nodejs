const fs = require('fs')
const zlib = require('zlib')

const readStream = fs.createReadStream('./1.jpg')
const writeStream = fs.createWriteStream('./1.jpg.gz')

const gzip = zlib.createGzip()

readStream.pipe(gzip).pipe(writeStream)

readStream.on('error', err => {
    console.log(err)
})

writeStream.on('finish', () => {
    console.log('finish')
})
