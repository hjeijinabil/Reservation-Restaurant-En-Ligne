package com.reservation.reservationEnLigne.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDTO {
    private Long id;
    private String name;
    private Integer quantity;
    private Double price;
}
