package com.reservation.reservationEnLigne.Service;



import com.reservation.reservationEnLigne.Entity.AuthenticationResponse;
import com.reservation.reservationEnLigne.Entity.User;

import com.reservation.reservationEnLigne.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
   @Autowired
    private  UserRepository userRepo;
   @Autowired
    private JwtService jwtService;
    @Autowired
    private  PasswordEncoder passwordEncoder;
    @Autowired
    private  AuthenticationManager authenticationManager;




    public AuthenticationResponse register(User request) {
        if (request == null) {
            throw new IllegalArgumentException("User request cannot be null");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setEmail(request.getEmail());

        // Save the user and handle any potential issues
        System.out.println("userr" + user);
        user = userRepo.save(user);
        System.out.println("userrr" + user);

        // Ensure jwtService is not null
        if (jwtService == null) {
            throw new IllegalStateException("JwtService is not properly initialized");
        }

        String token = jwtService.generateToken(user);
        System.out.println("tokenn" + token);
        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        // Récupérer l'utilisateur depuis la base de données
        User user = userRepo.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier si l'utilisateur a un rôle défini
        if (user.getRole() == null) {
            // Gérer le cas où le rôle de l'utilisateur n'est pas défini
            throw new RuntimeException("Role not defined for user: " + user.getEmail());
        }

        // Générer le token JWT avec le rôle de l'utilisateur
        String token = jwtService.generateToken(user);

        // Créer une nouvelle instance d'AuthenticationResponse avec le token et le rôle
        AuthenticationResponse response = new AuthenticationResponse(token);
        response.setRole(user.getRole()); // Définir le rôle dans la réponse

        // Retourner la réponse d'authentification avec le token JWT et le rôle
        return response;
    }


}
