

## 前言

根据大佬 https://github.com/yucccc/vue-mall 的前端页面修改 
做的一款医药商城  目前还在继续修改中

## 技术栈

vue2 + vuex + vue-router + webpack + ES6 + axios + sass 

## 关于接口数据
自己写的后端 接口暂时还没上传 等待后续

## 关于部署

使用 nginx 做反向代理，解决跨域问题.

1. 先在服务器安装 Nginx.
2. 上传nodejs代码.
- 把上传通过各种方式(命令行或者ftp)上传到服务器 进入目录下安装node依赖(与本地开发并无区别)
- 使用pm2启动 此时会打开一个端口 假设 3333
- 此时node已运行在服务端
3. 将打包后的前端静态文件dist目录上传到服务器
4. 配置反向代理
- 找到Nginx配置文件，如果不知道在哪,可以上百度搜一下有命令提示
- 一般默认是在 ``/usr/local/nginx/conf/nginx.conf``
- 修改配置 找到 server 如图

![nginx配置](./demo/nginx.conf.png)
- 重启 ``/usr/local/nginx/sbin/nginx -s reload``

## 项目运行

```shell
git clone https://github.com/LandingGuys/yymall/

cd vue-mall

cnpm i

npm run dev

## 说明

- 如果对您有帮助，您可以点右上角 "Star" 支持一下 十分感谢!
- 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR



## 目标功能

- [x] 登陆、登出功能
- [x] 注册
- [x] 加入、删除、修改购物
- [x] 新增、修改、删除收货地址
- [x] 下单功能
- [x] 支付功能 -- 
- [x] 商品详情
- [x] 个人中心
- [x] 订单列表
- [x] 更换头像 -- 

## 相关链接
[XMall-Front](https://github.com/Exrick/xmall-front) 
基于该项目改造一套更完整的流程 作者[Exrick](https://github.com/Exrick)

[]

## 项目布局

```txt
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 打包文件
├── src                                         // 源码目录
│   ├── api                                     // 请求接口
│   ├── common                                  // 公共组件
│   ├── components                              // 组件
│   ├── page                                    // 页面
│   │   └── Cart                                // 购物车
│   │   └── Checkout                            // 提交订单
│   │   └── Goods                               // 商品
│   │       ├── goods                           // 商品列表
│   │       ├── goodsDetails                    // 商品详情
│   │   └── Home                                // 主页
│   │   └── Login                               // 登陆
│   │   └── Order                               // 订单
│   │       ├── order                           // 商品列表
│   │       ├── payment                         // 提交订单
│   │       ├── paysuccess                      // 提交成功
│   │   └── User                                // 个人中心
│   │       ├── children
│   │       │   ├── addressList                 // 地址列表
│   │       │   ├── information                 // 个人信息
│   │       │   └── order                       // 订单列表
│   │   └── index.vue                           // 主页
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

```

