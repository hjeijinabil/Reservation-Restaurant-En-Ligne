package com.reservation.reservationEnLigne.Repository;

import com.reservation.reservationEnLigne.Entity.Employée;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployéeRepository extends JpaRepository<Employée,Long> {
}
