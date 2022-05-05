import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
// team changes
import { CreateGroupComponent } from './create-group/create-group.component';
import { BoardGroupsComponent } from './board-groups/board-groups.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { ViewGroupRolesComponent } from './view-group-roles/view-group-roles.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'groups', component: BoardGroupsComponent },
  { path: 'creategroup', component: CreateGroupComponent},
  { path: 'group/:groupname', component: ViewGroupComponent},
  { path: 'group/:groupname/roles', component: ViewGroupRolesComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },

// my changes
  { path: 'user/lists', component: TaskViewComponent,
          children: [
            { 
              path: ':groupname', 
              component: TaskViewComponent,
              children: [
                { 
                  path: 'add-task', 
                  component: AddTaskComponent
                },
                { 
                  path: 'edit-task/:taskId', 
                  component: EditTaskComponent
                },
              ]
             },
          ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
