package com.reservation.reservationEnLigne.Config;

import com.reservation.reservationEnLigne.Service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final JwtAuthentificationFilter authentificationFilter;

    public SecurityConfig(UserDetailsServiceImpl userDetailsServiceImpl, JwtAuthentificationFilter authentificationFilter) {
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.authentificationFilter = authentificationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Disabling CSRF. Ensure it's intentional.
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/register").permitAll() // Allow unauthenticated access to auth registration
                        .requestMatchers("/auth/login").permitAll() // Allow unauthenticated access to auth registration
                        .requestMatchers("/commandes/**").permitAll() // Allow unauthenticated access to auth registration
                        .requestMatchers("/employees/**").permitAll() // Allow unauthenticated access to auth registration
                        .requestMatchers("/products/**").permitAll() // Allow unauthenticated access to auth registration
                        .requestMatchers("/images/**").permitAll() // Allow access to images

                        .requestMatchers("/admin/**").hasRole("ADMIN") // Restrict access to admin endpoints
                        .requestMatchers("/user/**").hasRole("USER") // Restrict access to user endpoints
                        .anyRequest().authenticated() // Require authentication for all other requests
                )
                .userDetailsService(userDetailsServiceImpl) // Set custom user details service
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Use stateless sessions
                )
                .addFilterBefore(authentificationFilter, UsernamePasswordAuthenticationFilter.class) // Add custom filter
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new Http403ForbiddenEntryPoint())) // Handle unauthorized requests
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
