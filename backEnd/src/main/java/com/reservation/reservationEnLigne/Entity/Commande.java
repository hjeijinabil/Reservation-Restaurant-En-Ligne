package com.reservation.reservationEnLigne.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private String orderDate;
    private String orderTime;
    private String status;
    private Double totalAmount;

    // Une liste pour stocker les éléments de commande
    // Par exemple, List<String> orderItems pourrait être une liste d'articles commandés
    private List<String> orderItems;
}
