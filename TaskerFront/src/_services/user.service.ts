import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://api.purduetasker.com/api/test/';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text'});
  }
  getGroupBoard(): Observable<any> {
    return this.http.get(API_URL + 'group', {responseType: 'json'});
  }
}
