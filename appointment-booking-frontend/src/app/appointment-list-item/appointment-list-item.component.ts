import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-list-item',
  templateUrl: './appointment-list-item.component.html',
  styleUrls: ['./appointment-list-item.component.css']
})
export class AppointmentListItemComponent implements OnInit {

  @Input() appointment : Appointment;
  dateToShow : string;
  startHour : string;
  endHour : string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() { 
    this.dateToShow = this.datePipe.transform(this.appointment.date,"dd/MM/yyyy");
    this.startHour = this.appointment.date.toLocaleTimeString().substr(0,5);

    var diff = this.appointment.type == "First" ? 45 : 30;
    this.endHour = new Date(this.appointment.date.getTime() + diff*60000)
      .toLocaleTimeString().substr(0,5);
  }

}
