package com.backend.controller;

import com.backend.business.DTO.AddressDTO.AddressResponseDTO;
import com.backend.business.DTO.AddressDTO.CreateAddressRequestDTO;
import com.backend.business.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressResponseDTO> createAddress(
            Authentication authentication,
            @Valid @RequestBody CreateAddressRequestDTO dto) {

        String emailUsuarioLogado = authentication.getName();

        return ResponseEntity.ok(
                addressService.createAddress(emailUsuarioLogado, dto)
        );
    }

    @GetMapping("/has")
    public ResponseEntity<Boolean> userHasAddress(Authentication authentication) {
        String email = authentication.getName();
        boolean hasAddress = addressService.userHasAddress(email);
        return ResponseEntity.ok(hasAddress);
    }
}
