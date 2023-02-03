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
        localStorage.setItem("user", JSON.stringify(resp));
        location.href = "http://localhost:4200/";
      }
    });
  }
}
