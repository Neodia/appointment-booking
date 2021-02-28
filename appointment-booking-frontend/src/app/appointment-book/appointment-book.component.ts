import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment';
import { BookingInfo } from '../booking-info';
import { ScheduleService } from '../services/schedule-service.service';

@Component({
  selector: 'app-appointment-book',
  templateUrl: './appointment-book.component.html',
  styleUrls: ['./appointment-book.component.css']
})
export class AppointmentBookComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  min: String = "9:00 am";
  max: String = "5:30 pm";

  MINUTES_JUMP = 15;
  schedule : Map<number, DaySchedule> = new Map([
    [1, new DaySchedule("9:00", "12:00", "14:00", "18:00")],
    [2, new DaySchedule("9:00", "12:00", "14:00", "18:00")],
    [3, new DaySchedule("9:00", "12:00", null, null)],
    [4, new DaySchedule("9:00", "12:00", "14:00", "18:00")],
    [5, new DaySchedule("10:00", "13:00", "15:00", "17:00")]
  ]);
  availableTimes = null;

  myDate: Date = null;
  
  constructor(private _formBuilder: FormBuilder,
              private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      consultationType: ['', Validators.required],
      consultationDate: ['', Validators.required],
      consultationTime: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      bookFirstName: ['', Validators.required],
      bookLastName: ['', Validators.required],
      bookBirthDate: ['', Validators.required],
      bookPhone: ['', Validators.required],
      bookMail: ['', Validators.required],
      bookDesc: ['', null]
    });
  }
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    
    // Prevent previous dates and weekends from being selected.
    return d.toJSON().slice(0, 10) > new Date().toJSON().slice(0, 10) &&
            day !== 0 && day !== 6;
  }

  validateHours = () => {
    var consult = this.firstFormGroup.value;
    if(consult.consultationType && consult.consultationDate) {
      let map = this.createHoursAvailbleForDay( consult.consultationDate.getDay(), consult.consultationType );
      this.availableTimes = Object.values(map);
    }
  }

  createHoursAvailbleForDay(day: number, consultationType: string) {
    let consultationLength = consultationType == "First" ? 45 : 30;
    return this.schedule.get(day).valueArray.reduce( (map, range) => {
      // Time to test
      let currentTime = new Date(1, 1, 1, 
        Number.parseInt(range[0].split(":")[0]),
        Number.parseInt(range[0].split(":")[1]) );

      let currentTimeEnd = new Date( currentTime.getTime() + consultationLength * 60000 );

      let endTime = new Date(1, 1, 1, 
        Number.parseInt(range[1].split(":")[0]),
        Number.parseInt(range[1].split(":")[1]) );

      while(currentTimeEnd.getTime() < endTime.getTime()) {
        if( !map[currentTime.getHours()] )
          map[currentTime.getHours()] = [];

        let readableStart = currentTime.toLocaleString('fr-CH', { hour: "2-digit", minute: "2-digit" });
        let readableEnd = currentTimeEnd.toLocaleString('fr-CH', { hour: "2-digit", minute: "2-digit" });

        map[currentTime.getHours()].push({
          "value" : readableStart,
          "toShow" : readableStart + " to " + readableEnd
        });

        currentTime = new Date(currentTime.getTime() + this.MINUTES_JUMP * 60000);
        currentTimeEnd = new Date(currentTime.getTime() + consultationLength * 60000);
      }
      return map;
    }, {});
  }

  onLastNextClick = () => {
    // Call the API here

    var consult = this.firstFormGroup.value;
    var bookingInfo = this.secondFormGroup.value;
    
    var info = new BookingInfo( bookingInfo.bookFirstName, 
      bookingInfo.bookLastName,
      bookingInfo.bookBirthDate,
      bookingInfo.bookPhone,
      bookingInfo.bookMail,
      bookingInfo.bookDesc);

    var splittedDate = consult.consultationTime.split(":")
    var date : Date = consult.consultationDate;
    date.setHours( splittedDate[0], splittedDate[1] );

    var appointment = new Appointment( consult.consultationType,
      date,
      info );

      this.scheduleService.save(appointment)
        .subscribe(
          res => console.log(res),
          err => console.error(err)
        );
  }
}

class DaySchedule {
  morningStartHour : string;
  morningEndHour : string;

  eveningStartHour : string;
  eveningEndHour : string;

  valueArray = [];

  constructor(morningStartHour : string, morningEndHour : string,
              eveningStartHour : string, eveningEndHour : string) {
                this.morningStartHour = morningStartHour;
                this.morningEndHour = morningEndHour;
                this.eveningStartHour = eveningStartHour;
                this.eveningEndHour = eveningEndHour;

                if(this.morningStartHour)
                  this.valueArray.push( [this.morningStartHour, this.morningEndHour] );
                if(this.eveningStartHour)
                  this.valueArray.push( [this.eveningStartHour, this.eveningEndHour] );
  }
}