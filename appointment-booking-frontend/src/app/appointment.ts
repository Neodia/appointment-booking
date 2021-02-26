import { BookingInfo } from "./booking-info";

export class Appointment {
    id: number;
    type: string;
    date: Date;
    info: BookingInfo;

    constructor(type: string, date: Date, info: BookingInfo) {
        this.type = type;
        this.date = date;
        this.info = info;
    }
}
