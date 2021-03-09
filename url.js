const url = require('url')

const str = 'https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4'

console.log(url.parse(str))
// 打印结果如下
// Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: null,
//     host: 'www.google.com:8080',
//     port: '8080',
//     hostname: 'www.google.com',
//     hash: null,
//     search: '?x=1&y=2&y=3&y=4',
//     query: 'x=1&y=2&y=3&y=4',
//     pathname: '/a/b',
//     path: '/a/b?x=1&y=2&y=3&y=4',
//     href: 'https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4'
// }

// 如果需要将query参数转为对象，则可以为url.parse函数的第二个参数传true
console.log(url.parse(str, true))
// 打印结果如下
// Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: null,
//     host: 'www.google.com:8080',
//     port: '8080',
//     hostname: 'www.google.com',
//     hash: null,
//     search: '?x=1&y=2&y=3&y=4',
//     query: [Object: null prototype] {
//         x: '1',
//         y: ['2', '3', '4']
//     },
//     pathname: '/a/b',
//     path: '/a/b?x=1&y=2&y=3&y=4',
//     href: 'https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4'
// }

// 可以通过构造函数URL，创建一个实例
const urlObj = new URL(str)
console.log('urlObj:', urlObj)
console.log(urlObj.toString()) //https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4
// urlObj: URL {
//     href: 'https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4',
//     origin: 'https://www.google.com:8080',
//     protocol: 'https:',
//     username: '',
//     password: '',
//     host: 'www.google.com:8080',
//     hostname: 'www.google.com',
//     port: '8080',
//     pathname: '/a/b',
//     search: '?x=1&y=2&y=3&y=4',
//     searchParams: URLSearchParams {
//         'x' => '1', 'y' => '2', 'y' => '3', 'y' => '4'
//     },
//     hash: ''
// }