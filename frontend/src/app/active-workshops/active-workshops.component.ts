import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-active-workshops',
  templateUrl: './active-workshops.component.html',
  styleUrls: ['./active-workshops.component.css']
})
export class ActiveWorkshopsComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private userService: UserService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user'))['username'];
    this.workshopService.getAllWorkshops().subscribe((resp: Array<Workshop>)=>{
      this.allWorkshops = resp;
      this.allActiveWorkshops = [];
      this.allWorkshops.forEach(workshop => {
        if (workshop.status === "active" && workshop.participants.find((p)=> {
          return p.username === this.username;
        }) !== undefined) {
          this.allActiveWorkshops.push(workshop);
        }
      });
      this.canWriteWorkshops = this.allActiveWorkshops.length > 0;

      this.allUsers = [];
      this.userService.getAllUsers().subscribe((resp: any)=>{
        this.allUsers = resp;
      })
    })
  }

  allUsers: Array<Object>;
  allWorkshops:           Array<Workshop>;
  allActiveWorkshops:     Array<Workshop>;

  username:               string;
  canWriteWorkshops:      boolean;

  cancelSignup(workshop: Workshop) {
    this.workshopService.cancelSignup(workshop._id, this.username, workshop.participants.find((p)=> {
      return p.username === this.username;
    }).status).subscribe((resp) => {
      workshop.participants.forEach((p)=>{
        if (p.username === this.username && p.status === "active") {

          workshop.participants.forEach((p)=>{
            if (p.status === 'waiting') {
              const mailText = "Workshop: " + workshop.name + ", on date " + workshop.date + ", now has free spots.";
  
              this.userService.sendMail(
                this.getEmail(p.username),
                "Free workshop spot",
                mailText,
                mailText
              ).subscribe();
            }
          })

          this.workshopService.removeWaitingParticipants(workshop._id).subscribe();
        }
      })
      location.reload();
    });
  }

  disableSignup(date: string): boolean{
    return (new Date(date)).getTime() - 12 * 60 * 60 * 1000 < Date.now();
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
