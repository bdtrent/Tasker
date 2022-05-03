import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  constructor(private userService: UserService, public tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
