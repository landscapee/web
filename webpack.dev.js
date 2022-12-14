/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-08 12:12:33
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-13 14:02:35
 */

const merge = require('webpack-merge');
const argv = require('yargs').argv;
const common = require('./webpack.common.js');
const webpack = require('webpack');

let port = 8089;

if (argv.Program === 'jwxt.dev') {
    port = 8089;
};

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        host:'0.0.0.0',
        port: port,
        open: true,
        progress: true, // 打包过程中的进度条
        noInfo: false, // 隐藏bundle信息
        proxy: { // 代理
           '/api/':{
               target: `http://173.100.1.87`, //飞行区登录开发
               changeOrigin: true,
           },
            '/': {
                target: `http://173.100.1.5:8011`, //开发本地访问
                changeOrigin: true,
            },
            // '/apidev/': {
            //     target: `http://173.100.1.134:18000`, //机务本地开发
            //     changeOrigin: true,
            // },
        },
        // lazy: true, // 惰性模式
        // after(){
        //     console.log('111111111111111 webpack devServer after')
        // },
        // before(){
        //     console.log('222222222222222')
        // }
    },
    plugins: [
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),
    ]
})