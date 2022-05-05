import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../app/models/list.model';
import { Task } from '../app/models/task.model';
import { TaskService } from '../_services/task.service';

// team changes
// const API_URL = 'http://api.purduetasker.com/api/test/';


// my changes
const baseUrl = 'http://localhost:4200/api/user/lists';
const API_URL = 'http://localhost:8080/api/test/';
// const API_URL = 'http://localhost:8080/api/test/';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private taskService: TaskService) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text'});
  }


// team changes
  getGroupBoard(): Observable<any> {
    return this.http.get(API_URL + 'group', {responseType: 'json'});

  }

// my changes
  getUserBoard(): Observable<any> {
    // return this.taskService.getLists();
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }
  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', {responseType: 'text' });
  // }
}
