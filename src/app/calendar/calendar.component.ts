import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Days } from './days.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public cells: Array<any>;
  public monthName: string;
  private currentMonth = moment();
  
  constructor() { }

  ngOnInit(): void {
    this.cells = this.generateDate(this.currentMonth);
  }

  generateDate(monthToShow = moment()) {
    this.monthName = this.currentMonth.format('MMM YYYY');
    if (!moment.isMoment(monthToShow)) {
      return null;
    }

    let dateStart = moment(monthToShow).startOf('month');
    let dateEnd = moment(monthToShow).endOf('month');
    let cells = [];

    while (dateStart.day() !== Days.SUNDAY) {
      dateStart.subtract(1, 'day');
    }

    while (dateEnd.day() !== Days.SATURDAY) {
      dateEnd.add(1, 'day');
    }

    do {
      cells.push({
        date: moment(dateStart),
        isInCurrentMonth: dateStart.month() === monthToShow.month()
      });
      dateStart.add(1, 'day')
    } while (dateStart.isSameOrBefore(dateEnd));

    return cells;
  }

  changeMonth(change: string) {
    if (change === 'next') {
      this.currentMonth.add(1, 'months');
    } else {
      this.currentMonth.subtract(1, 'months');
    }

    this.cells = this.generateDate(this.currentMonth);
  }

}
