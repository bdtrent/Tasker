import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/_services/group.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {

  groupname: string;
  constructor(private groupService: GroupService, private actRoute: ActivatedRoute, private router: Router) {
    this.groupname = this.actRoute.snapshot.params['groupname'];
   }
  group: any;
  groupusers: any[] = [];
  isOwner = false;

  ngOnInit(): void {
    this.groupService.getGroup(this.groupname).subscribe(
      data => {
        this.group = data;
        if(this.groupService.getUser().username == this.group.owner_name) {
          this.isOwner = true;
        }
      },
      err => {
        this.group = JSON.parse(err.error).message;
      }
    )
    this.groupService.getGroupUsers(this.groupname).subscribe(
      data => {
        this.groupusers = data;
      },
      err => {
        this.groupusers = JSON.parse(err.error).message;
      }
    )
  }

  addUser(username: string): void {
    this.groupService.addUser(username, this.groupname).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  removeUser(username: string): void {
    this.groupService.removeUser(username, this.groupname).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  disbandGroup(): void {
    this.groupService.disbandGroup(this.groupname).subscribe({
      next: data => {
        console.log(data);
        document.getElementById("dismissDisbandModal")?.click();
        this.router.navigate(['/groups']);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  leaveGroup(): void {
    this.groupService.removeUser(this.groupService.getUser().username, this.groupname).subscribe({
      next: data => {
        console.log(data);
        document.getElementById("dismissLeaveModal")?.click();
        this.router.navigate(['/groups']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
