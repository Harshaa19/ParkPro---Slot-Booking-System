package org.internship.rentpro.rentpro.security;

import org.internship.rentpro.rentpro.requests.JWTAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .with(new CorsConfigurer<>(), cors -> cors
                        .configurationSource(request -> {
                            CorsConfiguration config = new CorsConfiguration();
                            config.setAllowedOrigins(List.of("http://localhost:5173")); // frontend origin
                            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                            config.setAllowedHeaders(List.of("*"));
                            config.setAllowCredentials(true);
                            return config;
                        })
                )
                .authorizeHttpRequests(auth -> auth

                        // ✅ Public endpoints
                        .requestMatchers("/api/user/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/register").permitAll()

                        // ✅ Public GET endpoints for vehicles
                        .requestMatchers(HttpMethod.GET, "/api/vehicles/all", "/api/vehicles/{id}").permitAll()

                        // ✅ Booking routes — User only
                        .requestMatchers(HttpMethod.POST, "/api/bookings").hasAuthority("ROLE_USER")
                        .requestMatchers(HttpMethod.GET, "/api/bookings/my-bookings").hasAuthority("ROLE_USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/bookings/**").hasAuthority("ROLE_USER")

                        // ✅ Vehicle management — Admin only (non-GET)
                        .requestMatchers(HttpMethod.POST, "/api/vehicles/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/vehicles/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/vehicles/**").hasAuthority("ROLE_ADMIN")

                        // ✅ Admin and User-specific APIs
                        .requestMatchers("/api/admin/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/user/me").hasAuthority("ROLE_USER")

                        // ✅ All other endpoints require authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
