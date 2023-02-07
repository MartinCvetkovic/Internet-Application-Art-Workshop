import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-attended-workshops',
  templateUrl: './attended-workshops.component.html',
  styleUrls: ['./attended-workshops.component.css']
})
export class AttendedWorkshopsComponent implements OnInit {

  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user'))['username'];
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
      });
      this.canWriteWorkshops = this.allActiveWorkshops.length > 0;
    })
  }

  allWorkshops:           Array<Workshop>;
  allActiveWorkshops:     Array<Workshop>;

  username:               string;
  canWriteWorkshops:      boolean;

  sortByPlace() {
    this.allActiveWorkshops.sort((w1, w2)=>{
      return w1.place.localeCompare(w2.place);
    })
  }

  sortByDate() {
    this.allActiveWorkshops.sort((w1, w2)=>{
      return (new Date(w1.date)).getTime() - (new Date(w2.date)).getTime();
    })
  }

  sortByName() {
    this.allActiveWorkshops.sort((w1, w2)=>{
      return w1.name.localeCompare(w2.name);
    })
  }

}
