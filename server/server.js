const express = require('express');
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/",(req, res)=>{
    res.send("Heyyyyaaaa Hey Hey!!");    
})

io.on('connection', (socket)=>{
    console.log("User connected");
    socket.on('canvas-data', (data)=> {
        socket.broadcast.emit('canvas-data', data);
  })
})

const port = process.env.port || 5000;

server.listen(port, ()=>{
    console.log("server is running on port 5000 success");
})