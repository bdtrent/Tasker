import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { List } from 'src/app/models/list.model';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  content?: List[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    // console.log("board-user.userService.getUserBoard: " + this.userService.getUserBoard())

    // var respons = JSON.parse(JSON.stringify(this.userService.getUserBoard()));
    // console.log(respons);

    // this.userService.getUserBoard().subscribe((lists: List[]) => {
    //   this.content = lists;
    // })


    // this.userService.getUserBoard().subscribe((lists: List[]) => {
    //   () => {
    //     this.content = lists;
    //   },
    //   err => {
    //     console.log(err.error)
    //     this.content = JSON.parse(err.error).message;
    //   }
    // )

    
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        console.log(err.error)
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
