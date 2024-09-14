package com.reservation.reservationEnLigne.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Employée {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;


    private String mobileNumber;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "commande_id", referencedColumnName = "id") // Foreign key to Commande
    private Commande commande;  // The assigned order (if necessary)
}
