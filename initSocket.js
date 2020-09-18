// import io from 'socket.io-client';
const io = require('socket.io-client')
import postal from 'postal';
import store from '@store';
import request from "@lib/axios.js";


export const initWebsocket = (vue) => {
    console.log(`${vue.$ip}/mms-notice/notification/getSocketInfo`)
    request({
        url: `${vue.$ip}/mms-notice/notification/getSocketInfo`,
        method: "get"
    }).then(d => {
        const src = "http://" + d.data.host + ":" + d.data.port
        // 建立连接
        // 监听 message 会话
        let socket = io(`${src}?userId=${store.getters.userInfo.id}&device=device2}`, { forceNew: true });
        // let  socket  = io.connect(`${src}?userId=${store.getters.userInfo.id}&device=device2&radom=${Math.random()}`);
        socket.on('message', function (data) {
            console.log('收到消息: ' + JSON.stringify(data))
            //只有这种类型的通知才提示弹窗
            if (data.type === 'notification') {
                postal.publish({
                    channel: 'websocket_msg',
                    topic: 'message',
                    data: data
                });
            }
        });
        //将socket对象挂到window对象上
        window.SOCKET = socket
    })
};
