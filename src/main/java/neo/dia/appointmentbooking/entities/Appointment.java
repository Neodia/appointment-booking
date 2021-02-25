package neo.dia.appointmentbooking.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private AppointmentType type;
    private Date date;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "info_id", referencedColumnName = "id")
    private BookingInfo info;

    public Appointment() {
    }

    public Appointment(AppointmentType type, Date date, BookingInfo info) {
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    } 

    public BookingInfo getInfo() {
        return info;
    }

    public void setInfo(BookingInfo info) {
        this.info = info;
    }  

}