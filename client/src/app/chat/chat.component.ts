import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionServiceService } from '../connection-service.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username:String;
  room:String;
  messages=[];
  // private isTyping = false;
  constructor(private router:Router,private route:ActivatedRoute,private myservice:ConnectionServiceService) {
    this.room= this.route.snapshot.paramMap.get('room');
    console.log(this.room)
    this.username=this.route.snapshot.paramMap.get('username');
    this.joinRoom(this.room); 
    this.getMessages(); 
    this.myservice.newMessageReceived().subscribe(data => {
      this.messages.push(data);
      // this.isTyping=false;
    });
    // this.myservice.receivedTyping().subscribe(bool => {
    //   this.isTyping = bool.isTyping;
    // });
    
  }

   getMessages(){
   this.myservice.getMessages(this.room).subscribe(
    data=>{
      this.messages=data['messages'];
    },
    error=>{
      console.log(error.message)
    }
   )
 

  
  }

  ngOnInit() {
  
    
  
  }

  joinRoom(room){
    this.myservice.joinRoom({room:room});
  }

  sendMessage(message){
    this.myservice.sendMessage({room:this.room,user:this.username,message:message});
   
  }
  // typing() {
  //   console.log('typing...')
  //   this.myservice.typing({room: this.room, user: this.username});
  // }

}
