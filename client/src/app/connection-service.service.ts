import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {
  private backend="http://127.0.0.1:3000"
  private socket = io(this.backend)
  constructor(private http:HttpClient) { }


  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  joinRoom(data){
    this.socket.emit('join',data);

  }

  sendMessage(data){
    this.socket.emit('message',data);

  }

  getMessages(room){
    let data= this.backend+'/room/'+room
    return this.http.get(data)
  }

  // typing(data) {
  //   this.socket.emit('typing', data);
  // }

  // receivedTyping() {
  //   const observable = new Observable<{ isTyping: boolean}>(observer => {
  //     this.socket.on('typing', (data) => {
  //       observer.next(data);
  //       console.log(data)
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }

}
