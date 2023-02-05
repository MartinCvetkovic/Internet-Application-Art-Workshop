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
  }

  firstname:          string;
  lastname:           string;
  username:           string;
  phone:              string;
  email:              string;
  image:              string;

  errorMessage:       string;
  infoMessage:        string;

  user:               Object;

}
