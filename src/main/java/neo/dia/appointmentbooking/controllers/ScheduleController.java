package neo.dia.appointmentbooking.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import neo.dia.appointmentbooking.entities.Appointment;
import neo.dia.appointmentbooking.entities.TimePeriod;
import neo.dia.appointmentbooking.repositories.ScheduleRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ScheduleController {

    @Autowired
    private ScheduleRepository schedule;

    @GetMapping("/appointments")
    public List<Appointment> getAppointments() {
        List<Appointment> as = new ArrayList<Appointment>();
        schedule.findAll().forEach(as::add);
        return as;
    }

    @PostMapping("/appointments")
    public void addAppointment(@RequestBody Appointment appointment) {
        schedule.save(appointment);
    }

    @GetMapping("/used-periods")
    public List<TimePeriod> getUsedPeriods() {
        return this.getAppointments().stream().map( a -> {
            return new TimePeriod( a.getDate(), a.getDate().plusMinutes(a.getType().getMinutes()) );
        }).collect(Collectors.toList());
    }
}