const http = require('http')
const fs = require('fs')
const bufferSplit = require('./bufferSplit')


const server = http.createServer((req, res) => {
    console.log('headers', req.headers['content-type'])
    const boundary = `--${req.headers['content-type'].split('; ')[1].split('=')[1]}` // 获取分隔符
    console.log('boundary', boundary)
    let arr = []

    req.on('data', (buffer) => {
        arr.push(buffer)
    })

    req.on('end', () => {
        let buffer = Buffer.concat(arr)

        console.log(buffer.toString())

        // 1 用分隔符切分数据
        let result = bufferSplit(buffer, boundary)
        console.log(result.map(item => item.toString()))
        // 2 删除数组头尾数据
        result.pop()
        result.shift()
        console.log(result.map(item => item.toString()))
        // 3 将每一组数据头尾的\r\n删除
        result = result.map(item => item.slice(2, item.length - 2))
        console.log(result.map(item => item.toString()))
        // 4 将每一项数据中间的\r\n删除,得到最终数据
        result.forEach(item => {
            console.log(bufferSplit(item, '\r\n\r\n').map(item => item.toString()))

            let [info, data] = bufferSplit(item, '\r\n\r\n') // 数据中含有文件信息，保持为Buffer类型
            console.log('info:', info)
            console.log('data:', data)
            info = info.toString()  //info为字段信息，这是字符串类型数据，直接转换成字符串，若为文件信息，则数据中含有一个回车符\r\n，可以据此判断数据为文件还是为普通数据。

            if (info.indexOf('\r\n') >= 0) { // 若为文件信息，则将Buffer转为文件保存
                //获取字段名
                let infoResult = info.split('\r\n')[0].split('; ')
                let name = infoResult[1].split('=')[1]
                name = name.substring(1, name.length - 1)
                // 获取文件名
                let filename = infoResult[2].split('=')[1]
                filename = filename.substring(1, filename.length - 1)
                console.log('name:', name, 'filename:', filename)
                //将文件存储到服务器
                fs.writeFile(`./upload/${filename}`, data, err => {
                    if (err) {
                        console.log('文件上传失败:' + err)
                    } else {
                        console.log('文件上传成功')
                    }
                })
            } else { // 若为数据，则直接获取字段名称和值
                let name = info.split('; ')[1].split('=')[1]
                name = name.substring(1, name.length - 1)
                const val = data.toString()
                console.log('name:', name, 'val:', val)
            }
        })
    })
})

server.listen(8080)