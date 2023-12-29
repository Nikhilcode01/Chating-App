
const http = require('http')
const express = require('express');
const app = express();
const port = process.env.PORT||3000
const server = http.createServer(app)
app.use(express.static(__dirname+"/public"))
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})
const io = require('socket.io')(server)
var users = {}
io.on('connection',(socket)=>{
    console.log(socket.id)
    socket.on("new-user-joined",(username)=>{
        users[socket.id] = username;
        console.log(users,username)
        socket.emit("user-connected",username)
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit('user-disconnected',user = users[socket.id]);
        delete users[socket.id]
    })
    socket.on("message",(data)=>{
        socket.broadcast.emit("message",{user:data.user,msg:data.msg})
    })
})
//Start Server
server.listen(port, () => {
    console.log(`Server Running on port 3000`)
})