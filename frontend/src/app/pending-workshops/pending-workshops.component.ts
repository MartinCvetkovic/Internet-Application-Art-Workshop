import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-pending-workshops',
  templateUrl: './pending-workshops.component.html',
  styleUrls: ['./pending-workshops.component.css']
})
export class PendingWorkshopsComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private userService: UserService) { }

  ngOnInit(): void {
    this.workshopService.getAllWorkshops().subscribe((resp: Array<Workshop>)=>{
      this.allWorkshops = resp;
      this.allNewWorkshops = [];
      this.allCurrentWorkshops = [];
      this.allWorkshops.forEach(workshop => {
        if (workshop.status === "new") {
          this.allNewWorkshops.push(workshop);
        }
        if ((new Date(workshop.date)).getTime() > Date.now()) {
          this.allCurrentWorkshops.push(workshop);
        }
      });
      this.canWriteWorkshops = this.allNewWorkshops.length > 0;

    })

    this.allUsers = [];
    this.userService.getAllUsers().subscribe((resp: any)=>{
      this.allUsers = resp;
    })
  }

  allUsers: Array<Object>

  allCurrentWorkshops:  Array<Workshop>;
  allWorkshops:         Array<Workshop>;
  allNewWorkshops:      Array<Workshop>;
  canWriteWorkshops:    boolean;

  approve(workshop: Workshop) {
    if (this.getType(workshop.owner) === "participant") {
      this.userService.changeType(workshop.owner, "organiser").subscribe();
    }
    this.workshopService.approveWorkshop(workshop._id).subscribe((resp)=>{
      this.ngOnInit();
    });
  }

  reject(id) {
    this.workshopService.deleteWorkshop(id).subscribe((resp)=>{
      this.ngOnInit();
    })
  }

  canBecomeOrganiser(workshop: Workshop): boolean {
    for (const user of this.allUsers) {
      if (workshop.owner === user['username'] && user['type'] === 'participant') {
        for (const w of this.allCurrentWorkshops) {
          if (w.participants.find((p)=>{
            return p.username === user['username'];
          }) !== undefined) {
            return false;
          }
        }
      }      
    }
    return true;
  }

  getType(username) {
    for (const u of this.allUsers) {
      if (u['username'] === username) {
        return u['type'];
      }
    }
    return "";
  }
}
