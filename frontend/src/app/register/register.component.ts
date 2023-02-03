import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.type = "participant";
  }

  firstname:          string; 
  lastname:           string;
  username:           string;
  password:           string;
  repeatedPassword:   string;
  phone:              string;
  email:              string;
  image:              string;
  type:               string;
  orgname:            string;
  country:            string;
  city:               string;
  postal_code:        string;
  address:            string;
  adrNumber:          string;
  reg_number:         number;

  errorMessage:       string;
  imageError:         string;

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
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
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          if (img_height > 300 || img_width > 300 || img_height < 100 || img_width < 100) {
            this.imageError = "Allowed profile picture dimensions are between 100x100px and 300x300px.";
          } else {
            this.image = e.target.result;
            console.log(this.image)
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  register() {
    if(
      this.firstname === undefined || this.firstname === "" 
      || this.lastname === undefined || this.lastname === ""
      || this.username === undefined || this.username === ""
      || this.password === undefined || this.password === ""
      || this.repeatedPassword === undefined || this.repeatedPassword === ""
      || this.phone === undefined || this.phone === ""
      || this.email === undefined || this.email === ""
      || this.type === "organiser"
      && (this.orgname === undefined || this.orgname === ""
      || this.country === undefined || this.country === ""
      || this.city === undefined || this.city === ""
      || this.postal_code === undefined || this.postal_code === ""
      || this.address === undefined || this.address === ""
      || this.adrNumber === undefined || this.adrNumber === ""
      || this.reg_number === undefined)
    ) {
      this.errorMessage = "All fields are required.";
      return;
    }

    if (this.imageError !== null) {
      return;
    }

    //if (this.password)

    /*this.userService.register().subscribe((resp)=>{
      if (this.image === undefined) {
        this.image = "";
      }

      this.errorMessage = null;
    });*/
  }
}
