package neo.dia.appointmentbooking.entities;

import java.time.ZonedDateTime;

public class TimePeriod {
    private ZonedDateTime startTime;
    private ZonedDateTime endTime;

    public TimePeriod(ZonedDateTime startTime, ZonedDateTime endTime) {
        this.setStartTime(startTime);
        this.setEndTime(endTime);
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }
}
