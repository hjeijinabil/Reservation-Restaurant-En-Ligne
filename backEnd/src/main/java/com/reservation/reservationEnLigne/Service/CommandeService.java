package com.reservation.reservationEnLigne.Service;

import com.reservation.reservationEnLigne.Entity.Commande;
import com.reservation.reservationEnLigne.Entity.Employée;
import com.reservation.reservationEnLigne.Entity.OrderItem;
import com.reservation.reservationEnLigne.Entity.ResourceNotFoundException;
import com.reservation.reservationEnLigne.Repository.CommandeRepository;
import com.reservation.reservationEnLigne.Repository.EmployéeRepository;
import com.reservation.reservationEnLigne.Repository.OrderItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeService {
    @Autowired
    private EmployéeRepository employéeRepository;

    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public void deleteOrder(Long id) {
        try {
            Optional<Commande> optionalCommande = commandeRepository.findById(id);
            if (optionalCommande.isPresent()) {
                Commande commande = optionalCommande.get();

                // Break the association with OrderItem entities
                for (OrderItem item : commande.getOrderItems()) {
                    item.setCommande(null);
                }

                // Persist changes to OrderItem entities
                orderItemRepository.saveAll(commande.getOrderItems());

                // Delete the Commande entity
                commandeRepository.delete(commande);
            } else {
                throw new RuntimeException("Order not found");
            }
        } catch (Exception e) {
            // Log the exception and rethrow it or handle it appropriately
            throw new RuntimeException("Error deleting order: " + e.getMessage(), e);
        }
    }

    public List<Commande> getAllOrders() {
        return commandeRepository.findAll();
    }

    public Optional<Commande> getOrderById(Long id) {
        return commandeRepository.findById(id);
    }

    public Commande saveOrder(Commande order) {
        // Ensure that OrderItems have the correct reference to the Commande
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                item.setCommande(order);
            }
        }
        return commandeRepository.save(order);
    }

    public void updateOrderStatus(Long orderId, String newStatus) {
        commandeRepository.updateOrderStatus(orderId, newStatus);
    }

    @Autowired
    private EmployéeRepository employeeRepository;

    public void assignEmployeeToOrder(Long orderId, String firstName) {
        System.out.println("Assigning employee with firstName: " + firstName + " to order ID: " + orderId);

        // Fetch the order by its ID
        Optional<Commande> optionalCommande = commandeRepository.findById(orderId);
        if (optionalCommande.isPresent()) {
            Commande commande = optionalCommande.get();



                // Assign the employee to the order and save the employee's first name
                commande.setEmployeeFirstName(firstName);

                // Save the updated order with the assigned employee
                commandeRepository.save(commande);
                System.out.println("Employee " + firstName + " assigned to order ID: " + orderId);
            }
         else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }


}
