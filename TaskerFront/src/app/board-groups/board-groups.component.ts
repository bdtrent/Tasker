import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-board-groups',
  templateUrl: './board-groups.component.html',
  styleUrls: ['./board-groups.component.css']
})
export class BoardGroupsComponent implements OnInit {

  constructor(private userService: UserService) { }
  content: any[] =[];

  ngOnInit(): void {
    this.userService.getGroupBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

}
