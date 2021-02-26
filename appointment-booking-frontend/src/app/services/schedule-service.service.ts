import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../appointment';

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
}
