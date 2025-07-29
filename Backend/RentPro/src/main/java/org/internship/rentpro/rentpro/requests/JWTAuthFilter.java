package org.internship.rentpro.rentpro.requests;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTImpl jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // ✅ Skip JWT validation for public routes
        if (path.equals("/api/user/register") || path.equals("/api/user/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Optional debug log
        // System.out.println("Intercepted path: " + path);

        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.isValidToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = jwtUtil.extractEmail(token);
        String role = jwtUtil.extractUserRole(token);

        List<SimpleGrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(role)
        );

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                new org.springframework.security.core.userdetails.User(username, "", authorities),
                null,
                authorities
        );

        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(auth);

        filterChain.doFilter(request, response);
    }
}
