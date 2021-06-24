module.exports.chatSockets = function(socketServer){
    console.log('inside chat_sockets');

    //let io = require('socket.io')(socketServer);
    const io = require('socket.io')(socketServer, {
        cors: {
          origin: "http://localhost:8000",
          credentials: true
        }
      });

    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });

        socket.on('join_room',function(data){
            console.log('joining request rec',data);
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

        //detect send message event and broadcast to everyone in the room
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })
    });
}