import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/_services/task.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  selectedDay?: Date;
  selectedDayTasks?: any[];
  tasks?: any[];

  currentMonth: Date;

  daysList?: Date[];

  constructor(public taskService: TaskService) {
    let d = new Date();
    this.currentMonth = new Date(d.getFullYear(), d.getMonth());
  }

  ngOnInit(): void {
    this.taskService.getTasksForMonth(new Date()).subscribe((data: any[]) => {
      this.tasks = data.map(task => {
        task.due_date = new Date(task.due_date);
        return task;
      });
    });
    this.updateDayList();
  }

  updateDayList() {
    let days = [];
    for (let i = 0; i < this.currentMonth.getDay(); i++) {
      days.push(new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, this.getDaysInMonth(this.currentMonth.getMonth() - 1) - (this.currentMonth.getDay() - i) + 1))
    }
    for (let i = 1; i <= this.getDaysInMonth(this.currentMonth.getMonth()); i++) {
      days.push(new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i));
    }
    for (let i = 1; i <= 7 - ((this.currentMonth.getDay() + this.getDaysInMonth(this.currentMonth.getMonth())) % 7); i++) {
      days.push(new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, i));
    }
    this.daysList = days;
  }

  selectDay(d: Date) {
    this.selectedDay = d;
    this.selectedDayTasks = this.tasks?.filter(task => {
      let dueDate = task.due_date;
      dueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDay());
      
      return dueDate.valueOf() == d.valueOf();
    })
  }

  navigateMonth(direction: number) {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + direction);
    this.updateDayList();
    this.taskService.getTasksForMonth(this.currentMonth).subscribe((data: any[]) => {
      this.tasks = data.map(task => {
        task.due_date = new Date(task.due_date);
        return task;
      });
    });
  }

  getDaysInMonth(month: number) {
    return new Date(new Date().getFullYear(), month + 1, 0).getDate();
  }

  checkTasksForDay(date: Date) {
    return this.tasks?.filter(t => { let d = new Date(t.due_date.getFullYear(), t.due_date.getMonth(), t.due_date.getDay()); return d.valueOf() == date.valueOf() }).length != 0
  }

}
