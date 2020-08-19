// import io from 'socket.io-client';
const io = require('socket.io-client')
import postal from 'postal';
import store from '@store';
 let src=''
if(location.port==8080 ||location.port==8089){
    src= `http://173.100.1.141:9090`
}else if(location.port==6073){
    src=`http://173.101.1.130:9090`
}
 export const initWebsocket = (q) => {
    // 建立连接
    // 监听 message 会话
      let  socket  = io(`${src}?userId=${store.getters.userInfo.id}&device=device2}`,{ forceNew: true });
      // let  socket  = io.connect(`${src}?userId=${store.getters.userInfo.id}&device=device2&radom=${Math.random()}`);

     socket.on('message', function (data) {
         if(typeof data=='string'){
               localStorage.setItem('socketId', data);
         }
        postal.publish({
            channel: 'websocket_msg',
            topic: 'message',
            data: data
        });
    });
     return socket
 };