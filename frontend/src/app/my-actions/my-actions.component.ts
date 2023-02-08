import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-my-actions',
  templateUrl: './my-actions.component.html',
  styleUrls: ['./my-actions.component.css']
})
export class MyActionsComponent implements OnInit {

  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user'))['username'];
    this.workshopService.getAllWorkshops().subscribe((resp: Array<Workshop>)=>{
      this.allWorkshops = resp;
      this.likedWorkshops = [];
      this.commentedWorkshops = [];

      this.allWorkshops.forEach(workshop => {
        if (workshop.status === "active" && workshop.likes.find((l)=> {
          return l === this.username;
        }) !== undefined) {
          this.likedWorkshops.push(workshop);
        }

        if (workshop.status === "active") {
          let found = false;
          workshop.comments.forEach((c)=> {
            if (c.username === this.username && !found) {
              this.commentedWorkshops.push(workshop);
              found = true;
            }
          })
        }
      });

      this.canWriteLikedWorkshops = this.likedWorkshops.length > 0;
      this.canWriteCommentedWorkshops = this.commentedWorkshops.length > 0;
    })
  }

  allWorkshops:           Array<Workshop>;
  likedWorkshops:         Array<Workshop>;
  commentedWorkshops:     Array<Workshop>;

  username:                   string;
  canWriteLikedWorkshops:     boolean;
  canWriteCommentedWorkshops: boolean;

  
  unlike(workshop: Workshop) {
    this.workshopService.unlike(workshop._id, this.username).subscribe((resp) => {
      workshop.likes = workshop.likes.filter((val) => {
        return val !== this.username;
      });
      location.reload();
    });
  }

  delete(_id: string, date: string) {
    this.workshopService.deleteComment(
      _id,
      this.username,
      date
    ).subscribe((resp) => {
      location.reload()
    });
  }

}
