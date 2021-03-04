const fs = require('fs');

// writeFile的主要参数
// 1、第一个参数为写入的文件路径
// 2、第二个参数为写入内容（可以是String|Buffer|TypeArray|DataView）
// 3、第三个参数为回调函数，传入数据为error对象，其为null时表示成功
let content = '这是要写入的文件内容'
fs.writeFile('./test.txt', content, error => {
    if(error) {
        console.log('文件写入失败:', error)
    } else {
        console.log('文件写入成功')
    }
})