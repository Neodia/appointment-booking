package neo.dia.appointmentbooking.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
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
    public void addAppointment(@Valid @RequestBody Appointment appointment) {
        schedule.save(appointment);
    }

    @GetMapping("/used-periods")
    public List<TimePeriod> getUsedPeriods() {
        return this.getAppointments().stream().map( a -> {
            return new TimePeriod( a.getDate(), a.getDate().plusMinutes(a.getType().getMinutes()) );
        }).collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
    MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}