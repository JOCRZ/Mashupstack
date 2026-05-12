package com.example.classworkapp.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.classworkapp.Models.User;
import com.example.classworkapp.Repository.UserRepository;
import com.example.classworkapp.service.CustomUserDetail;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class ApiAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenGenerator tokenGenerator;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // Public endpoints - skip token validation
        if (path.equals("/api/register") ||
            path.equals("/api/login")) {

            filterChain.doFilter(request, response);
            return;
        }

        // Get Authorization header
        String authHeader = request.getHeader("Authorization");

        // Check if token exists
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token required");
            return;
        }

        // Extract token
        String token = authHeader.substring(7);

        // Validate token
        if (!tokenGenerator.validateToken(token)) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired token");
            return;
        }

        // Find user using token
        User user = userRepository.findByToken(token);

        if (user == null) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("User not found for the token");
            return;
        }

        // Create authenticated user details
        CustomUserDetail userDetails = new CustomUserDetail(user);

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

        // Set authentication in Spring Security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Continue request
        filterChain.doFilter(request, response);
    }
}