import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/_services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
// export class AddListComponent implements OnInit {

//   list: List = {
//     title: '',
//   };
//   submitted = false;

//   constructor(private taskService: TaskService, private router: Router) { }
//   // constructor(private taskService: TaskService, private router: Router) { }
//   // constructor(private tutorialService: TutorialService) { }

//   ngOnInit(): void {
//   }

//   createList(title: string) {

//     const data = {
//       title: this.list.title,
//     }

//     this.taskService.createList(data)
//       .subscribe({
//         // TODO: fix...
//         next: (res) => {
//           console.log(res);
//           // Now we navigate to /lists/list.id
//           this.router.navigate([ 'lists', list.id ]); 
//           this.submitted = true;
//         },
//         error: (e) => console.error(e)
//       )

//       this.taskService.createList(title)
//       .subscribe((list: List) => {
//         // TODO: fix...
//         // next: (res) => {
//           console.log(list);
//           // Now we navigate to /lists/list.id
//           this.router.navigate([ 'lists', list.id ]); 
//           this.submitted = true;
//         },
//         // err => console.error(err)
//         // error: (e) => console.error(e)
//       )
//   };
//   // });
//   // }
//   // TODO: not sure if this is needed
//   // newList(): void {
//   //   this.submitted = false;
//   //   this.list = {
//   //     title: '',
//   //   };
//   // }
// }

export class AddListComponent implements OnInit {
  list: List = {
    title: '',
  };
  submitted = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  createList(title: string): void {
  // saveList(): void {

    const data = {
      title: this.list.title,
    };

    data.title = title;

    this.taskService.createList(data.title)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (e) => console.error(e)
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.list = {
      title: '',
    };
  }
}

// export class NewListComponent implements OnInit {

//   constructor(private taskService: TaskService, private router: Router) { }

//   ngOnInit() {
//   }

//   createList(title: string) {
//     this.taskService.createList(title).subscribe((list: List) => {
//       console.log(list);
//       // Now we navigate to /lists/task._id
//       this.router.navigate([ '/lists', list._id ]); 
//     });
//   }

// }

