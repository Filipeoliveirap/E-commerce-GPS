package com.backend.controller;

import com.backend.business.DTO.UserDTOs.UpdatePerfilRequestDTO;
import com.backend.business.DTO.UserDTOs.UpdatePerfilResponseDTO;
import com.backend.business.service.UserService;
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
    public ResponseEntity<UpdatePerfilResponseDTO> updatePerfil(
            Authentication authentication,
            @RequestBody UpdatePerfilRequestDTO dto
    ) {

        // Pega o email do usuário logado via token JWT
        String emailUsuarioLogado = authentication.getName();

        UpdatePerfilResponseDTO response =
                userService.updatePerfil(emailUsuarioLogado, dto);

        return ResponseEntity.ok(response);
    }
}
