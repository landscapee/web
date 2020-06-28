import io from 'socket.io-client';
import postal from 'postal';
  export const initWebsocket = () => {
     // 建立连接
    var socket = io.connect('http://173.100.1.141:9090?userId=tom123&device=device2');
    // 监听 message 会话
    socket.on('message', function (data) {
      postal.publish({
         channel: 'websocket_msg',
         topic: 'message',
         data: data
      });
    });
};