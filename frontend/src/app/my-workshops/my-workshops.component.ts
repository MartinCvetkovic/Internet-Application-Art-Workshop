import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-my-workshops',
  templateUrl: './my-workshops.component.html',
  styleUrls: ['./my-workshops.component.css']
})
export class MyWorkshopsComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private userService: UserService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user'))['username'];
    this.workshopService.getAllWorkshops().subscribe((resp: Array<Workshop>)=>{
      this.allWorkshops = resp;
      this.allActiveWorkshops = [];
      this.allWorkshops.forEach(workshop => {
        if (workshop.status === "active" && workshop.owner === this.username) {
          this.allActiveWorkshops.push(workshop);
        }
      });
      this.canWriteWorkshops = this.allActiveWorkshops.length > 0;
    });

    this.allUsers = [];
    this.userService.getAllUsers().subscribe((resp: any)=>{
      this.allUsers = resp;
    })
  }

  allUsers: Array<Object>;

  allWorkshops:           Array<Workshop>;
  allActiveWorkshops:     Array<Workshop>;

  username:               string;
  canWriteWorkshops:      boolean;

  addCurrentWorkshop(_id: string) {
    localStorage.setItem('currentWorkshop', JSON.stringify(this.allActiveWorkshops.find((w) => {
      return w._id === _id;
    })));
  }

  downloadTemplate(workshop: Workshop) {
    let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workshop));
    var downloadTemplate = document.getElementById('downloadTemplate' + workshop._id);
    downloadTemplate.setAttribute("href", data);
    downloadTemplate.setAttribute("download", "template.json");
  }

  deleteWorkshop(workshop: Workshop) {
    workshop.participants.forEach((p)=>{
      const mailText = "Workshop " + workshop.name + " on date " + workshop.date + " has been cancelled.";

      this.userService.sendMail(
        this.getEmail(p.username),
        "Cancelled workshop",
        mailText,
        mailText
      ).subscribe();
    })

    this.workshopService.deleteWorkshop(workshop._id).subscribe((resp)=>{
      this.ngOnInit();
    });
  }

  getEmail(username) {
    for (const user of this.allUsers) {
      if (user['username'] === username) {
        return user['email']
      }
    }
    return '';
  }
}
