const http  = require('http');
const app = require('./app');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);


const port = process.env.API_PORT || 3000


io.on('connection', (socket) => {
    console.log('Client connected');
  
    socket.on('message_from_flutter', (data) => {
      console.log('message_from_flutter:', data);
      message = {
        "user_name": `${data.user_name}`,
        "user_img": `${data.user_img}`,
        "message": `${data.message}`,
        "time": new Date(),
      }
      io.emit('message_from_server',message);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

server.listen(port,()=>{
    console.log(`Sever running on port ${port}`);
})

