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
    this.userService.getAllUsers().subscribe((resp: any)=>{
      this.allUsers = resp;
    })
  }

  allUsers: Array<Object>;

  username: string;
  password: string;
  errorMessage: string;

  email: string;
  emailMessage: string;
  emailSuccess: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((resp)=>{
      if (resp["message"] != null){
        for (const user of this.allUsers) {
          if (user['username'] === this.username && user['tempDate'] !== null && parseInt(user['tempDate']) > Date.now()) {
            this.userService.tempLogin(this.username, this.password).subscribe((resp)=>{
              if (resp["message"] != null){
                this.errorMessage = resp["message"];
              }
              else {
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
            return;
          }
        }

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

  confirmEmail() {
    this.userService.getUserByEmail(this.email).subscribe((resp)=>{
      if (resp['message'] === "Non-existent email.") {
        this.emailSuccess = "";
        this.emailMessage = resp['message'];
      }
      else {
        this.emailMessage = "";
        this.emailSuccess = "Temporary password has been sent to your email address."

        let tempPass = this.randPassword(5, 5, 5, 5);
        let tempDate = Date.now() + 30 * 60 * 1000;

        this.userService.setTempPass(this.email, tempPass, tempDate).subscribe((r)=>{
          this.ngOnInit();
        });

        let text = "Your temporary password is " + tempPass + ". It will be available for the next 30 minutes.";

        this.userService.sendMail(
          this.email,
          "New temporary password",
          text,
          text
        ).subscribe();
      }
    })
  }

  randPassword(capitals, noncapitals, numbers, spec_chars) {
    var chars = [
     "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
     "abcdefghijklmnopqrstuvwxyz",
     "0123456789",
     "!@#$%^&*()_+=-,."
    ];
  
    function randCharFrom(chars) {
      return chars[Math.floor(Math.random() * chars.length)];
    }
  
    function shuffle(arr) {
      for (let i = 0, n = arr.length; i < n - 2; i++) {
          let j = Math.floor(Math.random() * (n - i));
          [arr[j], arr[i]] = [arr[i], arr[j]];
      }
      return arr;
    }
  
    return randCharFrom(chars[1]) + shuffle([capitals, noncapitals, numbers, spec_chars].map(function(len, i) {
      return Array(len).fill(chars[i]).map(x => randCharFrom(x)).join('');
    }).concat().join('').split('')).join('')
  }
}
