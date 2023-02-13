import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-my-workshops',
  templateUrl: './my-workshops.component.html',
  styleUrls: ['./my-workshops.component.css']
})
export class MyWorkshopsComponent implements OnInit {

  constructor(private workshopService: WorkshopService) { }

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
    })
  }

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

  deleteWorkshop(_id: string) {
    this.workshopService.deleteWorkshop(_id).subscribe((resp)=>{
      this.ngOnInit();
    });

    // TODO send email
  }
}
