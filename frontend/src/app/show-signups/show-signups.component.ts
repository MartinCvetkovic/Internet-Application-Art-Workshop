import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-show-signups',
  templateUrl: './show-signups.component.html',
  styleUrls: ['./show-signups.component.css']
})
export class ShowSignupsComponent implements OnInit {

  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.workshop = JSON.parse(localStorage.getItem("currentWorkshop"));
    this.signups = this.workshop.participants.filter((p)=>{
      return p.status === "new";
    })
  }

  workshop: Workshop;
  signups: Participant[];

  approve(username: string) {
    this.workshopService.resolveSignup(this.workshop._id, username, "active").subscribe((resp:any)=>{
      this.workshop = resp;
      localStorage.setItem("currentWorkshop", JSON.stringify(this.workshop));
      this.ngOnInit();
    });
  }

  reject(username: string) {
    this.workshopService.resolveSignup(this.workshop._id, username, "inactive").subscribe((resp:any)=>{
      this.workshop = resp;
      localStorage.setItem("currentWorkshop", JSON.stringify(this.workshop));
      this.ngOnInit();
    });
  }

}
