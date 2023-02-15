import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

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
        if (resp["status"] !== "active"){
          this.errorMessage = "User has not been accepted or has been blocked.";
          return;
        }
        localStorage.setItem("user", JSON.stringify(resp));
        if (resp["type"] === "organiser"){
          this.userService.getOrganisation(resp["username"]).subscribe((rspns) => {
            localStorage.setItem("organisation", JSON.stringify(rspns));
            location.href = "/";
          });
        } else {
          location.href = "/";
        }
      }
    });
  }
}
