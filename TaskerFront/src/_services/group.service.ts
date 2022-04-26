import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const GROUP_API = 'http://localhost:8080/api/group/';
const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }
  create(name: string, owner_name: string): Observable<any> {
    return this.http.post(GROUP_API + 'create', {
      name,
      owner_name
    }, httpOptions);
  }
  addUser(username: string, groupname: string): Observable<any> {
    return this.http.post(GROUP_API + 'adduser', {
      username,
      groupname,
    }, httpOptions);
  }
  getGroup(name: string): Observable<any> {
    const options = {params: new HttpParams().set('name', name)};
    return this.http.get(GROUP_API + 'get', options);
  }
  getGroupUsers(name: string): Observable<any> {
    const options = {params: new HttpParams().set('name', name)};
    return this.http.get(GROUP_API + 'getusers', options);
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
