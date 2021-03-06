package neo.dia.appointmentbooking.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
    
@Entity
public class BookingInfo {
    
    @OneToOne(mappedBy = "info")
    Appointment appointment;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull(message = "First name is mandatory") private String firstName;
    @NotNull(message = "Last name is mandatory") private String lastName;
    @NotNull(message = "Birth name is mandatory") private LocalDate birthDate;
    @NotNull(message = "Mobile phone is mandatory") private String mobilePhone;
    @NotNull(message = "Email address is mandatory") private String emailAddress;
    private String desc; // Optional

    public BookingInfo() {}

    public BookingInfo(String firstName, 
                        String lastName, LocalDate birthDate, 
                        String mobilePhone, String emailAddress, 
                        String desc) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setBirthDate(birthDate);
        this.setMobilePhone(mobilePhone);
        this.setEmailAddress(emailAddress);
        this.setDesc(desc);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return String.format("BookingInfo(%d, %s, %s, %s, %s, %s, %s)",
            this.getId(),
            this.getFirstName(),
            this.getLastName(),
            this.getBirthDate(),
            this.getMobilePhone(),
            this.getEmailAddress(),
            this.getDesc());
    }
}