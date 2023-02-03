import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Art workshop';

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  user: Object;

  logout(){
    localStorage.removeItem("user");
    location.reload();
  }
}
