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
  selectedDayTasks?: [string];
  tasks?: [string];

  currentMonth: Date;

  daysList?: Date[];

  constructor(public taskService: TaskService) {
    let d = new Date();
    this.currentMonth = new Date(d.getFullYear(), d.getMonth());
  }

  ngOnInit(): void {
    this.taskService.getTasksForMonth(new Date().getMonth()).subscribe(data => {
      this.tasks = data;
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
  }

  navigateMonth(direction: number) {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + direction);
    this.updateDayList();
  }

  getDaysInMonth(month: number) {
    return new Date(new Date().getFullYear(), month + 1, 0).getDate();
  }

}
