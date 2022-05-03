import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/_services/group.service';

@Component({
  selector: 'app-view-group-roles',
  templateUrl: './view-group-roles.component.html',
  styleUrls: ['./view-group-roles.component.css']
})
export class ViewGroupRolesComponent implements OnInit {

  groupname: string;
  constructor(private groupService: GroupService, private actRoute: ActivatedRoute) {
    this.groupname = this.actRoute.snapshot.params['groupname'];
   }
  group: any;
  roles: any[] = [];

  ngOnInit(): void {
    this.groupService.getGroup(this.groupname).subscribe(
      data => {
        this.group = data;
        this.groupService.getGroupRoles(this.group.id).subscribe(
          data => {
            this.roles = data;
          },
          err => {
            this.roles = JSON.parse(err.error).message;
          }
        )
      },
      err => {
        this.group = JSON.parse(err.error).message;
      }
    )
    
  }

  addRole(name: string, canCreateTasks: boolean, canEditTasks: boolean, canModMembers: boolean): void {
    this.groupService.addRole(this.groupname, name, canCreateTasks, canEditTasks, canModMembers).subscribe({
      next: data => {
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  updateRole(oldname: string, name: string, canCreateTasks: boolean, canEditTasks: boolean, canModMembers: boolean): void {
    var roleId = 0;
    
    if(name=="") {
      name = oldname;
    }
    this.roles.forEach(function (value) {
      if(value.name == oldname) {
        roleId = value.id;
      }
    });

    this.groupService.updateRole(roleId, name, canCreateTasks, canEditTasks, canModMembers).subscribe({
      next: data => {
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  deleteRole(name: string): void {
    var roleId = 0;
    this.roles.forEach(function (value) {
      if(value.name == name) {
        roleId = value.id;
      }
    });

    this.groupService.deleteRole(roleId).subscribe({
      next: data => {
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
