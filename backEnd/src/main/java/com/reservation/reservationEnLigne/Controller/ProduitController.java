package com.reservation.reservationEnLigne.Controller;

import com.reservation.reservationEnLigne.Entity.Produit;
import com.reservation.reservationEnLigne.Service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProduitController {
    @Autowired
    private ProduitService produitService;

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
    }

    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.saveProduit(produit);
    }

    @GetMapping("/{id}")
    public Produit getProduitById(@PathVariable Long id) {
        return produitService.getProduitById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
    }
    @PutMapping("/{id}")
    public Produit updateProduit(@PathVariable Long id, @RequestBody Produit produitDetails) {
        // Fetch the existing product by ID
        Produit existingProduit = produitService.getProduitById(id);

        if (existingProduit != null) {
            // Update the existing product's details
            existingProduit.setName(produitDetails.getName());
            existingProduit.setDescription(produitDetails.getDescription());
            existingProduit.setPrice(produitDetails.getPrice());

            // Save the updated product
            return produitService.saveProduit(existingProduit);
        } else {
            throw new RuntimeException("Product not found with id " + id);
        }
    }

}
