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

  register() {
    alert(this.type)
  }
}
