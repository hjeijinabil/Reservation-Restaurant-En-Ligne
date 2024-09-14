package com.reservation.reservationEnLigne.Dto;

import com.reservation.reservationEnLigne.Entity.Employée;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
@Getter
@Setter
public class CommandeDTO {
    private Long id;

    private LocalDateTime orderDate;
    private Date preparationDate;
    private String status;
    private Double totalAmount;
    private List<OrderItemDTO> orderItems;
    private String employeeFirstName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employée_id") // Foreign key column for the Employée entity
    private Employée employée; // Field representing the assigned employee

}
