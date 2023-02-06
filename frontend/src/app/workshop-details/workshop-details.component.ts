import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Workshop } from '../models/workshop';

@Component({
  selector: 'app-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.css']
})
export class WorkshopDetailsComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.workshop = JSON.parse(localStorage.getItem('currentWorkshop'));

    this.image_1 = this.workshop.images.at(0);
    this.image_2 = this.workshop.images.at(1);
    this.image_3 = this.workshop.images.at(2);
    this.image_4 = this.workshop.images.at(3);
    this.image_5 = this.workshop.images.at(4);

    const map_url = "https://www.google.com/maps/embed/v1/place?q=" + this.workshop.place + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
    this.place_url = this.sanitizer.bypassSecurityTrustResourceUrl(map_url);
  }

  workshop: Workshop;
  image_1:  string;
  image_2:  string;
  image_3:  string;
  image_4:  string;
  image_5:  string;

  place_url: SafeResourceUrl;
  
}
