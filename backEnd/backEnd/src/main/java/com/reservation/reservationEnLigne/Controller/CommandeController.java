package com.reservation.reservationEnLigne.Controller;

import com.reservation.reservationEnLigne.Entity.Commande;
import com.reservation.reservationEnLigne.Service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/commandes")
public class CommandeController {

    @Autowired
    private CommandeService orderService;

    @GetMapping
    public List<Commande> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<Commande> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PostMapping
    public Commande createOrder(@RequestBody Commande order) {
        return orderService.createOrUpdateOrder(order);
    }

    @PutMapping("/{id}")
    public Commande updateOrder(@PathVariable Long id, @RequestBody Commande order) {
        order.setId(id);
        return orderService.createOrUpdateOrder(order);
    }

    @PutMapping("/{orderId}/complete")
    public ResponseEntity<Void> completeOrder(@PathVariable Long orderId) {
        orderService.completeOrder(orderId);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }
}
