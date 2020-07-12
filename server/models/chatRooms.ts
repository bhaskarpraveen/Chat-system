import mongoose from 'mongoose';

let ChatRoomSchema =new  mongoose.Schema({
    name:{type:String,required:true},
    messages:[{
        user:{type:String},
        message:{type:String}
    }]
})

  let ChatRoom = mongoose.model('ChatRoom',ChatRoomSchema);
  export default ChatRoom;