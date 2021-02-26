import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment';
import { BookingInfo } from '../booking-info';

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

  myDate: Date = null;
  
  constructor(private _formBuilder: FormBuilder) { }

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
    this.firstFormGroup.get("consultationTime").disable();
  }
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    
    // Prevent previous dates and weekends from being selected.
    return d.toJSON().slice(0, 10) > new Date().toJSON().slice(0, 10) &&
            day !== 0 && day !== 6;
  }

  onDateChange = () => {
    this.myDate = this.firstFormGroup.get("consultationDate").value;
    this.firstFormGroup.get("consultationTime").enable();
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

    var appointment = new Appointment( consult.consultationType,
      consult.consultationDate,
      consult.consultationTime,
      info );

      console.log(appointment);
    
  }
}
