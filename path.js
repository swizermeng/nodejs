const path = require('path')

const str = './root/a/b/1.txt'

console.log(path.dirname(str)) // 获取文件目录 ./root/a/b/1.txt
console.log(path.basename(str)) // 获取文件名 1.txt
console.log(path.extname(str)) // 获取文件名后缀
console.log(path.resolve(str, '../c', '../..','build', 'assets')) //path.resolve方法，它可以接收任意个参数，然后根据每个路径参数之间的关系，将路径最终解析为一个绝对路径。
console.log(path.resolve(__dirname, 'build')) //__dirname指的是当前模块所在的绝对路径名称，它的值会自动根据当前的绝对路径变化，等同于path.dirname(__filename)的结果。