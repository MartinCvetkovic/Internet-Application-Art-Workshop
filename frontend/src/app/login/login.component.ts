import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  errorMessage: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((resp)=>{
      if (resp["message"] != null){
        this.errorMessage = resp["message"];
      } else {
        if (resp["type"] === "admin"){
          this.errorMessage = "Wrong credentials.";
          return;
        }
        if (resp["status"] === "inactive"){
          this.errorMessage = "User is inactive.";
          return;
        }
        localStorage.setItem("user", JSON.stringify(resp));
        if (resp["type"] === "organiser"){
          this.userService.getOrganisation(resp["username"]).subscribe((rspns) => {
            if (rspns["message"] != null){
              this.errorMessage = rspns["message"];
            } else {
              localStorage.setItem("organisation", JSON.stringify(rspns));
              location.href = "http://localhost:4200/";
            }
          });
        } else {
          location.href = "http://localhost:4200/";
        }
      }
    });
  }
}
