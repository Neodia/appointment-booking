package neo.dia.appointmentbooking.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import neo.dia.appointmentbooking.entities.Appointment;

@Repository
public interface ScheduleRepository extends CrudRepository<Appointment, Long> {}