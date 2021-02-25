package neo.dia.appointmentbooking.entities;

public enum AppointmentType {

    First(45), FollowUp(30);

    private int minutes;
    private AppointmentType(int minutes) { this.minutes = minutes; }

    public int getMinutes() { return minutes; };
}
