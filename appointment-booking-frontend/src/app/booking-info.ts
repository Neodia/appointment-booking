export class BookingInfo {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    mobilePhone: string;
    emailAddress: string;
    desc: string;

    constructor(firstName: string, lastName: string, birthDate: Date,
                phone: string, email: string, desc: string) {
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.birthDate = birthDate;
                    this.mobilePhone = phone;
                    this.emailAddress = email;
                    this.desc = desc;
                }
}
