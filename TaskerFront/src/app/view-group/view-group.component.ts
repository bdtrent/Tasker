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
  grouproles: any[] = [];
  groupusers: {
    user: any,
    role: any
  }[] = [];
  currentUser: any;
  userRole: any;
  isOwner = false;

  ngOnInit(): void {
    this.currentUser = this.groupService.getUser();
    this.groupService.getGroup(this.groupname).subscribe(
      data => {
        this.group = data;
        if(this.currentUser.username == this.group.owner_name) {
          this.isOwner = true;
        }
        this.groupService.getGroupRoles(this.group.id).subscribe(
          data => {
            this.grouproles = data;
          },
          err => {
            this.grouproles = JSON.parse(err.error).message;
          }
        )
        this.groupService.getGroupUsers(this.group.id).subscribe(
          data => {
            data.forEach((element: any) => {
              this.groupService.getUserRole(this.group.id, element.id).subscribe({
                next: returnedRole => {
                  let thisUser = {
                    user: element,
                    role: returnedRole[0]
                  };
                  if (thisUser.user.username == this.currentUser.username) {
                    if(this.isOwner) {
                      let ownerRole = {
                        name: "Owner",
                        canEditTasks: true,
                        canCreateTasks: true,
                        canModMembers: true
                      }
                      this.userRole = ownerRole;
                    }
                    else if (returnedRole[0] == null){
                      let noRole = {
                        name: "None",
                        canEditTasks: false,
                        canCreateTasks: false,
                        canModMembers: false
                      }
                      this.userRole = noRole;
                    }
                    else {
                      this.userRole = thisUser.role;
                    }
                  }
                  this.groupusers.push(thisUser);
                },
                error: err => {
                }
              });
            });
          },
          err => {
            this.groupusers = JSON.parse(err.error).message;
          }
        )
      },
      err => {
        this.group = JSON.parse(err.error).message;
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

  changeRole(username: string, rolename: string): void {
    const newRole = this.grouproles.find((role) => {
      return role.name == rolename;
    });
    this.groupService.changeUserRole(username, newRole.id).subscribe({
      next: data => {
        console.log(data);
        this.groupusers.forEach(element => {
          if(element.user.username == username) {
            element.role = newRole;
          }
        });
        //window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}


