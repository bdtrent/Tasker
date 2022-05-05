import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { CreateGroupComponent } from './create-group/create-group.component';
import { BoardGroupsComponent } from './board-groups/board-groups.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { ViewGroupRolesComponent } from './view-group-roles/view-group-roles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';       // TODO: How to import properly?
import { CalendarComponent } from './calendar/calendar.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditListComponent } from './edit-list/edit-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddListComponent } from './add-list/add-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    CreateGroupComponent,
    BoardGroupsComponent,
    ViewGroupComponent,
    ViewGroupRolesComponent,
    CalendarComponent,
    BoardUserComponent,
    EditListComponent,
    EditTaskComponent,
    TaskViewComponent,
    AddTaskComponent,
    AddListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatMenuModule,
    RouterModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
