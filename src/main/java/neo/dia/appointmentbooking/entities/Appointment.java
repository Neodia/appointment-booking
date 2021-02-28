package neo.dia.appointmentbooking.entities;

import java.time.ZonedDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @NotNull(message = "Type is mandatory") private AppointmentType type;
    @NotNull(message = "Date is mandatory") private ZonedDateTime date;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "info_id", referencedColumnName = "id")
    @NotNull(message = "Booking is mandatory") private BookingInfo info;

    public Appointment() {
    }

    public Appointment(AppointmentType type, ZonedDateTime date, BookingInfo info) {
        this.setType(type);
        this.setDate(date);
        this.setInfo(info);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public AppointmentType getType() {
        return type;
    }

    public void setType(AppointmentType type) {
        this.type = type;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    } 

    public BookingInfo getInfo() {
        return info;
    }

    public void setInfo(BookingInfo info) {
        this.info = info;
    }

    @Override
    public String toString() {
        return String.format("Appointment(%d, %s, %s, %s)", 
            this.getId(),
            this.getType(),
            this.getDate(),
            this.getInfo());
    }

}