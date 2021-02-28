import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment';
import { BookingInfo } from '../booking-info';
import { ScheduleService } from '../services/schedule-service.service';
import { TimePeriod } from '../time-period';

@Component({
  selector: 'app-appointment-book',
  templateUrl: './appointment-book.component.html',
  styleUrls: ['./appointment-book.component.css']
})
export class AppointmentBookComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  usedTimePeriods = null;

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
              private scheduleService: ScheduleService) {
                this.scheduleService.findAllUsedPeriods().subscribe(
                  res => {
                    this.usedTimePeriods = res.reduce( (map, period) => {
                      let key = period.startTime.toLocaleDateString();
                      if( !map[key] )
                        map[key] = [];
                      map[key].push( period );
                      return map;
                    }, {});
                  },
                  err => console.error(err)
                );
               }

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
    return d > new Date() &&
            day !== 0 && day !== 6;
  }

  validateHours = () => {
    var consult = this.firstFormGroup.value;
    if(consult.consultationType && consult.consultationDate) {
      let map = this.createHoursAvailbleForDay( consult.consultationDate, consult.consultationType );
      this.availableTimes = Object.values(map);
    }
  }

  createHoursAvailbleForDay(date: Date, consultationType: string) {
    let day = date.getDay();
    let consultationLength = consultationType == "First" ? 45 : 30;

    // Takes all ranges from day.
    return this.schedule.get(day).valueArray.reduce( (map, range) => {
      // Initial hour
      let currentTime : Date = new Date(date); 
      currentTime.setHours( Number.parseInt(range[0].split(":")[0]) );
      currentTime.setMinutes(  Number.parseInt(range[0].split(":")[1]) );

      // End of tested consultation
      let currentTimeEnd = new Date( currentTime.getTime() + consultationLength * 60000 );

      // End of range.
      let endTime : Date = new Date(date); 
      endTime.setHours( Number.parseInt(range[1].split(":")[0]) );
      endTime.setMinutes(  Number.parseInt(range[1].split(":")[1]) );

      while(currentTimeEnd.getTime() < endTime.getTime()) {
        // Only test the period if it's not used already.
        if( this.periodIsValid( currentTime, currentTimeEnd, this.usedTimePeriods ) ) {
          let readableStart = currentTime.toLocaleString('fr-CH', { hour: "2-digit", minute: "2-digit" });
          let readableEnd = currentTimeEnd.toLocaleString('fr-CH', { hour: "2-digit", minute: "2-digit" });  
          let key = currentTime.getHours()

          if( !map[key] )
            map[key] = [];
          map[key].push({
            "value" : readableStart,
            "toShow" : readableStart + " to " + readableEnd
          });

          }
          // Jumps to next time period to test.
          currentTime = new Date(currentTime.getTime() + this.MINUTES_JUMP * 60000);
          currentTimeEnd = new Date(currentTime.getTime() + consultationLength * 60000);
        }
      return map;
    }, {});
  }

  periodIsValid(start: Date, end: Date, usedTimePeriods: Object) : boolean {
    let key = start.toLocaleDateString();
    if( !usedTimePeriods[key] ) // Returns true if there is no UsedPeriod this day.
      return true;
    
    for(let index in Object.values(usedTimePeriods[key])) {
      let period = usedTimePeriods[key][index];

      let periodStartDate = period.startTime;
      let periodEndDate = period.endTime;

      // If the start or the end of the tested period is invalid.
      if ( (start >= periodStartDate && start < periodEndDate) ||
           (end > periodStartDate && end <= periodEndDate) ) return false;
    }
    return true;
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