import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/_services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  form: any = {
    name: null,
    dueDate: null,
  };
  isSuccessful = false;
  isCreateFailed = false;
  errorMessage = '';

  constructor(private taskService: TaskService, private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const {name, dueDate} = this.form;
    this.taskService.createTask(name, dueDate, this.tokenStorageService.getUser().username).subscribe({
      next: data =>{
        console.log(data);
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.router.navigate(['']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isCreateFailed = true;
      }
    });
  }
}
