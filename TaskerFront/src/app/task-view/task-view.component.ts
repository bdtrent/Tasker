import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/_services/task.service';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists?:   List[];
  tasks?:   Task[];

  selectedListId = '';
  id!: string | null;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let segments = this.router.url.split('/');
    // console.log(segments);

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })

    this.route.queryParams.subscribe((params: Params) => { 
      let segments = this.router.url.split('/');
      console.log(segments);
  
      
      if(segments.length >= 3) {
        console.log(params[0] + " " + params[1] + " " + params[2]);
        this.selectedListId = segments[2];
        this.taskService.getTasks(segments[2]).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
          console.log(this.tasks.length);
        })
        // this.taskService.getLists().subscribe((lists: List[]) => {
        //   this.lists = lists;
        // })
      } else {
        this.tasks = undefined;
      }

      // console.log(params); 
    });

    // const key = this.route.snapshot.paramMap.get('id');
    // console.log(key);

    // this.id = this.route.snapshot.paramMap.get('id');

    // this.route.paramMap.subscribe(params => {this.id = params.get('id')});

  //   this.Activatedroute.paramMap.subscribe(params => { 
  //     this.id = params.get('id'); 
  // });

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     if (params['listId']) {
    //       this.selectedListId = params['listId'];
    //       this.taskService.getTasks(params['listId']).subscribe((tasks: Task[]) => {
    //         this.tasks = tasks;
    //       })
    //     } else {
    //       this.tasks = undefined;
    //     }
    //   }
    // )

    // this.taskService.getLists().subscribe((lists: List[]) => {
    //   this.lists = lists;
    // })
    
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks?.filter(val => val.id !== id);
      console.log(res);
    })
  }

}