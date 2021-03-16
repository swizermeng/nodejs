const fs = require('fs')

const readStream = fs.createReadStream('./read.txt')
const writeStream = fs.createWriteStream('./write.txt')

readStream.pipe(writeStream)

readStream.on('error', err => {
    console.log(err)
})

writeStream.on('finish', () => {
    console.log('finish')
})
