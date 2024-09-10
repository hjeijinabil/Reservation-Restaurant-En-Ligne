package com.reservation.reservationEnLigne.Repository;

import com.reservation.reservationEnLigne.Entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande,Long> {
    @Modifying
    @Query("UPDATE Commande o SET o.status = :status WHERE o.id = :orderId")
    void updateOrderStatus(Long orderId, String status);
}
