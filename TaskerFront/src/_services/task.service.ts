import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

const API_URL = 'http://localhost:8080/api/task/';
// const API_URL = 'http://api.purduetasker.com/api/task/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasksForMonth(date: Date): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(API_URL + 'get/month?year=' + date.getFullYear() + '&month=' + (date.getMonth()+1), options);
  }
  
  create(name: string, due_date: Date, owner_name: string): Observable<any> {
    return this.http.post(API_URL + 'create', {
      name,
      due_date,
      owner_name
    }, httpOptions);
  }

  update(task: number, name: string, due_date: Date): Observable<any> {
    return this.http.post(API_URL + 'update', {
      task,
      name,
      due_date
    }, httpOptions);
  }

  delete(task: number): Observable<any> {
    return this.http.post(API_URL + 'delete', {
      task
    }, httpOptions);
  }

  getGroupTasks(groupId: number): Observable<any> {
    const options = {params: new HttpParams().set('group', groupId)};
    return this.http.get(API_URL + 'group', options);
  }

  getTaskUsers(taskId: number){
    const options = {params: new HttpParams().set('task', taskId)};
    return this.http.get(API_URL + 'users', options);
  }

}
