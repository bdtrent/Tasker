import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/_services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  form: any = {
    name: null,
  };
  isSuccessful = false;
  isCreateFailed = false;
  errorMessage = '';

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
  }
  onSubmit(): void{
    const {name} = this.form;
    const owner_name = this.groupService.getUser().username;
    this.groupService.create(name, owner_name).subscribe({
      next: data =>{
        console.log(data);
        this.isSuccessful = true;
        this.isCreateFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isCreateFailed = true;
      }
    });
  }
}
