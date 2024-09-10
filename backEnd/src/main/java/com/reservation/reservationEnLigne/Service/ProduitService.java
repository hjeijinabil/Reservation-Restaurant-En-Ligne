package com.reservation.reservationEnLigne.Service;

import com.reservation.reservationEnLigne.Entity.Produit;
import com.reservation.reservationEnLigne.Repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {
    @Autowired
    private ProduitRepository produitRepository;

    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit getProduitById(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
    public List<Produit> getAllMenuItems() {
        return produitRepository.findAll();
    }
    public List<Produit> getProduitsByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return produitRepository.findAll();
        } else {
            return produitRepository.findByCategory(category);
        }
    }
}
