import io from 'socket.io-client';
import postal from 'postal';
import store from '@store';
let src=''
if(location.port==8080 ||location.port==8089){
    src= `http://173.100.1.141:9090`
}else if(location.port==6073){
    src=`173.101.1.131:9090`
}
export let socket
export const initWebsocket = () => {
    // 建立连接
    // 监听 message 会话
     socket = io.connect(`${src}?userId=${store.getters.userInfo.id}&device=device2`);
    socket.on('message', function (data) {
        console.log(9999,data);
        postal.publish({
            channel: 'websocket_msg',
            topic: 'message',
            data: data
        });
    });
return socket
};