package com.reservation.reservationEnLigne.Controller;



import com.reservation.reservationEnLigne.Entity.AuthenticationResponse;
import com.reservation.reservationEnLigne.Entity.Role;
import com.reservation.reservationEnLigne.Entity.User;
import com.reservation.reservationEnLigne.Service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")

public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse>register (@RequestBody User request){

        return ResponseEntity.ok(authenticationService.register(request));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(request);
        if (authenticationResponse == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Récupérer le rôle de l'utilisateur depuis la réponse d'authentification
        Role role = authenticationResponse.getRole();

        // Mettre à jour l'objet AuthenticationResponse avec le rôle
        authenticationResponse.setRole(role);

        // Retourner la réponse avec le token JWT et le rôle
        return ResponseEntity.ok(authenticationResponse);
    }

}
