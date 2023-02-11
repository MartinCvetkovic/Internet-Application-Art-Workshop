import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private userService: UserService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user'))['username'];
    this.workshopService.getAllWorkshops().subscribe((resp: Array<Workshop>)=>{
      this.allWorkshops = resp;
      this.chatWorkshops = [];

      this.allWorkshops.forEach(workshop => {
        if (workshop.status === "active" && workshop.chats.find((c)=> {
          return c[0]['username'] === this.username;
        }) !== undefined) {
          this.chatWorkshops.push(workshop);
        }
      });

      this.canWriteChatWorkshops = this.chatWorkshops.length > 0;
    });
    
    this.userService.getAllUsers().subscribe((resp: Array<Object>) => {
      this.allUsers = resp;
    });
  }
  
  allWorkshops:           Array<Workshop>;
  chatWorkshops:         Array<Workshop>;

  username:                   string;
  canWriteChatWorkshops:     boolean;

  allUsers: Array<Object>;
  messageText: string;

  myChat(workshop: Workshop): any {
    for (const chat of workshop.chats) {
      if (chat[0]['username'] === this.username) {
        return chat;
      }
    }
    return null;
  }

  getPfp(username: string) {
    return this.allUsers.find((u) => {
      return u['username'] === username;
    })['image'];
  }

  sendMessage(workshop: Workshop) {
    let date = (new Date(Date.now() + 1 * 60 * 60 * 1000)).toISOString().slice(0, 19);

    this.workshopService.sendMessage(
      workshop._id,
      this.username,
      date,
      this.messageText
    ).subscribe((resp: any) => {
      for (let i = 0; i < workshop.chats.length; i++) {
        if (workshop.chats[i][0]['username'] === this.username) {
          workshop.chats[i].push({
            "username": this.username,
            "date": date,
            "text": this.messageText
          });
        }
      }
      this.messageText = "";
    });
  }

}
