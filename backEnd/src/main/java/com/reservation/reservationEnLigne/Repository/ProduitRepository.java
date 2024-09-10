package com.reservation.reservationEnLigne.Repository;

import com.reservation.reservationEnLigne.Entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;



@Repository
public interface ProduitRepository extends JpaRepository<Produit,Long> {


}
