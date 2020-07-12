import express from 'express';
import mongoose from 'mongoose'
import socketIo from 'socket.io';
require('dotenv').config();
const app = express();
import cors from 'cors'
import ChatRoom from './models/chatRooms';
const port = process.env.PORT || 3000;
const db = process.env.DATABASE_URL || 'mongodb://localhost:27017/chatsystem';
mongoose.connect(db ,{ useFindAndModify: false  },()=>{
    console.log('Connected to Db!!')
})

app.use(cors());
app.get('/',(req,res)=>{
    res.send('hello')
})

app.get('/room/:name',async function(request,response){
    const {name}=request.params;
    const messages = await ChatRoom.findOne({name:name})
    return response.status(200).json(messages)
})
const server = app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})

const Io = socketIo(server);

Io.sockets.on('connection',(socket)=>{
    socket.on('join',async (data)=>{
        socket.join(data.room);
        const FindRoom = await ChatRoom.countDocuments({name:data.room});
    
        if(!FindRoom){
            let newRoom = new ChatRoom({
                name:data.room
            })
            newRoom.save().catch(err=>console.log(err.message))
        }  
    })
    socket.on('message',async(data)=>{
        Io.in(data.room).emit('new message',{user:data.user,message:data.message});
        await ChatRoom.findOneAndUpdate({name:data.room},{$push:{messages:{user:data.user,message:data.message}}})
    })


})