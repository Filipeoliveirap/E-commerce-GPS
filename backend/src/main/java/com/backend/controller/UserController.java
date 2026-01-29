package com.backend.controller;

import com.backend.business.DTO.UserDTOs.UpdatePerfilRequestDTO;
import com.backend.business.DTO.UserDTOs.UserProfileResponseDTO;
import com.backend.business.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/perfil")
    public ResponseEntity<UserProfileResponseDTO> updatePerfil(
            Authentication authentication,
            @Valid @RequestBody UpdatePerfilRequestDTO dto) {
        String emailUsuarioLogado = authentication.getName();
        return ResponseEntity.ok(
                userService.updatePerfil(emailUsuarioLogado, dto));
    }

    // metodo get para buscar o perfil do usuario logado
    @GetMapping("/perfil")
    public ResponseEntity<UserProfileResponseDTO> getPerfil(
            Authentication authentication) {
        String emailUsuarioLogado = authentication.getName();
        return ResponseEntity.ok(
                userService.getPerfil(emailUsuarioLogado));
    }
}
