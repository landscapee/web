/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-08 12:12:43
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-08 14:45:49
 */
const merge = require('webpack-merge');
const argv = require('yargs').argv;
const common = require('./webpack.common.js');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    mode:'development',
    plugins: [
        // 压缩js
        new UglifyjsWebpackPlugin(),
        // 版权声明，添加到打包输出后的js代码之前
        new webpack.BannerPlugin('Qin Xiao'),
        // 打包前清除打包目录下的文件，但不删除打包目录
        new CleanWebpackPlugin(),
    ]
})