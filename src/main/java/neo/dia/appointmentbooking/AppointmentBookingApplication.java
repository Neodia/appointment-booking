package neo.dia.appointmentbooking;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import neo.dia.appointmentbooking.entities.Appointment;
import neo.dia.appointmentbooking.entities.AppointmentType;
import neo.dia.appointmentbooking.entities.BookingInfo;
import neo.dia.appointmentbooking.repositories.ScheduleRepository;

@SpringBootApplication
public class AppointmentBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppointmentBookingApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(ScheduleRepository schedule) {
		return args -> {
			System.out.println("Avant avoir peuplé : " + schedule.findAll());

			schedule.save( new Appointment(
				AppointmentType.First, 
				ZonedDateTime.of(2021, 3, 1, 9, 30, 0, 0, ZoneId.systemDefault()),
				new BookingInfo("Ricardo", "Oiveira", LocalDate.of(1999, 5, 10), "078", "mail@mail.com", "Salut")) );

			schedule.save( new Appointment(
				AppointmentType.First, 
				ZonedDateTime.of(2021, 3, 1, 14, 0, 0, 0, ZoneId.systemDefault()),
				new BookingInfo("Marcus", "Aurelius", LocalDate.of(1999, 5, 10), "078", "mail@mail.com", "Salut")) );

			schedule.save( new Appointment(
				AppointmentType.FollowUp, 
				ZonedDateTime.of(2021, 3, 3, 10, 30, 0, 0, ZoneId.systemDefault()),
				new BookingInfo("Tim", "Ferris", LocalDate.of(1999, 5, 10), "078", "mail@mail.com", "Salut")) );

			schedule.save( new Appointment(
				AppointmentType.First, 
				ZonedDateTime.of(2021, 3, 5, 13, 0, 0, 0, ZoneId.systemDefault()),
				new BookingInfo("Matt", "D'Avella", LocalDate.of(1999, 5, 10), "0788677270", "mail@mail.com", "Salut")) );
			
			System.out.println("Après avoir peuplé : " + schedule.findAll());
		};
	}
}
