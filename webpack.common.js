/*
 * @Descripttion:
 * @version:
 * @Author: xdh.ss
 * @Date: 2020-04-08 12:12:15
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-13 16:55:58
 */

const path = require('path');
const argv = require('yargs').argv;
const _ = require('lodash');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('vue-html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

let html_webpack_plugin;
let indexJs = './index.js';


const HtmlWebpackPluginConfig = {
    title: '',
    template: path.resolve(__dirname, './index.hbs'),
    filename: 'index.html',
    vue: true,
    hash: true
}
html_webpack_plugin = new HtmlWebpackPlugin(_.extend(HtmlWebpackPluginConfig, {title: '机务系统'}));
indexJs = './index.js';
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, indexJs)
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].chunk.js',
        publicPath: '/',
        globalObject: 'this',
    },
    module: {
        rules: [

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('lib'), resolve('workerRegist.js'), resolve('index.js')]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('src/ui/icons')],
                options: {
                  symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.scss|.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: (loader) => [
                                    require('postcss-plugin-px2rem')({
                                        rootValue: 14, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                                        //unitPrecision: 5, //允许REM单位增长到的十进制数字。
                                        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                                        //propBlackList: [], //黑名单
                                        exclude: /static|plugin/i ,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                                        //selectorBlackList: [], //要忽略并保留为px的选择器
                                        //ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                                        //replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                                        mediaQuery: true,  //（布尔值）允许在媒体查询中转换px。
                                        //minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                                    }),
                                ],
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: [resolve('src/ui/icons')],
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]',
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    {loader: 'handlebars-loader'}
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                exclude: [resolve('src/ui/icons')]
            }
        ]
    },
    node:{
        fs: "empty"
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'[name].styles.css',
            allChunks:true
        }),
        // 添加静态资源打包
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),

        new VueLoaderPlugin(),
        html_webpack_plugin,
        new webpack.DefinePlugin({
            PROGRAM: JSON.stringify(argv.Program)
        }),
    ],
    resolve: {
        // modules: ['node_modules', 'src', 'static', 'worker'],
        extensions:['.js','.vue'], // 后缀省略设置
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '@lib': resolve('lib'),
            '@store': resolve('src/ui/store'),
            '@router': resolve('src/ui/router'),
            '@static': resolve('static'),
            '@components': resolve('src/ui/components'),
            '@views': resolve('src/ui/views'),
        }
    }
}
