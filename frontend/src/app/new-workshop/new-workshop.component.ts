import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-new-workshop',
  templateUrl: './new-workshop.component.html',
  styleUrls: ['./new-workshop.component.css']
})
export class NewWorkshopComponent implements OnInit {

  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.gallery_images = [];

    this.imageError = null;
  }

  name: string;
  date: string;
  time: string;
  place: string;
  short_description: string;
  long_description: string;
  main_img: string;
  gallery_images: string[];
  available_spots: number;

  imageError: string;
  successInfo: string;
  errorMessage: string;

  user: Object;

  
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    this.successInfo = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      if (!['image/png', 'image/jpg', 'image/jpeg'].includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only JPG and PNG images are allowed.';
        return;
      }

      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.main_img = e.target.result;
          console.log(this.main_img)
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  multipleFileChangeEvent(fileInput: any) {
    this.imageError = null;
    this.successInfo = null;

    if (fileInput.target.files && fileInput.target.files.length > 5) {
      this.imageError = 'Only 5 images are allowed.';
      return;
    }

    for (let i = 0; i < fileInput.target.files.length; i++) {
      if (fileInput.target.files[i]) {
        if (!['image/png', 'image/jpg', 'image/jpeg'].includes(fileInput.target.files[i].type)) {
          this.imageError = 'Only JPG and PNG images are allowed.';
          return;
        }
  
        let reader = new FileReader();
        reader.onload = (e: any) => {
          let image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            this.gallery_images.push(e.target.result);
          };
        };
  
        reader.readAsDataURL(fileInput.target.files[i]);
      }
    }
    
  }

  addWorkshop() {
    this.successInfo = null;
    console.log(this.date);console.log(this.time)

    if (
      this.name === undefined || this.name === "" ||
      this.date === undefined || this.date === "" ||
      this.place === undefined || this.place === "" ||
      this.short_description === undefined || this.short_description === "" ||
      this.long_description === undefined || this.long_description === "" ||
      this.main_img === undefined || this.main_img === ""
    ) {
      this.errorMessage = "All fields except gallery images are required.";
      return;
    }

    if (this.imageError !== null) {
      return;
    }

    this.workshopService.newWorkshop(
      this.user['username'],
      this.name,
      this.main_img,
      this.date + "T" + this.time + ":00",
      this.place,
      this.short_description,
      this.long_description,
      this.gallery_images,
      this.available_spots
    ).subscribe((resp) => {
      this.successInfo = "Workshop created successfully.";
      this.errorMessage = null;
    });
  }
}
