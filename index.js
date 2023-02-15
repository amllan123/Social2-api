const express = require('express')
const app = express()
const mongoose=require('mongoose')
const dotenv=require("dotenv")
const cors=require("cors")
app.use(cors())
dotenv.config()
app.use(express.json())
mongoose.set("strictQuery",true)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Server Connected to MongoDB");
})

const authRoute=require("./routes/auth")
const postRoute= require("./routes/post")
const userRoute=require("./routes/user")
const conversationRoute=require("./routes/conversation")
const messageRoute=require("./routes/message")






app.use("/api/auth",authRoute);
app.use("/api/post",postRoute)
app.use("/api/user",userRoute)
app.use('/api/conversation',conversationRoute)
app.use("/api/message",messageRoute)













app.all('/', (req, res) => {
    res.send('Yo!')
})



const server= app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("Server Connected");
})






const socket=require("socket.io")
const io = socket(server, {
   cors: {
     origin: "http://localhost:3000",
     credentials: true,
   },
 });
 
 global.onlineUsers = new Map();

 let users = [];
 const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};




 io.on("connection", (socket) => {
   global.chatSocket = socket;
   socket.on("add-user", (userId) => {
     onlineUsers.set(userId, socket.id);
     addUser(userId, socket.id);
     io.emit("getUsers", users);
   });
 

   socket.on("send-msg", (data) => {
     const sendUserSocket = onlineUsers.get(data.to);
     if (sendUserSocket) {
       socket.to(sendUserSocket).emit("msg-recieve",data);
     }
   });

   socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

 });
