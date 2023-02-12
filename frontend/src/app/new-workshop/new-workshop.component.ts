import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-workshop',
  templateUrl: './new-workshop.component.html',
  styleUrls: ['./new-workshop.component.css']
})
export class NewWorkshopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.imageError = null;
  }

  name: string;
  date: string;
  place: string;
  short_description: string;
  long_description: string;
  main_img: string;
  gallery_images: string[];

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

  addWorkshop() {

  }
}
