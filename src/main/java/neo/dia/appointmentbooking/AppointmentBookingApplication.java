package neo.dia.appointmentbooking;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import neo.dia.appointmentbooking.entities.Appointment;
import neo.dia.appointmentbooking.entities.AppointmentType;
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

			// new BookingInfo(0, "Ricardo", "Oiveira", new Date(1999, 5, 10), "0788677270", "mail@mail.com", "Salut")
			schedule.save( new Appointment(AppointmentType.First, new Date(System.currentTimeMillis())) );

			System.out.println("Après avoir peuplé : " + schedule.findAll());

		};
	}
}
