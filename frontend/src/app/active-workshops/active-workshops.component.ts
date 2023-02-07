import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-active-workshops',
  templateUrl: './active-workshops.component.html',
  styleUrls: ['./active-workshops.component.css']
})
export class ActiveWorkshopsComponent implements OnInit {

  constructor(private workshopService: WorkshopService) { }

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
    })
  }

  allWorkshops:           Array<Workshop>;
  allActiveWorkshops:     Array<Workshop>;

  username:               string;
  canWriteWorkshops:      boolean;

  cancelSignup(workshop: Workshop) {
    this.workshopService.cancelSignup(workshop._id, this.username, workshop.participants.find((p)=> {
      return p.username === this.username;
    }).status).subscribe((resp) => {
      location.reload();

      // TODO Notify others of free spots
    });
  }

  disableSignup(date: string): boolean{
    return (new Date(date)).getTime() - 12 * 60 * 60 * 1000 < Date.now();
  }

}
