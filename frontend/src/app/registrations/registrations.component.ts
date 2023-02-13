import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((resp: any)=>{
      this.allUsers = resp;
      this.newUsers = [];
      this.allUsers.forEach((u)=>{
        if (u['status'] === 'new') {
          this.newUsers.push(u);
        }
      })
    })
  }

  allUsers: Array<Object>;
  newUsers: Array<Object>;

  accept(username) {
    this.userService.accept(username).subscribe((resp)=>{
      this.ngOnInit();
    })
  }

  reject(username) {
    this.userService.reject(username).subscribe((resp)=>{
      this.ngOnInit();
    })
  }

}
