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
                            config.setAllowedOrigins(List.of("http://localhost:5173"));
                            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                            config.setAllowedHeaders(List.of("*"));
                            config.setAllowCredentials(true);
                            return config;
                        })
                )
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/api/user/register", "/api/user/login").permitAll()
                        .requestMatchers("/api/admin/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/parking-lots/all", "/api/parking-lots/{id}").permitAll()

//                         Admin parking lot management
                        .requestMatchers("/api/parking-lots/admin/**").hasAuthority("ROLE_ADMIN")

                        // Bookings
                        .requestMatchers(HttpMethod.POST, "/api/bookings/parking").hasAuthority("ROLE_USER")
                        .requestMatchers(HttpMethod.GET, "/api/bookings/user/**").hasAuthority("ROLE_USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/bookings/**").hasAuthority("ROLE_USER")

                        // Vehicle
                        .requestMatchers("/api/vehicles/**").hasAuthority("ROLE_USER")

                        // User
                        .requestMatchers("/api/user/**").hasAuthority("ROLE_USER")

                        // Admin-specific (general)
                        .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")

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
