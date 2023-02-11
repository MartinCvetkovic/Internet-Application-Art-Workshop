import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshop-messages',
  templateUrl: './workshop-messages.component.html',
  styleUrls: ['./workshop-messages.component.css']
})
export class WorkshopMessagesComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private userService: UserService) { }

  ngOnInit(): void {
    this.workshop = JSON.parse(localStorage.getItem('currentWorkshop'));

    this.username = JSON.parse(localStorage.getItem("user"))['username']

    this.workshopService.getAllWorkshops().subscribe((resp: Array<Workshop>)=>{
      this.allWorkshops = resp;
    });

    this.userService.getAllUsers().subscribe((resp: Array<Object>) => {
      this.allUsers = resp;
    });
  }

  allWorkshops:           Array<Workshop>;
  allUsers:               Array<Object>;

  workshop: Workshop
  username: string;

  messageText:  string;

  getPfp(username: string) {
    return this.allUsers.find((u) => {
      return u['username'] === username;
    })['image'];
  }

  sendMessage(participant) {
    let date = (new Date(Date.now() + 1 * 60 * 60 * 1000)).toISOString().slice(0, 19);

    this.workshopService.sendMessageOwner(
      this.workshop._id,
      participant,
      date,
      this.messageText,
      this.username
    ).subscribe((resp: any) => {
      for (let i = 0; i < this.workshop.chats.length; i++) {
        if (this.workshop.chats[i][0]['username'] === participant) {
          this.workshop.chats[i].push({
            "username": this.workshop.owner,
            "date": date,
            "text": this.messageText
          });
        }
      }
      this.messageText = "";
    });
  }
  
}
