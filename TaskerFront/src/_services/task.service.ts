import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/task/';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasksForMonth(month: number): Observable<any> {
    const options = {
      params: new HttpParams().set('month', month)
    };
    return this.http.get(API_URL + 'get/month', options);
  }

}
