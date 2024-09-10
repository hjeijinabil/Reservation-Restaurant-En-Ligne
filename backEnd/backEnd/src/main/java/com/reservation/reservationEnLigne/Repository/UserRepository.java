package com.reservation.reservationEnLigne.Repository;

import com.reservation.reservationEnLigne.Entity.Employée;
import com.reservation.reservationEnLigne.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
Optional<User> findByEmail(String email);
}
