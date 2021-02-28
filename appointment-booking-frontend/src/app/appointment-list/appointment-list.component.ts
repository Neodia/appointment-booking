import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule-service.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  sortedAppointments = null;

  constructor(private _scheduleService: ScheduleService) { 
    this._scheduleService.findAll().subscribe(
      res => {
        this.sortedAppointments = res.reduce(function(map, obj) {
          map[ obj.date.getDay().toString() ].push(obj);
          return map;
        }, {1: [], 2: [], 3 : [], 4: [], 5 : []});
      },
      err => console.error(err)
    )
  }

  ngOnInit() {

  }

  dayOfWeekAsString(dayIndex) {
    return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
  }

}
