/*
 * @Descripttion: 数据ws链接模块
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-02 17:30:40
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-03 16:31:57
 */
import postal from 'postal';
import socket from '../lib/socket';
import axios from "axios";
import {
    flight_schedule_body_data_is_update,
    get_flight_schedule_body_data,
    save_data_schedule_header_DB,
    save_data_schedule_body_DB,
    get_data_schedule_header_DB,
    get_flight_schedule_body_item,
    flight_schedule_body_data_is_del,
    get_data_schedule_body_DB,
} from '../database/fpms';
    
let token = null

axios.defaults.baseURL  =  "http://173.100.1.30/fpms/fpms-controller"
axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = token;
        config.headers['Accept'] = 'application/json';
		return config;
    },
    err => {
      return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    response=>{
        return response.data;
    }, 
    err => {
        return Promise.reject(err);
    }
);


// socket链接 channel
const ws_channel = {
    flight_info: '/flight/info', // 航班信息
    flight_dynamic: '/flight/dynamic', // 航班动态,废弃，和变更信息合并
    flight_dynamic_message: '/flight/dynamic/message', // 航班动态变更消息
    flight_operation: '/flight/operation', // 航班操作
    process_info: '/process/info', // 进程节点信息
    deviation_info: '/deviation/info', // 偏离上报信息
    flight_control: '/flight/control', // 航班管控
    user_info_login: '/user/info/login', // 用户登录
    user_info_logout: '/user/info/logout', // 用户登出
}

export const init = (data) => {
    token = data.token
    //使用http获取航班数据
    axios.get("/monitor/findFlightMonitorHeaderAndProcessMonitorHeader")
    .then(async res =>{
        await save_data_schedule_header_DB(res.data);
        const datas = await get_data_schedule_header_DB();
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_header',
            data: datas
        });
    })

    axios.get("/monitor/findFlightMonitorBodyAndProcessMonitorBody")
    .then(async res =>{
        await save_data_schedule_body_DB(res.data);
        const datas = await get_data_schedule_body_DB();
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_body',
            data: datas
        });
    })


    const getDataSocket = new socket('http://173.100.1.30',token,{
        forceNew: true,
        path: '/websocket/socket.io',
        query:{
            Authorization:token
        },
        transports: ['websocket']
    });
    getDataSocket.socket_start(() => {
        getDataSocket.socket_on(ws_channel.flight_info, async data => {//航班信息
            console.log('航班信息', data);
            await flight_schedule_body_data_is_update(data.data,'flight_info');
            const datas = await get_data_schedule_body_DB();
            postal.publish({
                channel: 'web.fpms',
                topic: 'flight_schedule_data_body',
                data: datas
            });
            
        });
        getDataSocket.socket_on(ws_channel.flight_dynamic_message, async data => {//航班动态变更消息
            if(!data.data)return false
            let item = await get_flight_schedule_body_item(data.data)
            if(!item)return false//航班存在在更新
            let value = _.get(item,data.data.code)
            if(value==undefined)return false//航班该字段存在
            console.log('航班动态变更消息', data);
            await flight_schedule_body_data_is_update(data.data.flight,'flight_dynamic');//更新DB
            const datas = await get_data_schedule_body_DB();
            postal.publish({
                channel: 'web.fpms',
                topic: 'flight_dynamic_message_update',
                data: data.data
            });
            postal.publish({
                channel: 'web.fpms',
                topic: 'flight_schedule_data_body',
                data: datas
            });
            
        });

        getDataSocket.socket_on(ws_channel.flight_operation, async data => {//航班操作
            console.log('航班操作', data);
            if(data.option=="delete"){
                await flight_schedule_body_data_is_del(data.data,'flight_operation');
            }
            if(data.option=="update"){
                await flight_schedule_body_data_is_update(data.data,'flight_operation');
            }

            const datas = await get_data_schedule_body_DB();
            postal.publish({
                channel: 'web.fpms',
                topic: 'flight_schedule_data_body',
                data: datas
            });
        });
        getDataSocket.socket_on(ws_channel.process_info, async data => {//进程节点信息
            console.log('进程节点信息', data);

            let item = await get_flight_schedule_body_item(data.data)
            if(!item)return false//航班存在在更新


            const datas = await get_flight_schedule_body_data();
            postal.publish({
                channel: 'web.fpms',
                topic: 'process_info_update',
                data: datas
            });
            
        });
        getDataSocket.socket_on(ws_channel.deviation_info, async data => {//偏离上报信息
            console.log('偏离上报信息', data);
        });
        getDataSocket.socket_on(ws_channel.flight_control, async data => {//航班管控
            console.log('航班管控', data);
            await flight_schedule_body_data_is_update(data.data,'flight_control');
            const datas = await get_data_schedule_body_DB();
            postal.publish({
                channel: 'web.fpms',
                topic: 'flight_schedule_data_body',
                data: datas
            });
            
        });
        // 用户登录
        getDataSocket.socket_on(ws_channel.user_info_login, data => {
            // console.log('socket用户登录', data);
            postal.publish({
                channel: 'web.fpms',
                topic: 'online_users_data_is_update',
                data: {
                    list: [data.data],
                    type: 'add'
                }
            });
        });
        // 用户登出
        getDataSocket.socket_on(ws_channel.user_info_logout, data => {
            // console.log('socket用户登出', data);
            postal.publish({
                channel: 'web.fpms',
                topic: 'online_users_data_is_update',
                data: {
                    list: [data.data],
                    type: 'delete'
                }
            });
        });
    })
    //使用http获取航班数据

};

