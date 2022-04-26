import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/_services/group.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {

  groupname: string;
  constructor(private groupService: GroupService, private actRoute: ActivatedRoute) {
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

  addUser(username: string){
    this.groupService.addUser(username, this.group.groupname);
  }

  removeUser(username: string){
    this.groupService.removeUser(username, this.group.groupname);
  }

  disbandGroup(){
    this.groupService.disbandGroup(this.group.groupname);
  }

  leaveGroup(){
    this.groupService.removeUser(this.groupService.getUser().username, this.group.groupname);
  }
}
