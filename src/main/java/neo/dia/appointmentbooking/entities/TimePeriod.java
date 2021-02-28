package neo.dia.appointmentbooking.entities;

import java.time.LocalDateTime;

public class TimePeriod {
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public TimePeriod(LocalDateTime startTime, LocalDateTime endTime) {
        this.setStartTime(startTime);
        this.setEndTime(endTime);
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
}
