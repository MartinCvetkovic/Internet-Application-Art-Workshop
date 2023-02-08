import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Comment } from '../models/comment';
import { Workshop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.css']
})
export class WorkshopDetailsComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer, private workshopService: WorkshopService, private userService: UserService) { }

  ngOnInit(): void {
    this.workshop = JSON.parse(localStorage.getItem('currentWorkshop'));
    this.likes = this.workshop.likes;

    this.image_1 = this.workshop.images.at(0);
    this.image_2 = this.workshop.images.at(1);
    this.image_3 = this.workshop.images.at(2);
    this.image_4 = this.workshop.images.at(3);
    this.image_5 = this.workshop.images.at(4);

    const map_url = "https://www.google.com/maps/embed/v1/place?q=" + this.workshop.place + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
    this.place_url = this.sanitizer.bypassSecurityTrustResourceUrl(map_url);

    this.signedUp = false;
    this.username = JSON.parse(localStorage.getItem("user"))['username']
    this.workshop.participants.forEach(p => {
      if (p.username === this.username) {
        this.signedUp = true;
      }
    });

    this.workshopService.getAllWorkshops().subscribe((resp: Array<Workshop>)=>{
      this.allWorkshops = resp;
      this.allActiveWorkshops = [];
      this.allWorkshops.forEach(workshop => {
        if (workshop.status === "active"
        && workshop.participants.find((p)=> {
          return p.username === this.username && p.status === "active";
        }) !== undefined
        && (new Date(workshop.date)).getTime() < Date.now()) {
          this.allActiveWorkshops.push(workshop);
        }

        this.attendedBefore = this.hasAttendedBefore();
      });
    });

    this.userService.getAllUsers().subscribe((resp: Array<Object>) => {
      this.allUsers = resp;
    });
  }

  allWorkshops:           Array<Workshop>;
  allActiveWorkshops:     Array<Workshop>;
  allUsers:               Array<Object>;

  workshop: Workshop;
  likes:    Array<string>;
  image_1:  string;
  image_2:  string;
  image_3:  string;
  image_4:  string;
  image_5:  string;

  place_url: SafeResourceUrl;

  signedUp: boolean;
  username: string;
  attendedBefore: boolean;

  commentText:  string;

  sendComment() {
    let date = (new Date(Date.now() + 1 * 60 * 60 * 1000)).toISOString().slice(0, 19);

    this.workshopService.sendComment(
      this.workshop._id,
      this.username,
      this.commentText,
      date
    ).subscribe((resp) => {
      this.workshop.comments.push({
        "username": this.username,
        "text": this.commentText,
        "date": date
      });
      localStorage.setItem("currentWorkshop", JSON.stringify(this.workshop));
    });
  }

  signUp() {
    this.workshopService.signupParticipant(
      this.workshop._id,
      this.username
    ).subscribe((resp) => {
      this.signedUp = true;
      this.workshop.participants.push({
        "username": this.username,
        "status":   "new"
      });
      localStorage.setItem("currentWorkshop", JSON.stringify(this.workshop));
    });
  }

  hasAttendedBefore(): boolean {
    let attended = false;
    this.allWorkshops.forEach(workshop => {
      if (workshop._id !== this.workshop._id && workshop.name === this.workshop.name && workshop.participants.find((p)=> {
        return p.username === this.username && p.status === "active";
      }) !== undefined
      && (new Date(workshop.date)).getTime() < Date.now()) {
        attended = true;
      }
    });
    return attended;
  }

  like() {
    this.workshopService.like(this.workshop._id, this.username).subscribe((resp) => {
      this.workshop.likes.push(this.username);
      localStorage.setItem("currentWorkshop", JSON.stringify(this.workshop));
    });
  }

  unlike() {
    this.workshopService.unlike(this.workshop._id, this.username).subscribe((resp) => {
      this.workshop.likes = this.workshop.likes.filter((val) => {
        return val !== this.username;
      });
      localStorage.setItem("currentWorkshop", JSON.stringify(this.workshop));
      location.reload();
    });
  }

  hasLiked() {
    return this.workshop.likes.find((p)=> {
      return p === this.username;
    }) !== undefined;
  }

  getPfp(username: string) {
    return this.allUsers.find((u) => {
      return u['username'] === username;
    })['image'];
  }
  
}
