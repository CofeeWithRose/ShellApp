// 注意：引入的方式
// 引入koa
const koa = require('koa');
const app = new koa();

const static = require('koa-static');
const cors = require('koa2-cors');


app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
        //     return "*"; // 允许来自所有域名请求
        // }
        // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
        return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 配置静态web服务的中间件
app.use(static(__dirname+'/static'));

                
// 监听端口≈
app.listen(3300,function(){
    console.log('启动成功', 'http://localhost:3300');
});