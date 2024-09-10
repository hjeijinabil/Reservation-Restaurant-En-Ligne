package com.reservation.reservationEnLigne.Repository;

import com.reservation.reservationEnLigne.Entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.nio.file.LinkOption;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
}
