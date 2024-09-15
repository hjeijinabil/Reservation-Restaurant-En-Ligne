package com.reservation.reservationEnLigne.Repository;

import com.reservation.reservationEnLigne.Entity.Commande;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande,Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Commande c SET c.status = :status WHERE c.id = :id")
    void updateOrderStatus(Long id, String status);

}
