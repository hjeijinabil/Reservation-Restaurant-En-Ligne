package com.reservation.reservationEnLigne.Controller;

import com.reservation.reservationEnLigne.Dto.CommandeDTO;
import com.reservation.reservationEnLigne.Dto.CommandeMapper;
import com.reservation.reservationEnLigne.Entity.Commande;
import com.reservation.reservationEnLigne.Service.CommandeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/commandes")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @GetMapping
    public List<CommandeDTO> getAllOrders() {
        return commandeService.getAllOrders().stream()
                .map(CommandeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandeDTO> getOrderById(@PathVariable Long id) {
        Optional<Commande> order = commandeService.getOrderById(id);
        if (order.isPresent()) {
            return ResponseEntity.ok(CommandeMapper.toDTO(order.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CommandeDTO> createOrder(@RequestBody CommandeDTO orderDTO) {
        Commande order = CommandeMapper.toEntity(orderDTO);
        Commande savedOrder = commandeService.saveOrder(order);
        return ResponseEntity.ok(CommandeMapper.toDTO(savedOrder));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable Long id, @RequestBody String newStatus) {
        try {
            System.out.println(newStatus);
            commandeService.updateOrderStatus(id, newStatus);
            return ResponseEntity.noContent().build(); // Returns 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Returns 404 Not Found
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        try {
            commandeService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            // Handle specific exception if needed
            return ResponseEntity.status(500).body(null);
        }
    }
    // Endpoint to assign an employee to an order

    @PutMapping("/{orderId}/assign-employee")
    public ResponseEntity<Void> assignEmployeeToOrder(@PathVariable Long orderId, @RequestBody Map<String, String> request) {
        String firstName = request.get("firstName");
        System.out.println("wajdiii"+ firstName);
        commandeService.assignEmployeeToOrder(orderId, firstName);
        return ResponseEntity.ok().build();
    }

}
