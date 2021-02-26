import { Time } from "@angular/common";
import { BookingInfo } from "./booking-info";

export class Appointment {
    id: number;
    type: string;
    date: Date;
    time: Time;
    info: BookingInfo;

    constructor(type: string, date: Date, time: Time, info: BookingInfo) {
        this.type = type;
        this.date = date;
        this.time = time;
        this.info = info;
    }
}
