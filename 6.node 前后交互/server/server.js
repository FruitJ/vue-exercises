// 导入依赖模块
const http = require("http");
const url = require("url");
const fs = require("fs");
const Xml2js = require("xml2js"); // 处理 xml 格式数据的三方模块
const multiparty = require("multiparty"); // 处理文件上传的三方模块
const { v4: uuidv4 } = require("uuid"); // 生成通用唯一识别码【这里主要为了防止上传的文件重名的问题】

let static = (path, res) => { // 返回静态的 stream 响应资源【通用方法】
    fs.promises.readFile(path).then((result) => {
        res.write(result);
        res.end();
    }).catch((err) => {
        console.log(err);
    });
};
let callback = (req, res) => { // 访问本地 3000 端口的所有请求均走本控制器【回调】 

    let uri = req.url;
    let path = url.parse(uri, true);
    let pathName = path.pathname;
    let ct = req.headers["content-type"];
    let data = '';

    if (pathName === "/" || pathName === "/index.html") { // 当用户访问 根路径或者 /index.html 时
        static("./html/index.html", res);
    } else {
        if (req.method === 'GET' && pathName === "/testGetController") { // 此时 GET 请求时
            console.log(`GET 请求参数为: ↓↓↓`);

            console.log(path.query); // 接收 GET 请求参数
            res.write(JSON.stringify({
                status: 0,
                description: '已成功接收前台 GET 请求参数!'
            }));
            res.end();
        } else if (req.method === 'POST' && pathName === "/testPOSTController") {
            console.log(`POST 请求参数为: ↓↓↓`);
            if(ct.includes("multipart/form-data")) {
                
               let form = new multiparty.Form({ uploadDir: "./source"});
               form.parse(req, function(err, fields, files) { // 解析请求报文, 在数据流中截取各个表单域的数据
                    if(!err) {
                        console.log(fields); // 上传的文本域的数据对象
                        console.log(files); // 上传的媒体域的数据对象
                        let keys = Object.keys(files);
                        let sizes = []; // 存储上传文件大小的集合
                        keys.forEach((item, index) => {
                            files[item].forEach((item, index) => {
                                sizes.push(item.size); // 存储上传文件的大小
                                let suffix = item.originalFilename;
                                suffix = suffix.substring(suffix.lastIndexOf(".") + 1); // 拿到上传文件后缀名
                                fs.promises.rename(item.path, `./source/${ uuidv4() }.${ suffix }`).then((res) => { // 将数据流写入到文件中并重命名
                                    console.log('文件名更新成功');
                                }).catch((err) => {
                                    console.log('文件名更新失败');
                                });
                            })
                        });
                        console.log(sizes); // 上传文件大小
                    }else {
                        console.log('请求报文解析有误 !');
                        
                        console.log(err);
                    }
               }); 
                res.write(JSON.stringify({
                    status: 0,
                    description: '已成功接收前台 POST 请求参数!'
                }));
                res.end();
                return;
            }

            req.on('data', (chunk) => { // http 请求尤其是 POST 系的请求在传输数据流的时候多为数据包的形式, 一段段的传输, 所以不能保证此处已经全部接收请求数据, 故需要拼接参数保全数据。
                data += chunk;
            });
            req.on('end', () => {
                
                switch (ct) {
                    case 'application/x-www-form-urlencoded':
                        console.log(JSON.parse(data)); // 接收 POST 请求参数
                        break;
                    case 'application/json':
                        console.log(JSON.parse(data));
                    break;
                    case 'text/xml':
                        console.log(data);
                        let parster = new Xml2js.Parser({
                            explicitArray: false,
                            ignoreAttrs: false,
                        });
                        parster.parseString(data, (err, res) => {
                            console.log(res.root);
                        });
                    break;
                    default:
                        console.log('其他格式 ...');
                    break;
                }
                res.write(JSON.stringify({
                    status: 0,
                    description: '已成功接收前台 POST 请求参数!'
                }));
                res.end();
            });
            
        } else {
            static(`.${pathName}`, res);
        }
    }
};
// 创建服务
const server = http.createServer(callback);
server.listen(3000, 'localhost'); // 监听本地 3000 端口 