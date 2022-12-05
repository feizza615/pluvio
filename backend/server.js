const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
require('dotenv').config();

const app = express();
const admin_app = express();
const admin_port = 8888;
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

admin_app.use(cors());
admin_app.use(express.json())

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connected to database');
});

admin_app.get('/convert?index=:id', (req, res) => {
    res.send('Hello World!')
  })

admin_app.listen(admin_port, () => {
    console.log(`Server on port: ${admin_port}`)
})

const usersRouter = require('./routes/users')
app.use('/users',usersRouter);

const reviewsRouter = require('./routes/reviews')
app.use('/reviews',reviewsRouter);

app.listen(port, () => {
    console.log(`Server on port: ${port}`)
})


const io = new Server({ 
    cors:{
        origin:"http://localhost:3000"
    }
 });

 let onlineUsers = []

 const addNewUser = (username, socketId) => {
    // !onlineUsers.some((user) => user.username === username) && 
    console.log("Generating socketId: |" + socketId + "|, for " + username.name + "\n\n")
    username = username.name;
    onlineUsers.push({username, socketId});
 }

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
}

const getUser = (usernames) => {
    console.log("getting user: " + usernames)
    let userHold = onlineUsers.find((user) => user.username === usernames);
   if(userHold){
        console.log("Returning: " + userHold.socketId);
        return userHold
   } else {
    return;
   }
    
    // return onlineUsers.find((user) => user.username === usernames);
}

io.on("connection", (socket) => {
    
    socket.on("newUser", (username)=> {
        addNewUser(username, socket.id)
    });

socket.on("sendNotification", ({senderName, receiverName, type})=> {


    console.log("Sender: " +senderName + "\nReceiver: " +receiverName)
    const receiver = getUser(receiverName)
   if(receiver !== undefined){
    io.to(receiver.socketId).emit("getNotification", {
        senderName,
        type,
    });
}

});

  socket.on("disconnect", () => {
    console.log("deleting socketId: |" + socket.id + "|\n\n")
    removeUser(socket.id);
  })
});

io.listen(5002);

