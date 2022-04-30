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
  roleSelected=false;
  currentRole: any;
  form: any = {
    name: null,
    canCreateTasks: null,
    canEditTasks: null,
    canModMembers: null
  };

  ngOnInit(): void {
    this.groupService.getGroup(this.groupname).subscribe(
      data => {
        this.group = data;
      },
      err => {
        this.group = JSON.parse(err.error).message;
      }
    )
    this.groupService.getGroupRoles(this.groupname).subscribe(
      data => {
        this.roles = data;
      },
      err => {
        this.roles = JSON.parse(err.error).message;
      }
    )
  }

  setCurrentRole(role: any): void {
    this.currentRole = role;
    if(!this.roleSelected) {
      this.roleSelected = true;
    }
  }

  addRole(name: string, canCreateValue: string, canEditValue: string, canModValue: string): void {
    var canCreateTasks = false;
    var canEditTasks = false;
    var canModMembers = false;
    if(canCreateValue=="true") {
      canCreateTasks = true;
    }
    if(canEditValue=="true") {
      canEditTasks = true;
    }
    if(canModValue=="true") {
      canModMembers = true;
    }
    this.groupService.addRole(this.groupname, name, canCreateTasks, canEditTasks, canModMembers).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    const {name, canCreateValue, canEditValue, canModValue} = this.form;
    var canCreateTasks= false;
    var canEditTasks = false;
    var canModMembers = false;

    if(canCreateValue=="true") {
      canCreateTasks = true;
    }
    if(canEditValue=="true") {
      canEditTasks = true;
    }
    if(canModValue=="true") {
      canModMembers = true;
    }

    this.groupService.updateRole(this.currentRole.id, name, canCreateTasks, canEditTasks, canModMembers).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
