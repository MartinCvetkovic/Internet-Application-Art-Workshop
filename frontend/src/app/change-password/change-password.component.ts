import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  oldPassword       : string;
  newPassword       : string;
  repeatedPassword  : string;

  errorMessage      : string;
  infoMessage       : string;

  changePassword() {
    this.errorMessage = null;
    this.infoMessage = null;
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!this.newPassword.match(passwordRegex) || !this.newPassword.charAt(0).match(/[a-zA-Z]/)) {
      this.errorMessage = "Password needs to start with a letter, have 8 - 16 characters," +
                          "contain at least one capital letter, number and special character";
      return;
    }

    if (this.newPassword !== this.repeatedPassword) {
      this.errorMessage = "Repeated password is not the same as password";
      return;
    }

    this.userService.changePassword(JSON.parse(localStorage.getItem("user"))["username"], this.oldPassword, this.newPassword).subscribe((resp)=>{
      if (resp["message"] === "Password changed successfully") {
        this.infoMessage = resp["message"]
      } else {
        this.errorMessage = resp["message"];
      }
    });

  }

}
