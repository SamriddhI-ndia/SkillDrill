const express =require('express');
const http =require('http');
const {Server} =require('socket.io');
const ACTIONS =require('./src/components/mainWindow/Actions');

const app =express();
const server = http.createServer(app);
const io = new Server(server);
const rooms = [];
let theSocketId = "";

const {collection, roomCollection, feedbackCollection} = require("./mongo")
const cors = require('cors');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
async function callDb(clients, roomId) {
    const checkRoom = await roomCollection.findOne({roomId:roomId},{_id:0})
        console.log("checkRoom", checkRoom)
        if(checkRoom) {
            console.log("present in db")
            await roomCollection.updateMany({roomId:roomId}, {$set: {client:clients}})
        }
        else {
            console.log("not in db")
            await roomCollection.insertMany({roomId:roomId, client:clients})
        }
}
app.get("/login", async(req, res)=>{
    const data=[]
    // console.log("Email", email)
    await collection.find({}, (err, val) => {
        val.forEach((name) => {
          data.push(name)
        });
      }).clone().catch(function(err){ console.log(err)})
      res.json(data)
})

app.post("/login", async(req,res)=>{
    const {email, password}=req.body
    try{
        const checkEmail =await collection.findOne({email:email})
        console.log("checkEmail",checkEmail)
        if(checkEmail)
        {
            const checkPassword =await collection.findOne({$and: [{email: email},
            {password: password}]})
            if(!checkPassword)
            {
                res.json("incorrect password")
            }
            else
            {
                console.log("Exist");
                res.json("exist")
            }
        }
        else {
            console.log("NotExist");
            res.json("notExist")
        }
    }
    catch (e) {
        res.json(e)
    }
})

app.post("/signup", async(req,res)=>{
    const {email, password, username}=req.body;
    const data={
        email:email,
        password:password,
        username:username
    }
    try{
        const checkEmail =await collection.findOne({email:email})
        const checkUserName = await collection.findOne({username:username});
        if(checkEmail)
        {
            res.json("Already exist")
        }
        else if(checkUserName)
        {
            res.json("username exist")
        }
        else {
            res.json("notExist")
            await collection.insertMany([data])
        }
    }
    catch (e) {
        res.json(e)
    }
})

app.get("/report/:id", async(req,res)=>{
    const room = req.params.id;
    const users = await roomCollection.findOne({roomId:room},{_id:0, roomId:0})
    res.json(users)
})

app.post("/feedback", async(req, res)=>{
    const data = req.body;
    console.log(req.body)
    console.log("feedback",data)
    const interviewee = data.to;
    try {
        const checkForUser=await feedbackCollection.findOne({to:interviewee})
        console.log("checkForUser",checkForUser)
        if(checkForUser) {
            await feedbackCollection.updateMany({to:interviewee}, {$push:{info:data.info}})
            
        }
        else {
            await feedbackCollection.insertMany({to:data.to, info:[data.info]})
        }
        res.json("Successful")
    }
    catch (e) {
        res.json("error");
    }
})

app.get("/reportCard/:id", async(req,res)=>{
    const user = req.params.id;
    console.log("user", user);
    const data = await feedbackCollection.findOne({to:user},{_id:0})
    console.log("look", data)
    res.json(data.info)
})

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username:userSocketMap[socketId][0],
            status:userSocketMap[socketId][1]
        }
    });
}

io.on('connection', (socket)=>{
    console.log('socket connected');
    socket.on(ACTIONS.JOIN, ({roomId, username, socketId, isInterviewee})=>{
        // console.log('status', isInterviewee)
        userSocketMap[socket.id] = [username, isInterviewee];
        if(rooms[roomId])
        rooms[roomId].push({username, socketId});
        else {
            rooms[roomId]=[];
            rooms[roomId].push({username, socketId});
        }
        theSocketId=socketId;
        socket.join(roomId);
        socket.to(roomId).emit("peer-joined", {socketId, username});
        const clients = getAllConnectedClients(roomId);
        console.log(clients);
        socket.emit("get-roomId", {
            roomId:roomId
        })
        callDb(clients, roomId);
        
        rooms[roomId].forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
                rooms:rooms,
                clients: rooms[roomId],
                username,
                socketId
                
            })
        })
    });

    socket.on(ACTIONS.WHITEBOARD_CHANGE, ({roomId, canvasImage})=>{
        console.log("yaaahhhhaaaaaa");
        //console.log(canvasImage);
        socket.in(roomId).emit(ACTIONS.WHITEBOARD_CHANGE, { canvasImage });
    })

    socket.on(ACTIONS.SYNC_WHITEBOARD, ({ socketId, canvasImage }) => {
        io.to(socketId).emit(ACTIONS.WHITEBOARD_CHANGE, { canvasImage });
    })

    socket.on(ACTIONS.CODE_CHANGE, ({roomId,code})=>{
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    })

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', ({peerId, roomId})=>{
        // const rooms = [...socket.rooms];
        // rooms.forEach((roomId)=>{
        //     socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        //         socketId: theSocketId,
        //         username: rooms[roomId].
        //     })
        // })
        // delete userSocketMap[theSocketId];
        if(rooms[roomId]){
        rooms[roomId]=rooms[roomId].filter((el)=>el.roomId!=roomId);
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: peerId,
                    username: rooms[roomId].username,
                })
            }
        //socket.leave();
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));