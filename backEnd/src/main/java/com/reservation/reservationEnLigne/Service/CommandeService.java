package com.reservation.reservationEnLigne.Service;

import com.reservation.reservationEnLigne.Entity.Commande;
import com.reservation.reservationEnLigne.Repository.CommandeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeService {
    @Autowired
    private CommandeRepository orderRepository;

    public List<Commande> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Commande> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Commande createOrUpdateOrder(Commande order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    @Transactional
    public void completeOrder(Long orderId) {
        orderRepository.updateOrderStatus(orderId, "complete");
    }
}
