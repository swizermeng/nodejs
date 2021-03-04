const fs = require('fs');
// readFil主要参数
// 1、第一个参数为读取的文件路径
// 2、第二个参数为回调函数。回调函数传入第一个参数为error对象，其为null时表示成功。第二个参数为数据，可为String|Buffer
fs.readFile('./test.txt', (error, data) => {
    if(error) {
        console.log('文件读取失败：',error)
    } else {
        //此处因确定读取到的数据是字符串，可以直接用toString方法将Buffer转为字符串
        //若是需要传输给浏览器可以直接用buffer，机器之间通信是直接用Buffer数据
        console.log('文件读取成功', data.toString())
    }
})