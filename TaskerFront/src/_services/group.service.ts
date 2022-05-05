import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const GROUP_API = 'http://localhost:8080/api/group/';
// const GROUP_API = 'http://api.purduetasker.com/api/group/';
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
      groupname
    }, httpOptions);
  }
  removeUser(username: string, groupname: string): Observable<any> {
    return this.http.post(GROUP_API + 'removeuser', {
      username,
      groupname
    }, httpOptions);
  }
  disbandGroup(groupname: string): Observable<any> {
    return this.http.post(GROUP_API + 'delete', {
      groupname
    }, httpOptions);
  }
  getGroup(name: string): Observable<any> {
    const options = {params: new HttpParams().set('name', name)};
    return this.http.get(GROUP_API + 'get', options);
  }
  getGroupUsers(groupId: number): Observable<any> {
    const options = {params: new HttpParams().set('group', groupId)};
    return this.http.get(GROUP_API + 'getusers', options);
  }
  getGroupRoles(groupId: number): Observable<any> {
    const options = {params: new HttpParams().set('group', groupId)};
    return this.http.get(GROUP_API + 'getroles', options);
  }
  
  getUserRole(groupId: number, userId: number): Observable<any> {
    let params = new HttpParams().set('group', groupId);
    params = params.append('user', userId);
    const options = {params: params};
    return this.http.get(GROUP_API + 'getuserrole', options);
  }

  changeUserRole(username: string, roleId: number): Observable<any> {
    return this.http.post(GROUP_API + 'changeuserrole', {
      username,
      roleId
    }, httpOptions);
  }

  addRole(groupname: string, name: string, canCreateTasks: boolean, canEditTasks: boolean, canModMembers: boolean): Observable<any> {
    return this.http.post(GROUP_API + 'addrole', {
      groupname,
      name,
      canCreateTasks,
      canEditTasks,
      canModMembers
    }, httpOptions);
  }
  updateRole(id:number, name: string, canCreateTasks: boolean, canEditTasks: boolean, canModMembers: boolean): Observable<any> {
    return this.http.post(GROUP_API + 'updaterole', {
      id,
      name,
      canCreateTasks,
      canEditTasks,
      canModMembers
    }, httpOptions);
  }
  deleteRole(id:number): Observable<any> {
    return this.http.post(GROUP_API + 'deleterole', {
      id
    }, httpOptions);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
