// import socket from '@lib/websocket';
// const socketConfigs = [
// 	{
// 		name: 'schedule',
// 		host: location.hostname,
// 		port: location.port,
// 		channel: 'api/service-base-push/endpointWisely',
// 		headers: {
// 			userId:'tom',
// 			device:'device2'
// 		},
// 	},
// ];
// var mySocket = null;
// export const initWebsocket = () => {
// 	if (mySocket) {
// 		return;
// 	}
// 	mySocket = socket(socketConfigs);
// };
// export const registSockChannel = (name, channel, callback) => {
// 	if (!mySocket) {
// 		return;
// 	}
// 	mySocket.regist(name).then((client) => {
// 		client.sub(`/topic/${channel}`, (d) => {
// 			if (callback) {
// 				callback(d);
// 			}
// 		});
// 	});
// };
import io from 'socket.io-client';
  export const initWebsocket = () => {
     // 建立连接
    var socket = io.connect('http://173.100.1.141:9090?userId=tom&device=device2');
    // 监听 news 会话
    socket.on('message', function (data) {
       console.log(data);
    });
};