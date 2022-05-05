import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

const API_URL = 'http://localhost:8080/api/task/';
// const API_URL = 'http://api.purduetasker.com/api/task/';

const baseUrl = 'http://localhost:4200/api/task/';
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

  // my changes -----------------------------
  getLists(): Observable<List[]> {
    return this.http.get<List[]>('lists');
  }

  createList(title: string) {
    // We want to send a web request to create a list
    return this.http.post('lists', { title });
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.http.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.http.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

  deleteTask(listId: string, taskId: string) {
    return this.http.delete(`lists/${listId}/tasks/${taskId}`);
  }

  deleteList(id: string) {
    return this.http.delete(`lists/${id}`);
  }

  getTasks(listId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string) {
    // We want to send a web request to create a task
    return this.http.post(`lists/${listId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.http.patch(`lists/${task.listId}/tasks/${task.id}`, {
      completed: !task.completed
    });
  }

}
