package com.backend.controller;

import com.backend.business.DTO.UserDTOs.AuthenticationDTO;
import com.backend.business.DTO.UserDTOs.LoginResponseDTO;
import com.backend.business.DTO.UserDTOs.RegisterRequestDTO;
import com.backend.business.DTO.UserDTOs.RegisterResponseDTO;
import com.backend.business.service.UserService;
import com.backend.infrastructure.repository.UserRepository;
import com.backend.infrastructure.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthorizationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;

    //método para login
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO>login(@RequestBody @Valid AuthenticationDTO data) {
        LoginResponseDTO response = userService.login(data);
        return ResponseEntity.ok(response);
    }

    //método para registro
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO>register(@RequestBody @Valid RegisterRequestDTO data) {
        RegisterResponseDTO response = userService.register(data);
        return ResponseEntity.ok(response);

    }

    //método para logout
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String token = extractToken(request);
        if (token != null) {
            tokenService.invalidateToken(token);
        }
        return ResponseEntity.ok().build();
    }

    private String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }


}
