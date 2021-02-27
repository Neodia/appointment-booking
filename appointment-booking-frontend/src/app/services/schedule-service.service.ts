import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../appointment';
import { map } from 'rxjs/operators';

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
}
