import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.image = this.user['image'];
    this.firstname = this.user['firstname'];
    this.lastname = this.user['lastname'];
    this.username = this.user['username'];
    this.phone = this.user['phone'];
    this.email = this.user['email'];
    this.oldImage = this.image;

    this.imageError = null;
  }

  firstname:          string;
  lastname:           string;
  username:           string;
  phone:              string;
  email:              string;
  image:              string;
  oldImage:           string;

  errorMessage:       string;
  successInfo:        string;
  imageError:         string;

  user:               Object;

  
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
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          if (img_height > 300 || img_width > 300 || img_height < 100 || img_width < 100) {
            this.imageError = "Allowed profile picture dimensions are between 100x100px and 300x300px.";
          } else {
            this.image = e.target.result;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


  updateUser() {
    this.successInfo = null;

    if(
      this.firstname === undefined || this.firstname === "" 
      || this.lastname === undefined || this.lastname === ""
      || this.phone === undefined || this.phone === ""
      || this.email === undefined || this.email === ""
    ) {
      this.errorMessage = "All fields are required.";
      return;
    }

    if (this.imageError !== null) {
      return;
    }

    if (this.image === undefined || this.image === "") {
      this.image = "data:image/jpeg;base64,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";
    }

    this.userService.updateUser(
      this.user['email'],
      this.firstname,
      this.lastname,
      this.username,
      this.phone,
      this.email,
      this.image
    ).subscribe((resp) => {
      if (resp["message"] === "Update successful.") {
        this.successInfo = resp["message"];
        this.errorMessage = null;
        this.oldImage = this.image;
        let user = {
          username:   this.username,
          password:   this.user['password'],
          firstname:  this.firstname,
          lastname:   this.lastname,
          phone:      this.phone,
          email:      this.email,
          image:      this.image,
          type:       this.user['type'],
          status:     this.user['status'],
          _id:        this.user['_id']
        };
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.errorMessage = resp["message"];
      }
    });
  }

}
