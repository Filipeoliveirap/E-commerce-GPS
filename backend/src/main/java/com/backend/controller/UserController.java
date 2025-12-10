package com.backend.controller;

import com.backend.business.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.backend.infrastructure.model.User;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<Void> salvarUser(@RequestBody User user){
        userService.saveUser(user);
        return ResponseEntity.ok().build();

    }

    @PostMapping("/test")
    public ResponseEntity<String> testConnection() {
        try {
            User user = User.builder()
                    .name("Teste Conexao")
                    .email("teste@teste.com")
                    .password("123")
                    .build();

            userService.saveUser(user);
            return ResponseEntity.ok("Mongo conectado! Usuário de teste salvo.");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Erro ao salvar no MongoDB: " + e.getMessage());
        }
    }
}
