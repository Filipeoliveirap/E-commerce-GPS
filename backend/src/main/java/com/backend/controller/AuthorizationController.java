package com.backend.controller;

import com.backend.business.DTO.UserDTOs.AuthenticationDTO;
import com.backend.business.DTO.UserDTOs.LoginResponseDTO;
import com.backend.business.DTO.UserDTOs.RegisterRequestDTO;
import com.backend.business.DTO.UserDTOs.RegisterResponseDTO;
import com.backend.business.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthorizationController {


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


}
