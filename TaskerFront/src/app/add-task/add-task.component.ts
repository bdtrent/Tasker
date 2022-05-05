import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/_services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = {
    listId: '',
    title: '',
    description: '',
    assign_date: '',
    due_date: '',
    completed: false
  };
  submitted = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }
  // constructor(private tutorialService: TutorialService) { }

  // TODO: commented this out...
  // listId: string;
  
  ngOnInit() {
  }

  createTask(title: string) {

    const data = {
      listId: this.task.listId,
      title: this.task.title,
      description: this.task.description,
      assign_date: this.task.assign_date,
      due_date: this.task.due_date,
      completed: this.task.completed,
    };

    data.title = title;


    this.route.params.subscribe(
      (params: Params) => {
        this.task.listId = params['id'];
        data.listId = params['id'];
        // this.listId = params['listId'];
      }
    )


    this.taskService.createTask(data.title, data.listId)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (e) => console.error(e)
    });


    this.taskService.createTask(title, this.task.listId)
    // this.taskService.createTask(title, this.listId)
      .subscribe((newTask: Task) => {
        this.router.navigate(['../'], { relativeTo: this.route });
    })
  }
  newTutorial(): void {
    this.submitted = false;
    this.task = {
      title: '',
      description: '',
      assign_date: '',
      due_date: '',
      completed: false
    };
  }

}


// export class AddTutorialComponent implements OnInit {
//   tutorial: Tutorial = {
//     title: '',
//     description: '',
//     published: false
//   };
//   submitted = false;
//   constructor(private tutorialService: TutorialService) { }
//   ngOnInit(): void {
//   }
//   saveTutorial(): void {
//     const data = {
//       title: this.tutorial.title,
//       description: this.tutorial.description
//     };
//     this.tutorialService.create(data)
//       .subscribe({
//         next: (res) => {
//           console.log(res);
//           this.submitted = true;
//         },
//         error: (e) => console.error(e)
//       });
//   }
//   newTutorial(): void {
//     this.submitted = false;
//     this.tutorial = {
//       title: '',
//       description: '',
//       published: false
//     };
//   }
// }
