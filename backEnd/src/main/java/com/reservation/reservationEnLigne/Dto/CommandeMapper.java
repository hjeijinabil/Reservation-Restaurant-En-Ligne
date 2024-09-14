package com.reservation.reservationEnLigne.Dto;

import com.reservation.reservationEnLigne.Entity.Commande;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

public class CommandeMapper {
    public static CommandeDTO toDTO(Commande commande) {
        CommandeDTO dto = new CommandeDTO();
        dto.setId(commande.getId());
        dto.setEmployeeFirstName(commande.getEmployeeFirstName());
dto.setEmployée(commande.getEmployée());
        dto.setOrderDate(commande.getOrderDate());
        dto.setPreparationDate(commande.getPreparationDate());
        dto.setStatus(commande.getStatus());
        dto.setTotalAmount(commande.getTotalAmount());
        dto.setOrderItems(commande.getOrderItems().stream()
                .map(OrderItemMapper::toDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    public static Commande toEntity(CommandeDTO dto) {
        Commande commande = new Commande();
        commande.setId(dto.getId());
commande.setEmployée(dto.getEmployée());
commande.setEmployeeFirstName(dto.getEmployeeFirstName());
        commande.setOrderDate(dto.getOrderDate());
        commande.setPreparationDate(dto.getPreparationDate());
        commande.setStatus(dto.getStatus());
        commande.setTotalAmount(dto.getTotalAmount());
        commande.setOrderItems(dto.getOrderItems().stream()
                .map(OrderItemMapper::toEntity)
                .collect(Collectors.toList()));
        return commande;
    }
}

