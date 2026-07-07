package com.example.StreamBE_App.security;

import java.io.IOException;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class AdminAuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        String path = req.getRequestURI();

        // Public paths — always allow
        if (path.equals("/login") || path.equals("/admin") || path.startsWith("/css/") || path.startsWith("/api/") || path.equals("/error")) {
            chain.doFilter(request, response);
            return;
        }

        // Protected admin pages
        if (path.equals("/users") || path.equals("/files") || path.equals("/upload")
                || path.equals("/view") || path.equals("/preview") || path.equals("/create")) {

            HttpSession session = req.getSession(false);
            if (session == null || session.getAttribute("adminUser") == null) {
                res.sendRedirect("/login");
                return;
            }
        }

        chain.doFilter(request, response);
    }
}
