import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.isUnregistered = localStorage.getItem('user') === null;
    this.workshopService.getAllWorkshops().subscribe((resp: Array<Workshop>)=>{
      this.allWorkshops = resp;
      this.allActiveWorkshops = [];
      this.allWorkshops.forEach(workshop => {
        if (workshop.status === "active" && (new Date(workshop.date)).getTime() > Date.now()) {
          this.allActiveWorkshops.push(workshop);
        }
      });
      this.allActiveWorkshopsCopy = this.allActiveWorkshops;
    })
  }

  allWorkshops: Array<Workshop>;
  allActiveWorkshops: Array<Workshop>;
  allActiveWorkshopsCopy: Array<Workshop>;
  isUnregistered: boolean;
  nameParam: string;
  placeParam: string;

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

  search() {
    let foundWorkshops = [];
    this.allActiveWorkshops = this.allActiveWorkshopsCopy;
    this.allActiveWorkshops.forEach(workshop => {
      if (workshop.name.search(this.nameParam) != -1 && workshop.place.search(this.placeParam) != -1) {
        foundWorkshops.push(workshop);
      }
    });
    this.allActiveWorkshops = foundWorkshops;
  }

}
