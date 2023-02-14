import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((resp: any)=>{
      this.allUsers = resp;
      this.allActiveNewUsers = [];
      this.allUsers.forEach((u)=>{
        if (u['status'] !== 'inactive') {
          this.allActiveNewUsers.push(u);
        }
      })
    });
  }

  allUsers: Array<Object>;
  allActiveNewUsers: Array<Object>;

  delete(username) {
    this.userService.reject(username).subscribe((resp)=>{
      this.ngOnInit();
    })
  }

  addEditedUser(user) {
    localStorage.setItem('editingUser', JSON.stringify(user));
  }

}
