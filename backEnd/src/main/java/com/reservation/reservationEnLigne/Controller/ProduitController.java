package com.reservation.reservationEnLigne.Controller;

import com.reservation.reservationEnLigne.Entity.Produit;
import com.reservation.reservationEnLigne.Service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProduitController {
    @Autowired
    private ProduitService produitService;

    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping
    public Produit createProduit(@RequestParam("file") MultipartFile file,
                                 @RequestParam("name") String name,
                                 @RequestParam("description") String description,
                                 @RequestParam("category") String category,

                                 @RequestParam("price") Double price) throws IOException {
        String imageUrl = uploadImage(file);  // Upload the image and get the URL
        Produit produit = new Produit();
        produit.setName(name);
        produit.setDescription(description);
        produit.setPrice(price);
        produit.setCategory(category);
        produit.setImageUrl(imageUrl);
        return produitService.saveProduit(produit);
    }

    private String uploadImage(MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.copy(file.getInputStream(), filePath);
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/images/")
                    .path(fileName)
                    .toUriString();
        }
        return null;
    }
    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
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
    @GetMapping("/by-category")
    public ResponseEntity<List<Produit>> getProduitsByCategory(@RequestParam(defaultValue = "all") String category) {
        List<Produit> produits = produitService.getProduitsByCategory(category);
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }

}
