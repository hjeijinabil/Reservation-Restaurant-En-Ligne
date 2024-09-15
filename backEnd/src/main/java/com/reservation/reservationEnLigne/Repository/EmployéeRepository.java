package com.reservation.reservationEnLigne.Repository;

import com.reservation.reservationEnLigne.Entity.Employée;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployéeRepository extends JpaRepository<Employée,Long> {

    @Query("SELECT e FROM Employée e WHERE e.firstName = :firstName")
    Optional<Employée> findByName(@Param("firstName") String firstName);
}
