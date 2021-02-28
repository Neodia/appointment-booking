import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../appointment';
import { map } from 'rxjs/operators';
import { TimePeriod } from '../time-period';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  scheduleUrl: string;

  constructor(private _http: HttpClient) { 
    this.scheduleUrl = 'http://localhost:8080/appointments';
  }

  public save(appointment: Appointment) {
    return this._http.post<Appointment>("http://localhost:8080/appointments", appointment)
  }

  public findAll() {
    return this._http.get<Appointment[]>("http://localhost:8080/appointments")
      .pipe( map(as => as.map(a => new Appointment(a.type, new Date(Date.parse(a.date.toString())), a.info))) );
  }

  public findAllUsedPeriods() {
    return this._http.get<TimePeriod[]>("http://localhost:8080/used-periods")
      .pipe( map(ps => ps.map(p => new TimePeriod(new Date(Date.parse(p.startTime.toString())), new Date(Date.parse(p.endTime.toString())))) ) );
  }
}
