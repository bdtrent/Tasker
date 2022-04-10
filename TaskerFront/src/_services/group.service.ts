import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const GROUP_API = 'http://localhost:8080/api/group/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }
  create(name: string, owner_name: string, members: Array<string>): Observable<any> {
    return this.http.post(GROUP_API + 'create', {
      name,
      owner_name,
      members
    }, httpOptions);
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem('auth-user');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
