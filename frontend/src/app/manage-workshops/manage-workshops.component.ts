import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-manage-workshops',
  templateUrl: './manage-workshops.component.html',
  styleUrls: ['./manage-workshops.component.css']
})
export class ManageWorkshopsComponent implements OnInit {

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
      this.canWriteWorkshops = this.allActiveWorkshops.length > 0;
      
    })
  }

  allWorkshops:           Array<Workshop>;
  allActiveWorkshops:     Array<Workshop>;
  allActiveWorkshopsCopy: Array<Workshop>;
  isUnregistered:         boolean;
  nameParam:              string;
  placeParam:             string;
  canWriteWorkshops:      boolean;

  addCurrentWorkshop(_id: string) {
    localStorage.setItem('editingWorkshop', JSON.stringify(this.allActiveWorkshops.find((w) => {
      return w._id === _id;
    })));
  }

  deleteWorkshop(id:string) {
    this.workshopService.deleteWorkshop(id).subscribe((resp)=>{
      this.ngOnInit();
    })
  }

}
